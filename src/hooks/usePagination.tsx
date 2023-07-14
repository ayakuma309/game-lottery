import { GameProps } from '@/types/Type';
import React, { useState } from 'react'

const usePagination = (resultGames: GameProps[]) => {
  //ページネーションのロジック
  const [page, setPage] = useState(0);
  const itemsPerPage = 15;
  const start = page * itemsPerPage;
  const end = (page + 1) * itemsPerPage;
  const displayedGames = resultGames.slice(start, end);
  const maxPage = Math.ceil(resultGames.length / itemsPerPage);

  //次のページを表示
  const next = () => {
    setPage((prevPage) => prevPage + 1);
    if (typeof window !== "undefined") {
      window.scroll({ top: 0, behavior: "smooth" });
    }
  };
  //前のページを表示
  const prev = () => {
    setPage((prevPage) => prevPage - 1);
    if (typeof window !== "undefined") {
      window.scroll({ top: 0, behavior: "smooth" });
    }
  };

  return { page, maxPage, displayedGames, next, prev };
}

export default usePagination
