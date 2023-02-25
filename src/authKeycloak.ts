import Keycloak from "keycloak-js";

const authKeycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "react-music-app",
 clientId: "music-app",
});

export default authKeycloak;