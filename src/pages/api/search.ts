import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    if (request.method == 'POST') {
      const title = request.body.title
      const token = request.body.token
      const game = await axios({
        url: 'https://api.igdb.com/v4/games/',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
          'Authorization' : `Bearer ${token}`,
        },
        data: `fields cover.*, cover.cover_big, genres.*, name, platforms.*, screenshots.*, slug;
        limit 100;
        search "${title}";`
      })
      response.status(200).json({ token: token, game: game.data });
    } else {
      response.status(400).json({ error: "Wrong request method" });
    }
  }
