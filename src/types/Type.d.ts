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
  id: number;
  cover: {
    url: string;
  };
  name: string;
  slug: string;
}


export interface GameDetailProps {
  game: {
    id: number,
    cover: {
      id: number,
      url: string,
    },
    genres: {
      id: number,
      name: string
    }[],
    name: string,
    platforms: {
      id: number,
      name: string,
    }[],
    screenshots: {
      id: number,
      image_id: string,
      url: string,
    }[],
    similar_games: {
      id: number,
      cover: {
        url: string,
      },
      name: string,
    }[],
    storyline: string,
  }
}
