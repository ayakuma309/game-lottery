import React from 'react'
import { GenresProps } from '@/types/Type'

const Genres:React.FC<GenresProps> = ({genres}) => {
  return (
    <div className="flex flex-wrap justify-center">
    {genres.map((genre) => (
      <span
        key={genre.id}
        className="border m-1 p-1.5 rounded-lg text-sm font-bold">
        {genre.name}
      </span>
    ))}
  </div>
  )
}

export default Genres
