import React, { memo } from 'react'
import { ScreenShotsProps } from '@/types/Type'

const ScreenShots:React.FC<ScreenShotsProps> = ({screenshots}) => {
  return (
    <div className='flex flex-wrap'>
      {screenshots.map((screenshot) => (
        <div key={screenshot.id} className=''>
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_original/${screenshot.image_id}.jpg`}
            alt='cover'
            className='rounded-md'
            width={250}
          />
        </div>
      ))}
    </div>
  )
}

export default memo(ScreenShots);
