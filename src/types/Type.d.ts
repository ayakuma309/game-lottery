export interface GameInfoProps {
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

export interface SearchGamesProps {
  id: number;
  name: string;
  cover: {
    url: string;
  };
}
export interface GamePaginationProps {
  page: number;
  maxPage: number;
  resultGames: SearchGamesProps[];
  next: () => void;
  prev: () => void;
}

export interface GamesCardProps {
  cover: {
    url: string;
  };
  name: string;
}
