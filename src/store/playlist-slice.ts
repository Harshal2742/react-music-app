import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SongType {
  id: string,
  title: string,
  subtitle: string,
  imageUri: string,
  src: string
}

interface ListType {
  id: string,
  title: string,
  songs: SongType[]
}

interface InitialStateType {
  playlists: ListType[]
}

const initialState: InitialStateType = {
  playlists: []
}

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state, action: PayloadAction<{ title: string }>) => {
      const id = `${Date.now()}${Math.random() * 100}`
      state.playlists.push({
        id,
        title: action.payload.title,
        songs: []
      })
    },
    deletePlaylist: (state, action: PayloadAction<{ playlistId: string }>) => {
      state.playlists = state.playlists.filter((list) => {
        return list.id !== action.payload.playlistId
      })
    },
    addSong: (state, action: PayloadAction<{ playlistId: string, song: SongType }>) => {
      const playlist = state.playlists.find((playlist) => {
        return playlist.id === action.payload.playlistId;
      })

      if (!playlist) {
        return;
      }

      if (playlist.songs.findIndex((s) => s.id === action.payload.song.id) > -1) {
        return;
      }

      playlist?.songs.push({ ...action.payload.song })
    },
    removeSong: (state, action: PayloadAction<{ playlistId: string, songId: string }>) => {
      const playlist = state.playlists.find((list) => {
        return list.id === action.payload.playlistId;
      })

      if (!playlist) {
        return;
      }

      playlist.songs = playlist.songs.filter((song) => {
        return song.id !== action.payload.songId
      })
    }
  }
})

export const playlistActions = playlistSlice.actions;

export default playlistSlice.reducer;