import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';

export default function VideosDetail() {
  const {
    state: { video }, // state에 있는 video를 풀어준다.
  } = useLocation();
  // videoCard 컴포넌트에서 넘겨준 state를 받아온다.

  const { title, channelId, channelTitle, description } = video.snippet;

  return (
    <section className='flex flex-col lg:flex-row'>
      <article className='basis-4/6'>
        <iframe
          title={title} // img의 alt 처럼 iframe은 title을 필수적으로 사용해야 한다.
          id='player'
          type='text/html'
          width='100%'
          height='640'
          src={`http://www.youtube.com/embed/${video.id}`}
          frameBorders='0'
        ></iframe>
        <div className='p-8'>
          <h2 className='text-xl font-bold'>{title}</h2>
          {/* 채널 이미지는 video 안에 없으므로 따로 요청 */}
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre className='whitespace-pre-wrap'>{description}</pre>
        </div>
      </article>
      <section className='basis-2/6'>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
}
