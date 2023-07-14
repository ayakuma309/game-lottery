import React from 'react'
import GamesCard from './GamesCard'
import { SearchGamesProps } from '@/types/Type'


type GamesProps = {
  displayedGames:  SearchGamesProps[]
}

const Games:React.FC<GamesProps> = ({displayedGames}) => {
  return (
    <div className='w-11/12 mx-auto'>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayedGames.map((game: any) => (
          <GamesCard
            key={game.id}
            id={game.id}
            cover={game.cover}
            name={game.name}
            slug={game.slug}
          />
        ))}
      </div>
    </div>
  )
}

export default Games
