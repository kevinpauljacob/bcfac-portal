import React from 'react';
import YouTube from 'react-youtube';

interface YouTubePlayerProps {
    videoId: string;
  }

  const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
    const onReady = (event) => {
      const player = event.target;
    //   player.playVideo();
    };
  
    const onError = (error) => {
      console.error('YouTube Player Error:', error);
    };
  
    const opts = {
    width: '100%',
    height: '200',
    };

    return (
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onError={onError}
      />
    );
  };
  
  export default YouTubePlayer;