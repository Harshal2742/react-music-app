import styles from './Layout.module.css';
import Sidebar from './sidebar/Sidebar';
import { ReactNode } from 'react';
import Button from '../UI/Button';
import AudioPlayer from '../audio-player/AudioPlayer';
import { useKeycloak } from '@react-keycloak/web';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	const { keycloak } = useKeycloak();

	const logoutHandler = () => {
		keycloak.logout();
	};

	return (
		<main className={styles.OuterContainer}>
			<div className={styles.InnerContainer}>
				<div className={styles.SidebarContainer}>
					<Sidebar />
				</div>
				<div className={styles.ButtonContentWrapper}>
					<div className={styles.ButtonContainer}>
						<Button
							buttonType="button"
							styleType="Flat"
							onClick={logoutHandler}
						>
							Logout
						</Button>
					</div>
					<div className={styles.Content}>{children}</div>
				</div>
			</div>
			<AudioPlayer />
		</main>
	);
};

export default Layout;
