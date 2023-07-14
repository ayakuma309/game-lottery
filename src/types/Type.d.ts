export interface ConnectedData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface CommonTypeProps {
  children: React.ReactNode;
  title: string;
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
      slug: string,
      cover: {
        url: string,
      },
      name: string,
    }[],
    storyline: string,
  }
}

//ジャンル
export interface GenresProps {
  genres: {
    id: number,
    name: string
  }[],
}

//プラットフォーム
export interface PlatFormsProps {
  platforms: {
    id: number;
    name: string;
  }[];
}

//スクリーンショット
export interface ScreenShotsProps {
  screenshots: {
    id: number,
    image_id: string,
    url: string,
  }[],
}

//おすすめ
interface SimilarGamesProps {
  similar_games: {
    id: number,
    cover: {
      url: string,
    },
    name: string,
    slug: string,
  }[],
}
