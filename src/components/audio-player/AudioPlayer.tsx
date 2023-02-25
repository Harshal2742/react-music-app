import styles from './AudioPlayer.module.css';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { RiPlayListAddLine } from 'react-icons/ri';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { favouriteActions } from '../../store/favourite-slice';
import { useState } from 'react';
import { playlistActions } from '../../store/playlist-slice';

const AudioPlayer = () => {
	const song = useAppSelector((state) => state.player.song);
	const favouriteSongs = useAppSelector((state) => state.favourite.songs);
	const playlists = useAppSelector((state) => state.playlist.playlists);
	const [showPlaylists, setShowPlaylists] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	if (!song) {
		return <div className={styles.Container}></div>;
	}

	const isFavourite = favouriteSongs.find((s) => {
		return s.id === song.id;
	});

	const onAddFavourite = () => {
		dispatch(favouriteActions.addFavouriteSong({ ...song, isFavourite: true }));
	};

	const onRemoveFavourite = () => {
		dispatch(favouriteActions.removeFavouriteSong(song.id));
	};

	const onAddToPlaylist = (playlistId: string) => {
		dispatch(playlistActions.addSong({ playlistId, song }));
		setShowPlaylists(false);
	};

	return (
		<div className={styles.Container}>
			<div className={styles.SongInfo}>
				<img
					className={styles.SongInfo__Image}
					src={song.imageUri}
					alt={song.title}
				/>
				<div>
					<h4 className={styles.SongInfo__Title}>{song.title}</h4>
					<p className={styles.SongInfo__Subtitle}>{song.subtitle}</p>
				</div>
			</div>
			<div className={styles.Player}>
				<audio
					controls
					autoPlay
					loop
					src={song.src}
					controlsList={'nodownload noplaybackrate'}
				></audio>
			</div>
			<div className={styles.IconContainer}>
				{isFavourite ? (
					<FaStar onClick={onRemoveFavourite} />
				) : (
					<FaRegStar onClick={onAddFavourite} />
				)}
				<RiPlayListAddLine
					onClick={() => setShowPlaylists((prevState) => !prevState)}
				/>
			</div>
			{showPlaylists && (
				<ul className={styles.PlaylistContainer}>
					{playlists.map((playlist) => {
						return (
							<li
								key={playlist.id}
								onClick={onAddToPlaylist.bind(this, playlist.id)}
							>
								{playlist.title}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default AudioPlayer;
