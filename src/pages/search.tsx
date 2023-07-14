import axios from 'axios'
import { NextPage } from 'next'
import React, { useState , FormEvent} from 'react'

interface ConnectedData {
  access_token: string;
  token_type: string;
  expires_in: number;
}
const search:NextPage<{ connected: ConnectedData }> = ({ connected }) => {
  const [title, setTitle] = useState("")
  const [searched, setSearched] = useState("")
  const [resultGames, setResultGames] = useState([])
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


  //検索を実装
  const searchGame = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      token: connected.access_token,
      //title 変数の値からアルファベットとスペース以外の文字を取り除く
      title: title.replace(/[^a-zA-Z ]/g, "")
    }
    await axios('/api/search', {
      method: 'POST',
      data: body
    }).then((res) => {
      setResultGames(res.data.game)
      setSearched(title)
    })
  }
  return (
    <div>
      <form id="search" onSubmit={searchGame} className="w-full">
        <input
        type="search"
        placeholder="Search for a game..."
        className="w-full text-center p-1 focus:outline-none text-lg rounded-t-lg"
        minLength={3}
        onChange={(e) => setTitle(e.target.value)} />
      </form>
      <div className="w-full">
        <h1 className="text-center text-2xl font-bold">{searched}</h1>
        <div className="grid grid-cols-3 gap-4">
          {displayedGames.map((game: any) => (
            <div key={game.id} className="flex flex-col justify-center items-center">
              <img
                src={game.cover ? game.cover.url.replace('thumb', 'cover_big') : '/no-image.png'}
                alt="cover"
                className="h-44 w-1/2 mx-auto rounded-md relative overflow-hidden"
              />
              <h2 className="text-center text-lg font-bold">{game.name}</h2>
            </div>
          ))}
        </div>
      </div>
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

export default search;

export async function getServerSideProps () {
  //認証
  const connected = await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials'
  }).then(response => {
    return response.data;
  }).catch(err => {
    console.log(err);
  })

  return {
    props: {
      connected: connected,
    }
  }
}
