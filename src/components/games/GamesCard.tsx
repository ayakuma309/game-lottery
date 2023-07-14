import React from 'react'
import { GamesCardProps } from '@/types/Type'

const GamesCard:React.FC<GamesCardProps> = ({cover, name}) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={cover ? cover.url.replace('thumb', 'cover_big') : '/no-image.png'}
          alt="cover"
          className="h-44 w-1/2 mx-auto rounded-md relative overflow-hidden"
        />
        <h2 className="text-center text-lg font-bold">{name}</h2>
      </div>
    </div>
  )
}

export default GamesCard
