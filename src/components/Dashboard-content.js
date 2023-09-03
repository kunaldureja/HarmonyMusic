import React from "react";
import "../css/dashboard.css";
import "../css/Like.css";
import SongBox from "./SongBox";
import Like from "./Like";
import Volume from "./Volume";
import { Button } from "react-bootstrap";
import { useAuth as useLogin } from "../context/AuthContext";
import Playlists from "./Playlists";
import FileUpload from "./FileUpload";
import MusicPlayer from "./MusicPlayer";
import ErrorPage from "./ErrorPage";

const Dashboardcontent = (props) => {
  const { currentUser } = useLogin();

  console.log(props.sresults);
  function handleLogout() {}
  if (currentUser == null) {
    return <ErrorPage />;
  }
  return (
    <div className="wrapper1">
      <div className="wrapper1-1">
        <div className="wrapper1-1-2">
          <h6>{currentUser.email}</h6>
        </div>
        <div className="wrapper1-1-2">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <div className="wrapper1-1-2">
          <h4>Your Playlists</h4>
        </div>
        <Playlists setResults={props.setResults} sresults={props.sresults} />
        <FileUpload />
      </div>
      <div className="wrapper1-2">
        <div className="wrapper1-2-1">
          <div className="searchbar button-15">
            <input
              className="searchbox"
              id="exampleFormControlInput1"
              value={props.svalue}
              onChange={(e) => props.schange(e.target.value)}
            />
          </div>
        </div>
        <div className="wrapper1-2-2">
          <div className="wrapper1-2-2-1">
            <div className="wrapper1-2-2-1-1">
              {/* "https://open.spotify.com/embed/track/6o027l399OQ5IadRrsRb31?utm_source=generator" */}
              {props.sresults.map((track) => {
                return <SongBox changeSong={props.changeSong} track={track} />;
              })}
            </div>

            <div className="wrapper1-2-2-1-2">
              {props.currentSong.isSpotify && (
                <iframe
                  id="splayer"
                  className="songPlayer"
                  src={
                    "https://open.spotify.com/embed/track/" +
                    props.currentSong.id +
                    "?utm_source=generator"
                  }
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              )}
              {!props.currentSong.isSpotify && (
                <MusicPlayer currentSong={props.currentSong} />
              )}
            </div>
          </div>
          <div className="wrapper1-2-2-2">
            <div className="wrapper1-2-2-2-1">
              <Like currentSong={props.currentSong} />
            </div>
            <div className="wrapper1-2-2-2-2">
              <Volume volume={props.volume} setVolume={props.setVolume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  {
    /* return <Player accessToken={1} style = {{height:"200px"}}/ > */
  }
};

export default Dashboardcontent;
