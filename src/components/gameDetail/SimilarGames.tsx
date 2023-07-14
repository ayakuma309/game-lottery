import React, { memo } from 'react'

interface SimilarGamesProps {
  similar_games: {
    id: number,
    cover: {
      url: string,
    },
    name: string,
  }[],
}
const SimilarGames:React.FC<SimilarGamesProps> = ({similar_games}) => {
  return (
    <>
      <div className='flex flex-wrap'>
        {similar_games.map((game) => (
          <div key={game.id} className=''>
            <span className="relative group">
              <span
                className={[
                  "whitespace-nowrap",
                  "rounded",
                  "bg-black",
                  "px-2",
                  "py-1",
                  "text-white",
                  "absolute",
                  "-top-12",
                  "left-1/2",
                  "-translate-x-1/2",
                  "before:content-['']",
                  "before:absolute",
                  "before:-translate-x-1/2",
                  "before:left-1/2",
                  "before:top-full",
                  "before:border-4",
                  "before:border-transparent",
                  "before:border-t-black",
                  "opacity-0",
                  "group-hover:opacity-100",
                  "transition",
                  "pointer-events-none",
                ].join(" ")}
              >
                {game.name}
              </span>
              <img
                src={game.cover ? game.cover.url.replace('thumb', 'cover_big') : '/no-image.png'}
                alt='cover'
                className='rounded-md'
                width={150}
              />
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

export default memo(SimilarGames)
