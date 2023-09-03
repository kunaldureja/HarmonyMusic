import React from "react";
import { useState, useEffect } from "react";
import {
  getSongsInPlaylists,
  updatePlaylistSongs,
  checkLiked,
} from "../firebase/firestoreDatabase/firestoreFunctions";
const Like = ({ currentSong }) => {
  const [liked, setLiked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  async function updateLiked() {
    setDisabled(true);
    const newSongs = await getSongsInPlaylists("Liked");
    if (!liked) {
      newSongs.push(currentSong.id);
      await updatePlaylistSongs("Liked", newSongs, ["Liked"], currentSong);
    } else {
      const index = newSongs.indexOf(currentSong.id);
      if (index > -1) {
        newSongs.splice(index, 1);
      }
      await updatePlaylistSongs("Liked", newSongs, [], currentSong);
    }
    console.log(newSongs);

    setLiked(!liked);
    setDisabled(false);
  }

  async function temp() {
    setDisabled(true);
    const liked = await checkLiked(currentSong.id);
    console.log(liked);
    setLiked(liked);
    setDisabled(false);
  }
  useEffect(() => {
    temp();
  }, [currentSong]);
  return (
    <div
      onClick={() => {
        !disabled && updateLiked();
      }}
      style={{ cursor: "pointer" }}
    >
      {liked ? "❤️" : "🖤"}
    </div>
  );
};

export default Like;
