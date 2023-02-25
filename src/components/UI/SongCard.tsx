import Button from './Button';
import styles from './SongCard.module.css';
import React from 'react';

type SongCardProps = {
	id: string;
	imageUri: string;
	title: string;
	subtitle?: string;
	onClick?: (id: string, event: React.MouseEvent<HTMLDivElement>) => void;
	showIcon?: boolean;
	Icon?: JSX.Element;
};

const SongCard = ({
	imageUri,
	title,
	subtitle,
	id,
	onClick,
	showIcon = false,
	Icon,
}: SongCardProps) => {
	if (subtitle && subtitle.length > 40) {
		subtitle = subtitle.substring(0, 40) + '...';
	}

	return (
		<div className={styles.Container} onClick={onClick?.bind(this, id)}>
			<img className={styles.Image} src={imageUri} alt={title} />
			<h4 className={styles.Title}>{title}</h4>
			<div className={styles.Subtitle}>
				<p>{subtitle}</p>
			</div>
			{showIcon && <div className={styles.IconContainer}>{Icon}</div>}
		</div>
	);
};

export default SongCard;
