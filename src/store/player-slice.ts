import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

interface SongType {
	id:string,
	title: string ;
	subtitle: string;
	imageUri: string ;
	src: string;
}

type initialStateType = {
	song: SongType | null
};

const initialState: initialStateType = {
	song: null
}

const playerSlice = createSlice({
	name: 'audio',
	initialState,
	reducers: {
		playSong: (state, action: PayloadAction<SongType>) => {
			state.song = action.payload;
		},
	},
});

export const playerActions = playerSlice.actions;

export default playerSlice.reducer


