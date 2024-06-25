import React from "react";
import AudioPlayer from "./AudioPlayer";
import fondo from "../../img/bg.png"

const Home = () => {
	return (
		<>
			<section style={{ backgroundImage: `url(${fondo})`, backgroundSize: "cover" }}>
				<h1>Audio Player</h1>
				<AudioPlayer />
			</section>
		</>
	);
};

export default Home;
