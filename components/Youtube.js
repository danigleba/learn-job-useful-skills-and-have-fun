import React from 'react'
import YouTube from 'react-youtube'
import {useRouter} from 'next/router'
import { useRef } from "react"

const YouTubeVideo = ({ onVideoEnd, videoId, start_time, end_time, videoEnded }) => {
  const router = useRouter()

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      start: start_time,
      end: end_time,
      controls: 0,
      modestbranding: 1,
      disablekb: 1,
      //showinfo: 1,
      rel: 0,
    },
  };

  function reloadPage() {
    router.reload()
  }

  const onPlayerEnd = (event) => {
    onVideoEnd()
  }

  const playerRef = useRef(null);

  let lastTapTimestamp = 0

  const handleDoubleTap = () => {
    const currentTime = playerRef.current.getCurrentTime();
    const currentTimestamp = Date.now();

    if (currentTimestamp - lastTapTimestamp < 3000) {
      // Prevent default behavior for double-tap
      return;
    }

    lastTapTimestamp = currentTimestamp;

    // Handle your custom behavior here (e.g., show controls, etc.)
  };

  return (
    <div className="w-full md:w-3/4">
        <div onTouchEnd={handleDoubleTap} className="aspect-w-16 aspect-h-9 w-full shadow-[0_8px_30px_rgb(0,0,0,0.08) rounded-xl overflow-hidden" >
          {!videoEnded ?  
            (
              <YouTube
              ref={playerRef}
                videoId={videoId}
                opts={opts}
                //onReady={onPlayerReady}
                onEnd={onPlayerEnd}
              />  
            ) : (
              <div className='w-full h-full bg-[#333533] flex justify-center items-center shadow-[0_8px_30px_rgb(0,0,0,0.08)'>   
                <button onClick={reloadPage} className='font-bold text-lg hover:scale-105 duration-200 rounded-lg bg-white py-2 px-12'>
                  Volver a ver
                </button>
              </div>
            )
          }
                                
        </div>
    </div>  
  )
}

export default YouTubeVideo;
