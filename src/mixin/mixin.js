import { getWholeSongs, getSongDetail } from '../network/api' // 通过歌单请求所有歌曲数据
export const updateSongDetail = {
  data() {
    return {
      songDetail: null,
    };
  },
  created(){
    this.updateSongDetail();
  },
  mounted() {
    this.$bus.$on("up", () => {
      this.updateSongDetail();
    });
  },
  methods:{
    updateSongDetail() {
      let index = JSON.parse(localStorage.getItem("index")),
        song = JSON.parse(localStorage.getItem("song"));
      if (song) {
        this.songDetail = song[index];
      } else {
        this.songDetail = null;
      }
    },
  }
}

// 歌单播放(歌单页全部播放)
export const playlistPlay ={
  methods: {
        // playSong 子组件的播放音乐按钮
        playSong(id) {
          getWholeSongs(id).then((v) => {
            // 请求全部歌曲
            let s = [];
            v.data.playlist.trackIds.forEach((item) => {
              s.push(item.id);
            });
            s = s.join(",");
            getSongDetail(s).then((res) => {
              // 将歌曲列表存到本地
              localStorage.setItem("song", JSON.stringify(res.data.songs));
              // 将歌曲索引存到本地
              localStorage.setItem("index", JSON.stringify(0));
              // 通知Vuex发起请求获取某首音乐的URL
              this.$store.dispatch("SongUrl");
            });
            // getSongDetail()
          });
        },
  }
}
