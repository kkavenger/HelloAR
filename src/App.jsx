import React,{ useState } from 'react';
import Video from '../component/video';
import "./App.css";

const App = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videos = [
    { src: 'https://player.vimeo.com/external/284652268.sd.mp4?s=0bf23f0d69280b20e39fb2dd5501a5b0d4612a77&profile_id=164&oauth2_token_id=57447761', title: 'Video 1' },
    { src: 'https://player.vimeo.com/external/387242416.sd.mp4?s=57e2d102f99b0c27b03d4db5fe9ca903b5646d41&profile_id=165&oauth2_token_id=57447761', title: 'Video 2' },
    { src: 'https://player.vimeo.com/external/420239207.sd.mp4?s=2b5a6633c37af1a6fb0beb02c06bdc376fdfcce2&profile_id=165&oauth2_token_id=57447761', title: 'Video 3' },
    { src: 'https://player.vimeo.com/external/479728625.sd.mp4?s=f4f886d3d45a0312d8d47419647788178535a2c6&profile_id=165&oauth2_token_id=57447761', title: 'Video 4' },
    // Add more video objects as needed
  ];
  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="app">
      <div className="video-list">
        {videos.map((video, index) => (
          <Video
            key={index}
            src={video.src}
            title={video.title}
            onNextVideo={handleNextVideo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
