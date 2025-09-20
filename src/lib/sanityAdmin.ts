import { createClient } from '@sanity/client';
import type { Member } from '../Types/sanity';

// Create an authenticated client for admin operations
// This should only be used in server-side code or secure environments
export const adminClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false, // We want real-time data for admin operations
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-03-19',
  token: import.meta.env.VITE_SANITY_TOKEN, // Token is only used server-side
  perspective: 'published',
});

// Type for creating a new member (only include editable fields)
type CreateMemberInput = Omit<Member, '_id' | '_type' | '_createdAt' | '_updatedAt' | '_rev'>;

// Example of an authenticated operation
export async function createMember(member: CreateMemberInput): Promise<Member> {
  if (!import.meta.env.VITE_SANITY_TOKEN) {
    throw new Error('This operation requires authentication');
  }
  
  // Create the document with required _type field
  const doc = {
    _type: 'member' as const,
    ...member
  };
  
  return adminClient.create(doc);
}

// Add other authenticated operations here 