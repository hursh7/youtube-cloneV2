import axios from 'axios';

// mockup 데이터
export default class FakeYoutubeClient {
  async search({ params }) {
    return params.relatedToVideoId
      ? axios.get('/videos/related.json')
      : axios.get('/videos/search.json');
  }

  async videos() {
    return axios.get('/videos/popular.json');
  }

  async channels() {
    return axios.get('/videos/channel.json');
  }
}
