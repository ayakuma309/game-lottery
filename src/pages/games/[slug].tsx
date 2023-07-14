import React from 'react'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next';
import Genres from '@/components/gameDetail/Genres'
import SimilarGames from '@/components/gameDetail/SimilarGames'
import ScreenShots from '@/components/gameDetail/ScreenShots';
import { GameDetailProps } from '@/types/Type';

const GameDetail:React.FC<GameDetailProps> = ({game}) => {
  return (
    <div className='container w-11/12 mx-auto'>
      <h1 className="w-full text-2xl font-bold text-center py-2 my-2 font-mono">
        {game.name}<br />
        を選んだあなたにおすすめのゲームです！
      </h1>
      {game.similar_games && (
        <SimilarGames similar_games={game.similar_games} />
      )}
      <h1 className="w-full text-4xl font-bold text-center py-2 mb-2 mt-24">
        {game.name}
      </h1>
      <img
        src={game.cover ? game.cover.url.replace('thumb', 'cover_big') : '/no-image.png'}
        alt="cover"
        className='mx-auto rounded-md my-2'
      />
      <div className="my-2">
        {game.genres && (
          <Genres genres={game.genres} />
        )}
      </div>
      <div className="my-5">
        {game.storyline && game.storyline}
      </div>
      <div className="my-5">
        {game.screenshots && (
          <div>
            <ScreenShots screenshots={game.screenshots} />
          </div>
        )}
      </div>
      <div className="my-5">
        {game.platforms && (
          <div>
            <h2 className="text-2xl font-bold text-center py-2 mb-2 mt-24">
              対応プラットフォーム
            </h2>
            <div className="flex flex-wrap justify-center">
              {game.platforms.map((platform) => (
                <div key={platform.id} className="flex flex-col justify-center items-center m-2">
                  <div className="text-center">
                    {platform.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameDetail

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id
  const connected = await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials'
  }).then(response => {
    return response.data;
  }).catch(err => {
    console.log(err);
  })

  const game = await axios({
    url: 'https://api.igdb.com/v4/games/',
    method: 'POST',
    headers : {
      'Accept' : 'application/json',
      'Client-ID': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
      'Authorization' : `Bearer ${connected.access_token}`,
    },
    data: `fields artworks.*, collection.*, collection.games.*, cover.*, dlcs.*, game_modes.*, genres.*, name,
    platforms.*, rating, screenshots.*, similar_games.*, similar_games.cover.*, similar_games.name,
    similar_games.slug, similar_games.platforms.*, storyline, summary, total_rating, involved_companies.company.*, videos.*;
    where id = ${id};`
  }).then((res) => {
    return res.data[0]
  }).catch((err) => {
    return err
  })

  return {
    props: {
      id: id,
      game: game,
      connected: connected,
    }
  }
}

