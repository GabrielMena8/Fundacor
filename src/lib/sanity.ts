import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage, Member, DepartmentDoc, Event } from '../Types/sanity';


if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  throw new Error('Missing VITE_SANITY_PROJECT_ID in environment variables');
}

if (!import.meta.env.VITE_SANITY_DATASET) {
  throw new Error('Missing VITE_SANITY_DATASET in environment variables');
}

// Create a read-only client for the browser
// Build a proper apiHost for dev that includes the origin so the Sanity client
// does not end up constructing an invalid URL (it needs a protocol).
const isBrowser = typeof window !== 'undefined';
const devApiHost = import.meta.env.DEV && isBrowser
  ? `${window.location.origin}/sanity`
  : undefined;

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-03-19',
  // Do NOT ship tokens to the browser; fixes Sanity warning and enables CDN caching
  token: isBrowser ? undefined : import.meta.env.VITE_SANITY_READ_TOKEN,
  perspective: 'published'
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage | null | undefined) {
  return builder.image(source as unknown as SanityImage);
}

export function imageUrl(source: SanityImage | null | undefined, opts?: { width?: number; height?: number; quality?: number }) {
  if (!source) return '';
  const q = opts?.quality ?? 80;
  let b = builder.image(source).auto('format').fit('max').quality(q).format('webp');
  if (opts?.width) b = b.width(opts.width);
  if (opts?.height) b = b.height(opts.height);
  return b.url();
}

export function preloadImage(imageUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = imageUrl;
  });
}

// Lightweight in-memory cache for GROQ queries (per page session)
const QUERY_TTL = 2 * 60 * 1000; // 2 minutes
const queryCache = new Map<string, { ts: number; data: unknown }>();

function cacheKey(query: string, params?: Record<string, unknown>) {
  return `${query}__${params ? JSON.stringify(params) : ''}`;
}

async function groqFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  const key = cacheKey(query, params);
  const now = Date.now();
  const cached = queryCache.get(key);
  if (cached && now - cached.ts < QUERY_TTL) {
    return cached.data as T;
  }

  // Use the Sanity client directly for better performance, even in dev
  // The CDN handles CORS properly for development
  const data = params ? await client.fetch<T>(query, params as Record<string, unknown>) : await client.fetch<T>(query);

  queryCache.set(key, { ts: now, data });
  return data;
}

// Typed queries with better error handling
export async function getMembers(): Promise<Member[]> {
  try {
    const query = `*[_type == "member"] {
      _id,
      _type,
      name,
      role,
      "department": department->name,
      image,
      description
    }`;
  const members = await groqFetch<Member[]>(query);
    
    // Preload member images in the background
    members.forEach((member: Member) => {
      if (member.image) {
        const src = imageUrl(member.image);
        preloadImage(src).catch((error) => {
          console.warn(`Failed to preload image for member ${member.name}:`, error);
        });
      }
    });
    
    return members;
  } catch (error) {
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error fetching members:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    } else {
      console.error('Unknown error fetching members:', error);
    }
    throw error;
  }
}

// Add similar error handling to other queries
export async function getDepartments(): Promise<DepartmentDoc[]> {
  try {
    const query = `*[_type == "department"] {
      _id,
      name,
      description,
      image,
      members[]-> {
        _id,
        name,
        role,
        image
      }
    }`;
    const departments = await groqFetch<DepartmentDoc[]>(query);
    // Preload department images
    type WithImage = { image?: SanityImage };
    departments.forEach((dep) => {
      const src = imageUrl((dep as unknown as WithImage).image);
      if (src) preloadImage(src).catch(() => {});
    });
    return departments;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const query = `*[_type == "event"] {
      _id,
      title,
      date,
      description,
      image,
      location,
      "department": department->name,
      "participants": participants[]->name
    }`;
    const events = await groqFetch<Event[]>(query);
    // Preload only the first 6 event images to improve initial load performance
    events.slice(0, 6).forEach((ev) => {
      const src = imageUrl(ev.image);
      if (src) preloadImage(src).catch(() => {});
    });
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function getEvent(id: string): Promise<Event> {
  try {
    const query = `*[_type == "event" && _id == $id][0] {
      _id,
      title,
      date,
      description,
      image,
      location,
      "department": department->name,
      "participants": participants[]->name
    }`;
    const event = await groqFetch<Event>(query, { id });
    if (!event) throw new Error(`Event with id ${id} not found`);
    return event;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
} 