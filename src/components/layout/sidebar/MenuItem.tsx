import { IconType } from 'react-icons';
import { ReactNode } from 'react';
import styles from './MenuItem.module.css';
import { NavLink } from 'react-router-dom';

type MenuItemProps = {
	Icon: IconType;
	children: ReactNode;
	linkTo: string;
};

const MenuItem = ({ Icon, children, linkTo }: MenuItemProps) => {
	return (
		<li className={styles.Container}>
			<NavLink
				to={linkTo}
				className={({isActive}) => {
					return isActive ? styles.Active : styles.Inacitve;
				}}
				end
			>
				<span className={styles.Icon}>
					<Icon />
				</span>
				{children}
			</NavLink>
		</li>
	);
};

export default MenuItem;
