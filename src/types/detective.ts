export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface AIPersonality {
  traits: string[];
  secretKnowledge: string[];
  truthfulness: number; // 0-1, how likely to tell the truth
  nervousness: number; // 0-1, how nervous they act
  cooperation: number; // 0-1, how cooperative they are
  keywords: string[]; // Keywords they react strongly to
  reactions: {
    [keyword: string]: string[];
  };
}

export interface Suspect {
  name: string;
  age: number;
  role: string;
  photo: string;
  description: string;
  alibi: string;
  background: string;
  aiPersonality: AIPersonality;
  chatHistory: ChatMessage[];
}

export interface Evidence {
  name: string;
  type: string;
  file: string;
  description: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  icon: string;
  photo?: string;
}

export interface Clue {
  text: string;
  revealed: boolean;
  category: string;
}

export interface DetectiveCase {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  location: string;
  timeframe: string;
  suspects: Suspect[];
  evidence: Evidence[];
  clues: Clue[];
  solution: string;
}

export interface UserProgress {
  [username: string]: {
    solvedCases: number[];
  };
}

export type TabName = 'cases';
export type GameTabName = 'overview' | 'suspects' | 'evidence' | 'clues' | 'solution';