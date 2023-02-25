import { ReactNode } from 'react';
import styles from './Box.module.css';

type ContainerProps = {
	children: ReactNode;
};

const Box = ({ children }: ContainerProps) => {
	return <section className={styles.Box}>{children}</section>;
};

export default Box;
