
export enum ViewType {
  CHAT = 'CHAT',
  IMAGE = 'IMAGE',
  VISION = 'VISION'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  image?: string;
  groundingLinks?: Array<{ uri: string; title: string }>;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}
