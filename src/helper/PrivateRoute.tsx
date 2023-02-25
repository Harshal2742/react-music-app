import { useKeycloak } from '@react-keycloak/web';

interface PrivateRoutePropsType {
	children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRoutePropsType) => {
	const { keycloak } = useKeycloak();

	const isLoggedIn = keycloak.authenticated;

	return isLoggedIn ? children : null;
};

export default PrivateRoute;
