import { getWholeSongs, getSongDetail,getSongInfo } from '../network/api' // 通过歌单请求所有歌曲数据
export const updateSongDetail = {
  data() {
    return {
      songDetail: {id:0},
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
        this.songDetail =  {id:0};
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

// 单独的歌曲播放
export const songPlay = {
  methods:{
    bofang(id) {
    // 如果歌曲没有版权，则弹框提醒
    getSongInfo(id).then((b) => {
        let flag = true;
        let song = JSON.parse(localStorage.getItem("song")?localStorage.getItem("song"):"[]");
        for (let i = 0; i < song.length; i++) {
          if (song[i].id === id) {
            flag = false;
            break;
          }
        }
        // flag 为true 代表歌单中目前没有该歌曲
        if (flag) {
          // 将其添加到本地
          song.push(b.data.songs[0]);
          localStorage.setItem("song", JSON.stringify(song));
          // 修改 index 为最后
          localStorage.setItem('index',song.length-1)
          this.$store.dispatch("SongUrl");
        } else {
          // 找出重复的歌在歌单中的下标位置
          let i = song.findIndex((item) => {
            return item.id === id;
          });
          // 存下index
          localStorage.setItem('index',i)
          this.$store.dispatch("SongUrl");
       
        }
      });
    

  },
  }
}