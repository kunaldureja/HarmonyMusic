/*
Design Credits : https://dribbble.com/shots/6437042-Music-App-UI
Also I couldn't find any open music API
so credits to 
https://codepen.io/JavaScriptJunkie/details/qBWrRyg
to make his repo public and make the songs easily accesible
also I used his UI as inspiration too
*/
import React from "react";

import {
  ThreeDots,
  ChevronLeft,
  PauseFill,
  PlayFill,
  SkipBackwardFill,
  SkipForwardFill,
  Shuffle,
  ArrowRepeat,
  Heart,
  BoxArrowUpRight,
  HeartFill,
} from "https://cdn.skypack.dev/react-bootstrap-icons@1.5.0";

import "../css/MusicPlayer.css";

const userOptions = React.createContext({
  shuffle: false,
  repeat: false,
});

function Control(props) {
  return (
    <div className="controls">
      <button
        className="controlButton"
        onClick={(x) => props.setIdx(props.idx - 1 < 0 ? 8 : props.idx - 1)}
      >
        <SkipBackwardFill />
      </button>
      {props.playState === true ? (
        <button
          className="centerButton"
          onClick={(x) => props.setPlayState(false)}
        >
          <PauseFill />
        </button>
      ) : (
        <button
          className="centerButton"
          onClick={(x) => props.setPlayState(true)}
        >
          <PlayFill size={20} />
        </button>
      )}
      <button
        className="controlButton"
        onClick={(x) => props.setIdx((props.idx + 1) % 9)}
      >
        <SkipForwardFill />
      </button>
    </div>
  );
}

function Progress({ player, idx, setIdx, set }) {
  let [currLength, setCurrLength] = React.useState(0);
  let [length, setLength] = React.useState(0);
  let options = React.useContext(userOptions);
  const progressBar = document.querySelector(".progressBar");

  function updateProgress(e) {
    let offset = e.target.getBoundingClientRect().left;
    let newOffSet = e.clientX;
    let newWidth = newOffSet - offset;
    progressBar.style.width = newWidth + "px";
    let secPerPx = length / 570;
    player.currentTime = secPerPx * newWidth;
  }

  setInterval(() => {
    setLength(Math.ceil(player.duration));
    setCurrLength(Math.ceil(player.currentTime));
    let secPerPx = Math.ceil(player.duration) / 570;
    let newWidth = player.currentTime / secPerPx;
    document.querySelector(".progressBar").style.width = newWidth + "px";
    if (player.currentTime === player.duration) {
      //   if (options.shuffle === true) {
      //     props.setIdx(parseInt(Math.random() * 1000) % 9);
      //   } else if (options.repeat === true) {
      //     player.play();
      //   } else {
      setIdx((idx + 1) % 9);
      //   }
    }
  }, 500);

  function formatTime(s) {
    return Number.isNaN(s)
      ? "0:00"
      : (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  return (
    <div className="progress">
      <div className="currentTime">
        <p>{formatTime(currLength)}</p>
      </div>
      <div className="progressCenter" onClick={(e) => updateProgress(e)}>
        <div className="progressBar"></div>
      </div>
      <div className="songLength">
        <p>{formatTime(length)}</p>
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <>
      {/* <div className="name">{tracks[props.idx].artist}</div> */}
      <div className="title">{props.tracks[props.idx].name}</div>
    </>
  );
}

function Container({ player, tracks }) {
  let [idx, setIdx] = React.useState(0);
  let [playState, setPlayState] = React.useState(false);
  let oldIdx = React.useRef(idx);
  React.useEffect(() => {
    if (playState === true) player.play();
    else player.pause();
    if (idx !== oldIdx.current) {
      player.pause();
      player.src = tracks[idx].source;
      player.load();
      player.play();
      setPlayState(true);
      oldIdx.current = idx;
    }
  });

  return (
    <div className="playerContainer">
      <Avatar idx={idx} tracks={tracks} />
      <Progress setIdx={setIdx} idx={idx} player={player} />
      <Control
        setIdx={setIdx}
        idx={idx}
        playState={playState}
        setPlayState={setPlayState}
        player={player}
      />
    </div>
  );
}

// root method
export default function MusicPlayer({ currentSong }) {
  console.log(currentSong);
  const tracks = [
    {
      name: currentSong.title,
      artist: "pk",
      cover: "",
      source: currentSong.albumUrl,
      url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
      favorited: false,
    },
  ];
  const player = new Audio(tracks[0].source);
  player.setAttribute("preload", "metadata");
  return <Container player={player} tracks={tracks} />;
}
