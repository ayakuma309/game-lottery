import { GamePaginationProps } from '@/types/Type'
import React from 'react'


const Pagination:React.FC<GamePaginationProps> = ({page,maxPage,resultGames,next,prev}) => {
  return (
    <div>
      <div className="flex justify-center w-11/12 mx-auto pb-6 relative font-mono mt-5">
        {/* 最初のページ以外 */}
        {page !== 0 && (
          <button
            className="bg-white shadow-md py-1 px-4 rounded-md"
            onClick={prev}
          >
            前
          </button>
        )}

        {/* 次のページがある場合 */}
        {page !== maxPage - 1 && resultGames.length > 0 && (
          <button
            className="bg-white shadow-md py-1 px-4 rounded-md ml-1"
            onClick={next}
          >
            次
          </button>
        )}

        {/* 最後のページの場合 */}
        {!resultGames.length &&
          <p className="bg-primary text-white p-2 rounded-md text-lg">
            見つかりませんでした
          </p>
        }
      </div>
    </div>
  )
}

export default Pagination
