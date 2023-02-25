import { FaMusic, FaSearch, FaStar } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { RiPlayListFill } from 'react-icons/ri';

import styles from './Sidebar.module.css';
import MenuItem from './MenuItem';

const Sidebar = () => {
	return (
		<section className={styles.Container}>
			<h1 className={styles.Title}>
				<FaMusic />
			</h1>
			<div>
				<ul className={styles.Menu}>
					<MenuItem Icon={AiFillHome} linkTo={'/'}>
						Home
					</MenuItem>
					<MenuItem Icon={FaSearch} linkTo={'/search'}>
						Search
					</MenuItem>
					<MenuItem Icon={FaStar} linkTo={'/favourites'}>
						Favourites
					</MenuItem>
					<MenuItem Icon={RiPlayListFill} linkTo={'/playlists'}>
						Playlists
					</MenuItem>
				</ul>
			</div>
		</section>
	);
};

export default Sidebar;
