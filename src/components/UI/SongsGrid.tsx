import { ReactNode } from 'react';
import styles from './SongsGrid.module.css'

type SongsGridProps = {
	gridTitle?: string;
	children: ReactNode;
};

const SongsGrid = ({ gridTitle, children }: SongsGridProps) => {
	return (
		<div>
			<h2 className={styles.GridTitle}>{gridTitle}</h2>
			<div className={styles.GridContainer}>{children}</div>
		</div>
	);
};

export default SongsGrid;
