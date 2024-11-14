export interface Question {
  id: string;
  user_id: string;
  content: string;
  type: 'mcq' | 'subjective';
  options?: string[];
  answer?: string;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  updated_at: string;
}