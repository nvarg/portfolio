export interface ProjectInfo {
  title: string;
  description: string[];
  tags: string[];
  image?: string;
  urls: { [name: string]: string };
}
