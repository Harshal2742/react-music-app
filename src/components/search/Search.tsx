import { FaSearch } from 'react-icons/fa';
import React, { ComponentProps, useEffect, useState } from 'react';

import Box from '../UI/Box';
import Button from '../UI/Button';
import styles from './Search.module.css';
import { UseHttpTypes } from '../../hooks/useHttp';
import useHttp from '../../hooks/useHttp';
import SongsGrid from '../UI/SongsGrid';
import SongCard from '../UI/SongCard';
import { useAppDispatch } from '../../store/store';
import { fetchSong } from '../../store/httpRequest';

const requestConfig = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
	},
};

const Search = () => {
	const [searchText, setSearchText] = useState<string>('');
	const {
		// isLoading: searchHintIsLoading,
		// isError: searchHintIsError,
		sendRequest: searchHintRequest,
	}: UseHttpTypes = useHttp();

	const {
		// isLoading: recommendationIsLoading,
		// isError: recommendationIsError,
		sendRequest: recommendationRequest,
	}: UseHttpTypes = useHttp();

	const {
		// isLoading: searchIsLoading,
		// isError: searchIsError,
		sendRequest: searchRequest,
	}: UseHttpTypes = useHttp();

	const [searchHints, setSearchHints] = useState<string[]>([]);
	const [searchResult, setSearchResult] = useState<
		ComponentProps<typeof SongCard>[]
	>([]);
	const [recommendations, setRecommendations] = useState<
		ComponentProps<typeof SongCard>[]
	>([]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const dataTransformer = (data: any) => {
			const terms: string[] = data.hints.map((hint: { term: string }) => {
				return hint.term;
			});

			setSearchHints(terms);
		};

		if (searchText.length === 0) {
			setSearchHints([]);
			return;
		}

		const timeOutId: NodeJS.Timeout = setTimeout(() => {
			const params = new URLSearchParams(`term=${searchText}`);
			const url: string = `https://shazam.p.rapidapi.com/auto-complete?${params}&locale=en-IN`;
			searchHintRequest({ url, requestConfig, dataTransformer });
		}, 500);

		return () => {
			clearTimeout(timeOutId);
		};
	}, [searchText, searchHintRequest]);

	useEffect(() => {
		const dataTransformer = (data: any) => {
			const tracks = data.tracks.map((track: any) => {
				const id: string = track.key;
				const title: string = track.title;
				const subtitle: string = track.subtitle;
				const imageUri: string = track.images.coverart;

				return {
					id,
					title,
					subtitle,
					imageUri,
				};
			});

			setRecommendations(tracks);
		};

		const url =
			'https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-IN';
		recommendationRequest({ url, requestConfig, dataTransformer });
	}, [recommendationRequest]);

	const onSeachHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const dataTransformer = (data: any) => {
			const songs = data.tracks.hits.map((hit: any) => {
				return {
					id: hit.track.key,
					title: hit.track.title,
					subtitle: hit.track.subtitle,
					imageUri: hit.track.images.coverart,
				};
			});

			setSearchResult(songs);
			setSearchHints([]);
		};

		const params = new URLSearchParams(`term=${searchText}`);

		const url = `https://shazam.p.rapidapi.com/search?${params}&locale=en-US&offset=10&limit=10`;
		searchRequest({ url, requestConfig, dataTransformer });
	};

	const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
	};

	const onClickHint = (event: React.MouseEvent<HTMLLIElement>) => {
		setSearchText(event.currentTarget.innerText);
	};

	const songCardOnClickHandler: ComponentProps<typeof SongCard>['onClick'] = (
		id,
		event
	) => {
		dispatch(fetchSong(id));
	};

	return (
		<Box>
			<form>
				<input
					value={searchText}
					className={styles.Input}
					type={'text'}
					placeholder={'search'}
					onChange={onSearchTextChange}
				/>
				<Button styleType="Normal" buttonType="submit" onClick={onSeachHandler}>
					<FaSearch />
				</Button>
			</form>
			<ul className={styles.AutoSearchCompleteList}>
				{searchHints.map((hint, index) => {
					return (
						<li onClick={onClickHint} key={index}>
							{hint}
						</li>
					);
				})}
			</ul>

			{searchResult.length > 0 && (
				<SongsGrid gridTitle="Search result">
					{searchResult.map((song) => {
						return (
							<SongCard
								key={song.id}
								id={song.id}
								title={song.title}
								subtitle={song.subtitle}
								imageUri={song.imageUri}
								onClick={songCardOnClickHandler}
							/>
						);
					})}
				</SongsGrid>
			)}
			{recommendations.length > 0 && (
				<SongsGrid gridTitle="Recommendations">
					{recommendations.map((song) => {
						return (
							<SongCard
								key={song.id}
								id={song.id}
								title={song.title}
								subtitle={song.subtitle}
								imageUri={song.imageUri}
								onClick={songCardOnClickHandler}
							/>
						);
					})}
				</SongsGrid>
			)}
		</Box>
	);
};

export default Search;
