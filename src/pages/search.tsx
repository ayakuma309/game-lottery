import React, { useState , FormEvent} from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import usePagination from '@/hooks/usePagination';
import Games from '@/components/games/Games';
import Pagination from '@/components/games/Pagination';
import { ConnectedData } from '@/types/Type';

const search:NextPage<{ connected: ConnectedData }> = ({ connected }) => {
  const [title, setTitle] = useState("")
  const [searched, setSearched] = useState("")
  const [resultGames, setResultGames] = useState([])
  const { page, maxPage, displayedGames, next, prev } = usePagination(resultGames)

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
        <Games displayedGames={displayedGames} />
      </div>
      <Pagination page={page} maxPage={maxPage} resultGames={resultGames} next={next} prev={prev} />
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
