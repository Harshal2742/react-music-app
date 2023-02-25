import Box from '../UI/Box';
import SongsGrid from '../UI/SongsGrid';
import SongCard from '../UI/SongCard';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { fetchSong } from '../../store/httpRequest';
import { IoMdRemoveCircle } from 'react-icons/io';
import { favouriteActions } from '../../store/favourite-slice';
import Message from '../UI/Message';

const Favourites = () => {
	const songs = useAppSelector((state) => state.favourite.songs);
	const dispatch = useAppDispatch();

	const songCardOnClickHandler: React.ComponentProps<
		typeof SongCard
	>['onClick'] = (id, event) => {
		dispatch(fetchSong(id));
	};

	const onRemoveFavourite = (
		id: string,
		event: React.MouseEvent<SVGElement>
	): void => {
		event.stopPropagation();
		dispatch(favouriteActions.removeFavouriteSong(id));
	};

	return (
		<Box>
			<SongsGrid gridTitle="Favourite songs">
				{songs.map((song) => {
					return (
						<SongCard
							key={song.id}
							{...song}
							onClick={songCardOnClickHandler}
							showIcon={true}
							Icon={
								<IoMdRemoveCircle
									onClick={onRemoveFavourite.bind(this, song.id)}
								/>
							}
						/>
					);
				})}

				{songs.length === 0 && <Message>You don't have any favourite songs.</Message>}
			</SongsGrid>
		</Box>
	);
};

export default Favourites;
