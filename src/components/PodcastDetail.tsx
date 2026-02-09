'use client';

import { useState, useEffect } from 'react';
import DetailLayout, { ContentData } from './DetailLayout';
import { Mic, Play, Pause, Volume2 } from 'lucide-react';
import Image from 'next/image';

interface PodcastDetailProps {
  data: ContentData;
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

interface YTEvent {
  target: YTPlayer;
  data: number;
}

// Add global type for YT API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (id: string, config: {
        height: string;
        width: string;
        videoId: string;
        playerVars: {
          playsinline: number;
          controls: number;
          disablekb: number;
        };
        events: {
          onReady: (event: YTEvent) => void;
          onStateChange: (event: YTEvent) => void;
        };
      }) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

export default function PodcastDetail({ data }: PodcastDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<YTPlayer | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const isYoutube = data.audioUrl && (data.audioUrl.includes('youtube.com') || data.audioUrl.includes('youtu.be'));

  // Extract video ID from URL
  const getVideoId = (url: string) => {
    if (url.includes('embed/')) return url.split('embed/')[1].split('?')[0];
    if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
    return '';
  };

  // Initialize YouTube API
  useEffect(() => {
    if (!isYoutube) return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        new window.YT.Player('youtube-audio-player', {
          height: '0',
          width: '0',
          videoId: getVideoId(data.audioUrl!),
          playerVars: {
            playsinline: 1,
            controls: 0,
            disablekb: 1,
          },
          events: {
            onReady: (event: YTEvent) => {
              setPlayer(event.target);
              setDuration(event.target.getDuration());
              setIsPlayerReady(true);
            },
            onStateChange: (event: YTEvent) => {
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
              if (event.data === window.YT.PlayerState.PLAYING) {
                 setDuration(event.target.getDuration());
              }
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      // Cleanup if needed
    };
  }, [data.audioUrl, isYoutube]);

  // Progress Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && player) {
      interval = setInterval(() => {
        const current = player.getCurrentTime();
        const dur = player.getDuration() || duration;
        setCurrentTime(current);
        if (dur > 0) setProgress((current / dur) * 100);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, player, duration]);

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DetailLayout type="podcast" data={data}>
      <div className="mb-8 bg-gray-900 text-white rounded-md p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          
          {/* Cover Art */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 bg-gray-800 rounded-md overflow-hidden shadow-md">
             <Image 
                src={data.author.image} 
                alt={data.title}
                fill
                className="object-cover"
             />
          </div>

          {/* Info & Player */}
          <div className="flex-1 w-full text-center md:text-left space-y-4">
             <div>
                <h2 className="text-xl font-bold mb-1">{data.title}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                   <Mic className="w-4 h-4" />
                   <span>{data.author.name}</span>
                </div>
             </div>

             {/* Audio Player Container */}
             <div className="w-full">
                {isYoutube ? (
                  <div className="relative w-full h-14 bg-black rounded-full overflow-hidden shadow-sm border border-gray-700 group">
                     {/* Hidden Container for YouTube Iframe */}
                     <div id="youtube-audio-player" className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none" />

                     {/* Custom Audio Player UI */}
                     <div 
                       className="absolute inset-0 flex items-center px-4 gap-4 bg-gray-900"
                     >
                       <button 
                         onClick={togglePlay}
                         disabled={!isPlayerReady}
                         className={`w-8 h-8 flex items-center justify-center rounded-full text-gray-900 transition-colors ${!isPlayerReady ? 'bg-gray-600 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-400'}`}
                       >
                         {isPlaying ? (
                           <Pause className="w-4 h-4 fill-current ml-0.5" />
                         ) : (
                           <Play className="w-4 h-4 fill-current ml-0.5" />
                         )}
                       </button>
                       
                       <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden relative group/bar cursor-pointer"
                            onClick={(e) => {
                               if (!player || !duration) return;
                               const rect = e.currentTarget.getBoundingClientRect();
                               const clickX = e.clientX - rect.left;
                               const percentage = clickX / rect.width;
                               player.seekTo(percentage * duration, true);
                            }}
                       >
                         <div 
                           className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300"
                           style={{ width: `${progress}%` }}
                         />
                       </div>
                       
                       <div className="text-xs text-gray-400 font-medium tabular-nums w-10 text-right">
                         {formatTime(currentTime)}
                       </div>
                       
                       <Volume2 className="w-4 h-4 text-gray-400" />
                     </div>
                  </div>
                ) : (
                  <audio controls className="w-full h-10 rounded-md">
                     <source src={data.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} type="audio/mpeg" />
                     Your browser does not support the audio element.
                  </audio>
                )}
             </div>
          </div>

        </div>
      </div>
    </DetailLayout>
  );
}
