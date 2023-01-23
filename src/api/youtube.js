export default class Youtube {
  // 외부로 부터 apiClient를 전달 받는다.
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  // 유튜브 채널 이미지 url을 가져오기 위한 함수
  async channelImageUrl(id) {
    return this.apiClient
      .channels({
        params: {
          part: 'snippet',
          id,
        },
      })
      .then(res => res.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideos(id) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          relatedToVideoId: id,
        },
      })
      .then(res =>
        res.data.items.map(item => ({ ...item, id: item.id.videoId }))
      );
  }

  // search.json 과 popular.json의 items의 id 형태가 다르다. (객체 / 문자열)
  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          q: keyword,
        },
      })
      .then(res =>
        res.data.items.map(item => ({ ...item, id: item.id.videoId }))
      );
    // items의 id를 items.id의 videoId로 덮어 씌어서 같은 형태로 맵핑 해준다.
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
        },
      })
      .then(res => res.data.items);
  }
}
