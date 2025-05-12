import React, { useState, useRef } from "react";

const Home = () => {

	const dominio = "https://playground.4geeks.com"
	const songs = [{
		id: 1,
		name: "Mario Castle",
		url: "/sound/files/mario/songs/castle.mp3",
		category: "category"
	},
	{
		id: 2,
		name: "Mario Star",
		url: "/sound/files/mario/songs/hurry-starman.mp3",
		category: "category"
	},
	{
		id: 3,
		name: "Mario Overworld",
		url: "/sound/files/mario/songs/overworld.mp3",
		category: "category"
	},
	{
		id: 4,
		name: "Mario Stage 1",
		url: "/sound/files/mario/songs/stage1.mp3",
		category: "category"
	},
	{
		id: 5,
		name: "Mario Stage 2",
		url: "/sound/files/mario/songs/stage2.mp3",
		category: "category"
	},
	{
		id: 6,
		name: "Mario Star",
		url: "/sound/files/mario/songs/starman.mp3",
		category: "category"
	},
	{
		id: 7,
		name: "Mario Underworld",
		url: "/sound/files/mario/songs/underworld.mp3",
		category: "category"
	},
	{
		id: 8,
		name: "Mario Underwater",
		url: "/sound/files/mario/songs/underwater.mp3",
		category: "category"
	},
	{
		id: 9,
		name: "Zelda Castle",
		url: "/sound/files/videogame/songs/zelda_castle.mp3",
		category: "category"
	},
	{
		id: 10,
		name: "Zelda Outworld",
		url: "/sound/files/videogame/songs/zelda_outworld.mp3",
		category: "category"
	},
	{
		id: 11,
		name: "Zelda Titles",
		url: "/sound/files/videogame/songs/zelda_title.mp3",
		category: "category"
	},
	{
		id: 12,
		name: "Sonic Brain Zone",
		url: "/sound/files/videogame/songs/sonic_brain-zone.mp3",
		category: "category"
	},
	{
		id: 13,
		name: "Zelda Link To Past",
		url: "/sound/files/videogame/songs/zelda_link-to-past.mp3",
		category: "category"
	},
	{
		id: 14,
		name: "Flintstones",
		url: "/sound/files/cartoons/songs/flintstones.mp3",
		category: "cartoon"
	},
	{
		id: 15,
		name: "power-rangers",
		url: "/sound/files/cartoons/songs/power-rangers.mp3",
		category: "cartoon"
	},
	{
		id: 16,
		name: "simpsons",
		url: "/sound/files/cartoons/songs/simpsons.mp3",
		category: "cartoon"
	},
	{
		id: 17,
		name: "south-park",
		url: "/sound/files/cartoons/songs/south-park.mp3",
		category: "cartoon"
	},
	{
		id: 18,
		name: "thundercats",
		url: "/sound/files/cartoons/songs/thundercats.mp3",
		category: "cartoon"
	},
	{
		id: 19,
		name: "x-men",
		url: "/sound/files/cartoons/songs/x-men.mp3",
		category: "cartoon"
	}
	]
	const audioRef = useRef(null);
	const [currentSong, setCurrentSong] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0)

	const playSong = (song, index) => {
		const fullUrl = dominio + song.url;
		setCurrentSong(song);
		setCurrentIndex(index);
		setIsPlaying(true);
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
			<h1>Audio Player</h1>
			<ul>
				{songs.map((song, index) => (
					<li key={song.id}>
						<button onClick={() => playSong(song, index)}
							className={currentSong?.id === song.id ? 'active' : ''}>{song.name}</button>
					</li>
				))}
			</ul>
			<audio ref={audioRef} onEnded={playNext} />
			<div className="controls">
				<button onClick={playPrevious}><i class="fa-solid fa-backward"></i></button>
				<button onClick={togglePlayPause}>{isPlaying ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}</button>
				<button onClick={playNext}><i class="fa-solid fa-forward"></i></button>
			</div>
		</div>);
};

export default Home;
