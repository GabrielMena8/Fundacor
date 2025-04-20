import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage, Member, Department, Event } from '../Types/sanity';

if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  throw new Error('Missing VITE_SANITY_PROJECT_ID in environment variables');
}

if (!import.meta.env.VITE_SANITY_DATASET) {
  throw new Error('Missing VITE_SANITY_DATASET in environment variables');
}

// Create a read-only client for the browser
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-03-19',
  token: import.meta.env.VITE_SANITY_READ_TOKEN,
  perspective: 'published'
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage | null | undefined) {
  if (!source) {
    return '';
  }
  return builder.image(source)
    .auto('format')
    .fit('max')
    .quality(80)
    .format('webp')
    .url();
}

export function preloadImage(imageUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = imageUrl;
  });
}

// Typed queries with better error handling
export async function getMembers(): Promise<Member[]> {
  try {
    const members = await client.fetch<Member[]>(`*[_type == "member"] {
      _id,
      _type,
      name,
      role,
      department,
      image,
      description
    }`);
    
    // Preload member images in the background
    members.forEach((member: Member) => {
      if (member.image) {
        const imageUrl = urlFor(member.image);
        preloadImage(imageUrl).catch((error) => {
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
export async function getDepartments(): Promise<Department[]> {
  try {
    return await client.fetch(`*[_type == "department"] {
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
    }`);
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    return await client.fetch(`*[_type == "event"] {
      _id,
      title,
      date,
      description,
      image,
      location,
      department->,
      participants[]->
    }`);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function getEvent(id: string): Promise<Event> {
  try {
    const event = await client.fetch(`*[_type == "event" && _id == $id][0] {
      _id,
      title,
      date,
      description,
      image,
      location,
      department->,
      participants[]->
    }`, { id });
    
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    
    return event;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
} 