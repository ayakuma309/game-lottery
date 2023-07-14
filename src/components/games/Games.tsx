import React from 'react'
import GamesCard from './GamesCard'
import { SearchGamesProps } from '@/types/Type'


type GamesProps = {
  displayedGames:  SearchGamesProps[]
}

const Games:React.FC<GamesProps> = ({displayedGames}) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {displayedGames.map((game: any) => (
          <GamesCard
            key={game.id}
            cover={game.cover}
            name={game.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Games
