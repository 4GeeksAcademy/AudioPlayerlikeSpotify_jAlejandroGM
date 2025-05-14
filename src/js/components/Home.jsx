import React, { useState, useRef, useEffect } from "react";

const Home = () => {

	const [songs, setSongs] = useState([])
	const [currentSong, setCurrentSong] = useState(null);
	const [error, setError] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const audioRef = useRef(null);

	useEffect(() => {
		findSong()
	}, [])

	async function findSong() {
		try {
			const response = await fetch('https://playground.4geeks.com/sound/songs', {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
				}
			})

			if (response.status === 404) throw Error("Página no encontrada...")
			const responseJson = await response.json();
			console.log('Canciones recibidas:', responseJson.songs);
			setSongs(responseJson.songs);

		} catch (error) {
			console.error('Error fetching songs:', error);
			setError(error.message);
		}
	}

	const playSong = (song, index) => {
		setCurrentSong(song);
		setCurrentIndex(index);
		setIsPlaying(true);
		const fullUrl = `https://playground.4geeks.com${song.url}`;
		audioRef.current.src = fullUrl;
		audioRef.current.play();
	};

	const playNext = () => {
		const nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
		playSong(songs[nextIndex], nextIndex);
	};

	const playPrevious = () => {
		const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
		playSong(songs[prevIndex], prevIndex);
	};

	const togglePlayPause = () => {
		if (!currentSong) return;

		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};



	return (
		<div className="contenedor">
			{
				error !== null && (
					<div className="alert alert-warning" role="alert">
						{error}
					</div>
				)
			}
			<h1>Audio Player</h1>
			<ul>
				{
					songs.length > 0 &&
					songs.map((song, index) => (
						<li key={song.id}>
							<button onClick={() => playSong(song, index)}
								className={currentSong?.id === song.id ? 'active' : ''}>{song.name}</button>
						</li>
					))
				}
			</ul>
			<audio ref={audioRef} onEnded={playNext} />
			<div className="controls">
				<button onClick={playPrevious}><i className="fa-solid fa-backward"></i></button>
				<button onClick={togglePlayPause}>{isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
				<button onClick={playNext}><i className="fa-solid fa-forward"></i></button>
			</div>
		</div>);
};

export default Home;
