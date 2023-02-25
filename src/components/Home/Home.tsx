import { useAppDispatch, useAppSelector } from '../../store/store';
import Box from '../UI/Box';
import SongCard from '../UI/SongCard';
import SongsGrid from '../UI/SongsGrid';
import { fetchSong } from '../../store/httpRequest';
import { useNavigate } from 'react-router-dom';
import Message from '../UI/Message';

const Home = () => {
	const favouriteSongs = useAppSelector((state) => state.favourite.songs);
	const myPlaylists = useAppSelector((state) => state.playlist.playlists);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const favouriteOnClickHandler: React.ComponentProps<
		typeof SongCard
	>['onClick'] = (id, event) => {
		dispatch(fetchSong(id));
	};

	const playListOnClickHandler: React.ComponentProps<
		typeof SongCard
	>['onClick'] = (id, event) => {
		// console.log(id);
		navigate(`/playlists/${id}`);
	};
	return (
		<Box>
			{myPlaylists.length > 0 && (
				<SongsGrid gridTitle="Playlists">
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
								showIcon={false}
							/>
						);
					})}
				</SongsGrid>
			)}
			{favouriteSongs.length > 0 && (
				<SongsGrid gridTitle="Favourite songs">
					{favouriteSongs.map((song) => {
						return (
							<SongCard
								key={song.id}
								id={song.id}
								imageUri={song.imageUri}
								title={song.title}
								subtitle={song.subtitle}
								showIcon={false}
								onClick={favouriteOnClickHandler}
							/>
						);
					})}
				</SongsGrid>
			)}
			{myPlaylists.length === 0 && favouriteSongs.length === 0 && (
				<Message>You don't have any playlist or favourite song.</Message>
			)}
		</Box>
	);
};

export default Home;
