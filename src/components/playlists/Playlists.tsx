import { useRef, useState } from 'react';
import { SiAddthis } from 'react-icons/si';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { MdDelete } from 'react-icons/md';

import Box from '../UI/Box';
import styles from './Playlists.module.css';
import { playlistActions } from '../../store/playlist-slice';
import SongsGrid from '../UI/SongsGrid';
import SongCard from '../UI/SongCard';
import { useNavigate } from 'react-router-dom';
import Message from '../UI/Message';

const Playlists = () => {
	const [showInputForm, setShowInputForm] = useState<boolean>(false);
	const myPlaylists = useAppSelector((state) => state.playlist.playlists);
	const dispatch = useAppDispatch();
	const titleInpuRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const createPlaylistHandler = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();

		const title = titleInpuRef.current?.value.trim();

		if (!title || title.length === 0) {
			return;
		}

		dispatch(playlistActions.createPlaylist({ title }));
		setShowInputForm(false);
	};

	const playListOnClickHandler: React.ComponentProps<
		typeof SongCard
	>['onClick'] = (id, event) => {
		navigate(`/playlists/${id}`);
	};

	const onDeletePlaylistHandler = (
		id: string,
		event: React.MouseEvent<SVGElement>
	) => {
		event.stopPropagation();
		dispatch(playlistActions.deletePlaylist({ playlistId: id }));
	};

	return (
		<Box>
			{showInputForm && (
				<form className={styles.InputContainer}>
					<input
						ref={titleInpuRef}
						className={styles.Input}
						placeholder={'My playlist'}
						maxLength={25}
					/>
					<div className={styles.ButtonContainer}>
						<button
							className={styles.Button}
							type="button"
							onClick={() => {
								setShowInputForm(false);
							}}
						>
							cancel
						</button>
						<button
							className={styles.Button}
							type="submit"
							onClick={createPlaylistHandler}
						>
							save
						</button>
					</div>
				</form>
			)}

			<div className={styles.TitleContainer}>
				<h3>Playlists</h3>
				<SiAddthis
					className={styles.CreateIcon}
					size={'1.5rem'}
					onClick={() => {
						setShowInputForm(true);
					}}
				/>
			</div>
			<div>
				{myPlaylists.length === 0 ? (
					<Message>Playlist not created yet.</Message>
				) : (
					<SongsGrid>
						{myPlaylists.map((playlist) => {
							const imageUri =
								playlist.songs.length > 0
									? playlist.songs[0].imageUri
									: `${process.env.PUBLIC_URL}/img/default-playlist.png`;
							return (
								<SongCard
									key={playlist.id}
									title={playlist.title}
									imageUri={imageUri}
									id={playlist.id}
									onClick={playListOnClickHandler}
									showIcon={true}
									Icon={
										<MdDelete
											size={'1.2rem'}
											onClick={onDeletePlaylistHandler.bind(this, playlist.id)}
										/>
									}
								/>
							);
						})}
					</SongsGrid>
				)}
			</div>
		</Box>
	);
};

export default Playlists;
