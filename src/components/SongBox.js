import React from "react";
import { motion } from "framer-motion";
const SongBox = (props) => {
  // console.log(props);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="songcard card"
      style={{ width: "40%" }}
    >
      <img
        src={props.track.albumUrl}
        className="card-img-top songImg"
        alt="..."
      />
      <div className="card-body">
        <h6 className="">{props.track.title}</h6>
        <p className="" style={{ color: "grey" }}>
          {props.track.artist}
        </p>
        <button
          onClick={() => {
            props.changeSong(props.track);
          }}
          className="song-btn  button-48"
        >
          ▶
        </button>
      </div>
    </motion.div>
  );
};

export default SongBox;
