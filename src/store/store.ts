import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import playerReducer from "./player-slice";
import favouriteReducer from "./favourite-slice";
import playlistReducer from "./playlist-slice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    favourite: favouriteReducer,
    playlist: playlistReducer
  }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export default store;