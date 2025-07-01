
// app/lib/types.ts
export interface User {
  id: string;
  email: string;
  role: 'candidate' | 'recruiter' | 'admin';
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// app/lib/types.ts (add to existing file)
export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: 'remote' | 'onsite';
}

export interface Recruiter {
  id: string;
  name: string;
  email: string;
}