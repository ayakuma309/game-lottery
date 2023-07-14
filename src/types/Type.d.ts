export interface GameProps {
  id: number;
  title: string;
  image: string;
  release_date: string;
  platform: string;
  genre: string;
  description: string;
  website: string;
  trailer: string;
  screenshots: string[];
}

export interface GamePaginationProps {
  page: number;
  maxPage: number;
  resultGames: GameProps[];
  next: () => void;
  prev: () => void;
}
