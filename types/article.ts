export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
  image: string;
  views?: number;
  updatedAt?: string;
}