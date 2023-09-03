import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { spotifyClient } from "../secrets";
import useAuth from "../useAuth";
import Dashboardcontent from "./Dashboard-content";

const spotifyApi = new SpotifyWebApi({
  clientId: spotifyClient,
});
const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [songSrc, setSongSrc] = useState({
    Playlists: ["Liked"],
    id: "5DEp8hauuZ45oG38YOkkQq",
    artist: "Pratsofficial",
    albumUrl:
      "https://i.scdn.co/image/ab67616d000048518b5a9b3be6389d94caa0b5ce",
    title: "Aziyat",
    isSpotify: true,
  });
  const [volume, setVolume] = useState("50");

  useEffect(() => {
    // console.log(accessToken);
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    console.log("access token set to " + accessToken);
  }, [accessToken]);

  useEffect(() => {
    // console.log(search,accessToken);
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      // console.log(res);
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,

            albumUrl: smallestAlbumImage.url,
            id: track.id,
            isSpotify: true,
          };
        })
      );
    });
  }, [accessToken, search]);

  return (
    <div>
      <Dashboardcontent
        volume={volume}
        setVolume={setVolume}
        currentSong={songSrc}
        changeSong={setSongSrc}
        aToken={accessToken}
        svalue={search}
        schange={setSearch}
        sresults={searchResults}
        setResults={setSearchResults}
      />
    </div>
  );
};

export default Dashboard;
