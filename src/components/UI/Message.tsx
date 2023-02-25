import { ReactNode } from 'react';
import styles from './Message.module.css';

interface MessagePropsType {
	children: ReactNode;
}

const Message = ({ children }: MessagePropsType) => {
	return <h1 className={styles.Message}>{children}</h1>;
};

export default Message;
