export interface SideScore {
  sideName: string;
  score: number;
}

export interface Manipulation {
  name: string;
  description: string;
  context: string;
  suggestedChanges: string[];
  score?: number; // Optional as not present in all data
}

export interface Report {
  _id?: string;
  articleLink: string;
  articleTitle: string;
  articleDate: string;
  score: number;
  explanation: string;
  sidesScore: SideScore[];
  sidesBalance: Record<string, number>;
  favoredSide: string;
  manipulations: Manipulation[];
}
