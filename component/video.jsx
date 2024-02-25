import React, { useRef, useEffect, useState } from 'react';

const Video = ({ src, title, onNextVideo }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Callback function for Intersection Observer
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // If video is in view, play it
        videoRef.current.play();
        setIsVisible(true);
        setIsPlaying(true);
      } else {
        // If video is out of view, pause it
        videoRef.current.pause();
        setIsVisible(false);
        setIsPlaying(false);
      }
    });
  };

  // Intersection Observer instance
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Update video progress
  useEffect(() => {
    const updateProgress = () => {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    };
    videoRef.current.addEventListener('timeupdate', updateProgress);
    return () => {
      videoRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSwipeUp = () => {
    if (onNextVideo) {
      onNextVideo();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      handleSwipeUp();
    }
  };

  return (
    <div className="video-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <video
        ref={videoRef}
        controls={false}
        autoPlay
        muted
        style={{ width: '100%', height: 'auto' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <button className="play-pause-button" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <h2 className="video-title">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Video;
