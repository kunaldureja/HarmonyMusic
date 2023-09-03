import React from "react";

const Volume = (props) => {
  return (
    <div class="range-slider">
      <input
        class="input-range"
        orient="vertical"
        type="range"
        step="0.1"
        value={props.volume}
        min="1"
        max="10"
        onClick={(e)=>{props.setVolume(e.value)}}
      />
    </div>
  );
};

export default Volume;
