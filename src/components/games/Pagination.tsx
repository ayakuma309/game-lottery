import { GamePaginationProps } from '@/types/Type'
import React from 'react'


const Pagination:React.FC<GamePaginationProps> = ({page,maxPage,resultGames,next,prev}) => {
  return (
    <div>
      <div className="flex justify-evenly w-11/12 mx-auto pb-6 relative font-mono">
        {/* 最初のページ以外 */}
        {page !== 0 && (
          <button
            className="border-4 shadow-md py-1 px-4 rounded-xl hover:text-white"
            onClick={prev}
          >
            Back
          </button>
        )}

        {/* 次のページがある場合 */}
        {page !== maxPage - 1 && resultGames.length > 0 && (
          <button
            className="border-2 shadow-md py-1 px-4 rounded-xl hover:text-white"
            onClick={next}
          >
            Next
          </button>
        )}

        {/* 最後のページの場合 */}
        {!resultGames.length &&
          <p className="bg-primary text-white p-2 rounded-lg text-lg">
            No results found
          </p>
        }
      </div>
    </div>
  )
}

export default Pagination
