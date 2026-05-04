export type Platform = 'instagram' | 'tiktok' | 'twitter' | 'linkedin' | 'ads' | 'general';
export type Tone = 'funny' | 'professional' | 'viral' | 'luxury' | 'gen-z';

export interface GeneratedContent {
  id: string;
  text: string;
  platform: Platform;
  tone: Tone;
  prompt: string;
  timestamp: number;
  userId: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  savedContentIds: string[];
}
