// File: VideoReact.jsx
// Date: 5/21/2020
// Note: React Video module HTMLL5 <video /> wrapper
//..............................................................................
import React from 'react';
import { Player } from 'video-react';
//import "../components/video-react.sass";
import "./video-react.sass";

export default props => {
  return (
    <Player
        className='player'
        playsInline
        poster="/assets/poster.png"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  );
};

// eof