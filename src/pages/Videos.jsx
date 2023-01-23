import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const { keyword, videoId } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos', keyword, videoId], () => youtube.search(keyword));

  return (
    <>
      <div>Videos {keyword ? `${keyword}` : 'hot video'}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>something is wrong...</p>}
      {videos && (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grod-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
          {videos.map(video => (
            <VideoCard video={video} key={video.id} />
          ))}
        </ul>
      )}
    </>
  );
}
