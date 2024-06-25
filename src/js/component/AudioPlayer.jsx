import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = () => {

    const url = "https://playground.4geeks.com";
    const [songs] = useState([
        { id: 1, name: "Mario Castle", url: "/sound/files/mario/songs/castle.mp3" },
        { id: 2, name: "Mario Star", url: "/sound/files/mario/songs/hurry-starman.mp3" },
        { id: 3, name: "Mario Overworld", url: "/sound/files/mario/songs/overworld.mp3" },
        { id: 4, name: "Mario Stage 1", url: "/sound/files/mario/songs/stage1.mp3" },
        { id: 5, name: "Mario Stage 2", url: "/sound/files/mario/songs/stage2.mp3" },
        { id: 6, name: "Mario Star", url: "/sound/files/mario/songs/starman.mp3" },
        { id: 7, name: "Mario Underworld", url: "/sound/files/mario/songs/underworld.mp3" },
        { id: 8, name: "Mario Underwater", url: "/sound/files/mario/songs/underwater.mp3" },
        { id: 9, name: "Zelda Castle", url: "/sound/files/videogame/songs/zelda_castle.mp3" },
        { id: 10, name: "Zelda Outworld", url: "/sound/files/videogame/songs/zelda_outworld.mp3" },
        { id: 11, name: "Zelda Titles", url: "/sound/files/videogame/songs/zelda_title.mp3" },
        { id: 12, name: "Sonic Brain Zone", url: "/sound/files/videogame/songs/sonic_brain-zone.mp3" },
        { id: 13, name: "Zelda Link To Past", url: "/sound/files/videogame/songs/zelda_link-to-past.mp3" },
        { id: 14, name: "Flintstones", url: "/sound/files/cartoons/songs/flintstones.mp3" },
        { id: 15, name: "power-rangers", url: "/sound/files/cartoons/songs/power-rangers.mp3" },
        { id: 16, name: "simpsons", url: "/sound/files/cartoons/songs/simpsons.mp3" },
        { id: 17, name: "south-park", url: "/sound/files/cartoons/songs/south-park.mp3" },
        { id: 18, name: "thundercats", url: "/sound/files/cartoons/songs/thundercats.mp3" },
        { id: 19, name: "x-men", url: "/sound/files/cartoons/songs/x-men.mp3" }
    ]);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [durations, setDurations] = useState(Array(songs.length).fill(0));
    const audioRef = useRef(null);


    const loadDuration = (index) => {
        const audio = new Audio(`${url}${songs[index].url}`);
        audio.addEventListener("loadedmetadata", () => {
            setDurations((prevDurations) => {
                const newDurations = [...prevDurations];
                newDurations[index] = audio.duration;
                return newDurations;
            });
        });
    };

    useEffect(() => {
        songs.forEach((song, index) => {
            loadDuration(index);
        });
    }, []);

    const playPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
        setIsPlaying(true);
    };

    const prevSong = () => {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(prevIndex);
        setIsPlaying(true);
    };



    return (
        <div className="cont">
            <div className="audio-player">
                <ul className="songs-list">
                    {songs.map((song, index) => (
                        <li
                            key={song.id}
                            className={index === currentSongIndex ? "active" : ""}
                            onClick={() => setCurrentSongIndex(index)}
                        >
                            <div className="song-details">
                                <span className="song-index">{index + 1}.</span>
                                <span className="song-name">{song.name}</span>
                                <span className="song-duration">
                                    {Math.floor(durations[index] / 60)}:{Math.floor(durations[index] % 60).toString().padStart(2, '0')} Seg
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="controls">
                    <button onClick={prevSong}>&#9664;</button>
                    <button onClick={playPause}>{isPlaying ? "Pause" : "Play"}</button>
                    <button onClick={nextSong}>&#9654;</button>
                </div>
                <audio
                    ref={audioRef}
                    src={`${url}${songs[currentSongIndex].url}`}
                    onEnded={nextSong}
                ></audio>

            </div>
        </div>

    );
};

export default AudioPlayer;
