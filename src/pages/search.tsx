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
          {resultGames.map((game: any) => (
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
