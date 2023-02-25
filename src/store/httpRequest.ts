
import { useAppDispatch } from "./store"
import { playerActions } from "./player-slice";

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};


export const fetchSong = (id: string) => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    try {
      const response = await fetch(`https://shazam.p.rapidapi.com/songs/get-details?key=${id}&locale=en-US`, options)

      if (!response.ok) {
        return new Error('Something went wrong');
      }

      const song = await response.json();

      dispatch(playerActions.playSong({
        id,
        imageUri: song.images.coverart,
        title: song.title,
        subtitle: song.subtitle,
        src: song.hub.actions[1].uri,
      }))

    } catch (err: any) {
      console.log(err.message);
    }

  }
}