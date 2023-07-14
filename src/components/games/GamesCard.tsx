import React, { memo } from 'react'
import { GamesCardProps } from '@/types/Type'
import Link from 'next/link'

const GamesCard:React.FC<GamesCardProps> = ({id, cover, name, slug}) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={cover ? cover.url.replace('thumb', 'cover_big') : '/no-image.png'}
          alt="cover"
          className="h-44 w-1/2 mx-auto rounded-md"
        />
        <h2 className="text-center text-lg font-bold">{name}</h2>
      </div>
      <div className="flex justify-center">
        <Link href={{ pathname: `/games/${slug}`, query: { id: id } }}>
          <button className="p-2 font-bold outline">
            このゲーム好き！
          </button>
        </Link>
      </div>
    </div>
  )
}

export default memo(GamesCard)
