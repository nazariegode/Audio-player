import React, { useState, useRef, useEffect } from "react";

//Declaramos la función
const AudioPlayer = () => {
    const urlInitial = "https://playground.4geeks.com";
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [durations, setDurations] = useState([]);
    const audioRef = useRef(null);

    // Fetch a las canciones
    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/sound/songs");
            if (!response.ok) {
                throw new Error("Error " + response.statusText);
            }
            const data = await response.json();
            setSongs(data.songs);
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    // Duración de la canción
    const loadDuration = (index) => {
        if (songs[index]?.url) {
            const audio = new Audio(`${urlInitial}${songs[index].url}`);
            audio.addEventListener("loadedmetadata", () => {
                setDurations((prevDurations) => {
                    const newDurations = [...prevDurations];
                    newDurations[index] = audio.duration;
                    return newDurations;
                });
            });
        }
    };

    useEffect(() => {
        if (songs.length > 0) {
            songs.forEach((song, index) => {
                loadDuration(index);
            });
        }
    }, [songs]);

    // cambio de play y pause
    const playPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // siguiente cancion
    const nextSong = () => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
        setIsPlaying(true);
    };

    // cancion anterior o previa
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
                {songs.length > 0 && (
                    <audio
                        ref={audioRef}
                        src={`${urlInitial}${songs[currentSongIndex]?.url}`}
                        onEnded={nextSong}
                    ></audio>
                )}
            </div>
        </div>
    );
};

export default AudioPlayer;
