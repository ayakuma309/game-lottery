import React, { useMemo } from 'react'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next';
import Genres from '@/components/gameDetail/Genres'
import SimilarGames from '@/components/gameDetail/SimilarGames'
import ScreenShots from '@/components/gameDetail/ScreenShots';
import { GameDetailProps } from '@/types/Type';
import PlatForms from '@/components/gameDetail/PlatForms';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import Layout from '@/components/common/Layout';

const GameDetail:React.FC<GameDetailProps> = ({game}) => {

  //share用の変数を定義
  const gameListShare = useMemo(() => {
    if (!game || !game.similar_games) return null;
    const recommendedGameTitles = game.similar_games
        .map((g) => g.name)
        .join("\n");
    return `${game.name}\n${recommendedGameTitles}\n`;
}, []);

  return (
    <Layout title="Game Lottery">
      <div className='container w-11/12 mx-auto mt-24'>
        {game.similar_games && (
          <>
            <h1 className="w-full text-2xl font-bold text-center py-2 my-2 font-mono">
              {game.name}<br />
              を選んだあなたにおすすめのゲームです！
            </h1>
            <div className="text-center my-5">
              <TwitterShareButton
                title={`${gameListShare}`}
                hashtags={["ゲームの宝さがし", "おすすめゲーム"]}
                url={`https://game-lottery-one.vercel.app/`}
              >
                <div
                  className="text-white font-bold rounded-full mr-5 bg-black  py-1 px-2"
                >
                  \uD835\uDD4F
                </div>
              </TwitterShareButton>
            </div>
          </>
        )}
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
          <PlatForms platforms={game.platforms} />
        </div>
      </div>
    </Layout>
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

