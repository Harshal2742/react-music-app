import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SongType {
  id: string,
  title: string;
  subtitle: string;
  imageUri: string;
  src: string;
  isFavourite: boolean
}

type InitialStateType = {
  songs: SongType[]
}
const initialState: InitialStateType = {
  songs: []
}

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavouriteSong: (state, action: PayloadAction<SongType>) => {
      state.songs.push(action.payload);
    },

    removeFavouriteSong: (state, action: PayloadAction<SongType['id']>) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    }
  }
})

export const favouriteActions = favouriteSlice.actions;

export default favouriteSlice.reducer


