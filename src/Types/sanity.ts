export type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

export type SanityReference = {
  _ref: string;
  _type: 'reference';
};

// A small member shape used when populated via projections (members[]->)
export type MemberSummary = {
  _id: string;
  name: string;
  role: string;
  image?: SanityImage;
};

export type DepartmentDoc = {
  _id: string;
  _type: 'department';
  name: string;
  description?: string;
  image?: SanityImage;
  members?: MemberSummary[];
};

export type Member = {
  _id: string;
  _type: 'member';
  name: string;
  role: string;
  // department is stored as free text now
  department?: string;
  image?: SanityImage;
  description?: string;
};

export type Event = {
  _id: string;
  _type: 'event';
  title: string;
  // Sanity datetime fields are returned as ISO strings
  date: string;
  description?: string;
  image?: SanityImage;
  location?: string;
  // department is a simple string now
  department?: string;
  // participants simplified to array of names
  participants?: string[];
};