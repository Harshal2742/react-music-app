import { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
	children: ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	styleType?: 'Flat' | 'Normal';
	buttonType: 'button' | 'reset' | 'submit';
	style?: string;
};

const Button = ({
	onClick,
	children,
	styleType,
	buttonType = 'button',
	style,
}: ButtonProps) => {
	let buttonStyle: string = styles.Button;

	if (styleType === 'Flat') {
		buttonStyle = `${styles.Button} ${styles.Button__Flat}`;
	}

	if(style){
		buttonStyle = style;
	}

	return (
		<button className={buttonStyle} type={buttonType} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
