import { useParams } from 'react-router-dom';

import SongsGrid from '../UI/SongsGrid';
import SongCard from '../UI/SongCard';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Box from '../UI/Box';
import styles from './Playlist.module.css';
import { IoMdRemoveCircle } from 'react-icons/io';
import React from 'react';
import { playerActions } from '../../store/player-slice';
import { playlistActions } from '../../store/playlist-slice';
import Message from '../UI/Message';

const Playlist = () => {
	const params = useParams();
	const myPlaylists = useAppSelector((state) => state.playlist.playlists);
	const dispatch = useAppDispatch();

	const selectedPlaylist = myPlaylists.find((playlist) => {
		return playlist.id === params.playlistId;
	});

	if (!selectedPlaylist) {
		return <Box>Not found</Box>;
	}

	const onRemoveSongHandler = (
		songId: string,
		event: React.MouseEvent<SVGElement>
	) => {
		if (!params.playlistId) {
			return;
		}
		event.stopPropagation();
		dispatch(
			playlistActions.removeSong({ playlistId: params.playlistId, songId })
		);
	};

	const onPlaySongHandler = (id: string) => {
		const song = selectedPlaylist.songs.find((song) => song.id === id);

		if (!song) {
			return;
		}
		dispatch(playerActions.playSong(song));
	};

	return (
		<Box>
			<SongsGrid gridTitle={selectedPlaylist.title}>
				{selectedPlaylist.songs.length === 0 ? (
					<Message>No songs added yet.</Message>
				) : (
					selectedPlaylist.songs.map((song) => {
						return (
							<SongCard
								key={song.id}
								id={song.id}
								title={song.title}
								subtitle={song.subtitle}
								imageUri={song.imageUri}
								onClick={onPlaySongHandler}
								showIcon={true}
								Icon={
									<IoMdRemoveCircle
										onClick={onRemoveSongHandler.bind(this, song.id)}
									/>
								}
							/>
						);
					})
				)}
			</SongsGrid>
		</Box>
	);
};

export default Playlist;
