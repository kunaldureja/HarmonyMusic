import React from "react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import {
  getPlaylists,
  getSongInfo,
  getSongsInPlaylists,
} from "../firebase/firestoreDatabase/firestoreFunctions.js";
import { motion } from "framer-motion";
const Playlists = ({ setResults, sresults }) => {
  // const { currentUser } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  // let [songs, setSongs] = useState([]);
  // const [songs, setSongs] = useRef();
  async function loadPlaylists() {
    const data = await getPlaylists("testUser");
    setPlaylists(data);
  }

  async function loadSongs(playlistName) {
    let newSongs = [];
    const data = await getSongsInPlaylists(playlistName);
    // console.log("Liked songs", data);
    await Promise.all(
      data.map(async (element) => {
        const songInfo = await getSongInfo(element);
        newSongs.push(songInfo);
      })
    );

    // data.forEach(async element => {
    //   const songInfo = await getSongInfo(element);
    //   new
    // });

    ///Big thing to work on asnc iterates adn new Song is logged null
    // setTimeout(() => {
    //   console.log(newSongs);
    //   setResults(newSongs);
    //   console.log(JSON.stringify(sresults));
    // }, 1000);
    setResults([]);
    setTimeout(() => {
      setResults(newSongs);
    }, 10);
  }

  useEffect(() => {
    loadPlaylists();

    //elements are changing dynamically
  }, []);
  return (
    <div>
      {playlists.map((playlistName) => {
        return (
          <motion.div
            className="wrapper1-1-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <button
              onClick={function () {
                loadSongs(playlistName);
              }}
            >
              {playlistName}
            </button>
            <hr style={{ margin: "0px", color: "white" }} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Playlists;
