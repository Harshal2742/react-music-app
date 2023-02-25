import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useKeycloak } from '@react-keycloak/web';

import Favourites from './components/favourites/Favourites';
import Home from './components/Home/Home';
import Layout from './components/layout/Layout';
import Playlists from './components/playlists/Playlists';
import Search from './components/search/Search';
import Playlist from './components/playlist/Playlist';
import PrivateRoute from './helper/PrivateRoute';

function App() {

	return (
		<PrivateRoute>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
					<Route path="/favourites" element={<Favourites />} />
					<Route path="/playlists" element={<Playlists />} />
					<Route path="/playlists/:playlistId" element={<Playlist />} />
					<Route path="*" element={<h1>Page not found</h1>} />
				</Routes>
			</Layout>
		</PrivateRoute>
	);
}

export default App;
