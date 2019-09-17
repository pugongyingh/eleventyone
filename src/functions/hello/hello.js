
import axios from 'axios'

export async function handler() {
  const endpoint = 'https://api.instagram.com/v1/users/self/media/recent'
  const token = '5414559434.a5e0d4b.f4222b456df04826a5b53f160e76efe8'
  const limit = 5

  const {
    data: { data: posts },
  } = await axios.get(`https://api.instagram.com/v1/users/self/media/recent?access_token=5414559434.a5e0d4b.f4222b456df04826a5b53f160e76efe8&count=5`)

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      posts.map(i => ({
        id: i.id,
        link: i.link,
        images: i.images,
        videos: i.videos,
        caption: i.caption.text,
      })),
    ),
  }
}
