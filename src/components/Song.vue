<template>
  <div class="song-box">
    <mt-header fixed red="title-tpl" title="song" style="z-index:10;"></mt-header>

    <!--搜索展示模块-->
    <mt-search ref="search-tpl" v-model="searchVal" placeholder="请输入你要寻找的音乐" cancel-text="取消" style="height: auto;">
      <ul class="song-ul" v-show="list.length"
        
        >
        <li class="song-li" v-if="searchType == 'bd'" v-for="li in list" @click="bdAudioGet(li.songid)">
          <mt-cell-swipe :title="li.songname" :label="li.artistname"></mt-cell-swipe>
        </li>

        <li class="song-li" v-if="searchType == 'kg'" v-for="(li, index) in list" @click="kgAudioGet(li.hash, index)">
          <mt-cell-swipe :title="li.songname" :label="li.singername"></mt-cell-swipe>
        </li>
      </ul>       
      <div class="kong" style="margin-top: 80px;" v-show="!list.length">没有所有结果</div>
    </mt-search>

    <!--播放模块-->
    <div class="audio-box" v-show="audioObj.isShow">
        <img :src="audioObj.img" alt="" class="audio-img fl">
        <div class="audio-center fl">
          <div class="audio-name">{{audioObj.name}}</div>
          <div class="audio-author">{{audioObj.author}}</div>
        </div>
        <div class="audio-btn-box fr">
          <i class="audio-btn audio-next fr" @click="playNext"></i>
          <i class="audio-play audio-btn fr" @click="play" v-show="!audioObj.isPlay"></i>
          <i class="audio-pause audio-btn fr" @click="pause" v-show="audioObj.isPlay"></i>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'song',
  data () {
    return {
      searchListUrl : ['/kgsongapi/api/v3/search/song', '/bdmusicapi/v1/restserver/ting'],
      searchType: 'kg',
      searchVal: this.$route.params.songname,
      list: [],
      loading: false,
      totalNum: 0,

      audioObj: {
        isShow: false,
        isPlay: false,
        index: 0,
        img: '',
        name: '',
        author: '',
      }
    }
  },
  mounted () {
    this.searchSong();
  },
  methods: {

    //搜索歌曲
    searchSong() {
      if(!this.searchVal.length){
        return;
      }

      if(this.searchType == 'kg'){
        this.kgSongSearch();
      }else if(this.searchType == 'bd'){
        this.bdSongSearch();
      }else{}
    },

    //酷狗搜索歌曲
    kgSongSearch(callback) {
      var _self = this;
      var url = this.searchListUrl[0];
      var param = {
        format: 'jsonp',
        keyword: _self.searchVal,
        page: _self.totalNum / 30 + 1,
        pagesize: 30,
        showtype: 1
      };

      _self.$jsonp(url, param).then(function(data){
        if(data.errcode == 0){
          _self.list = data.data.info;
          _self.totalNum = _self.list.length;
        }else{
          alert(data.error);
        }

        vm.$.isFunction(callback) && callback();
      });
    },

    //酷狗获取单首歌曲数据
    kgAudioGet(param, index) {
      var _self = this;
      var kgurl = '/kgmp3api/app/i/getSongInfo.php';
      var paramObj = {
        'cmd': 'playInfo',
        'hash': param,
        'from': 'mkugou'
      };

      vm.axios.get(kgurl, {params: paramObj}).then((resp) => {
        if(resp.status == 200){
          _self.play(resp.data, index);
        }
      });
    },

    //百度搜索 TOFIX
    bdSongSearch() {
      var _self = this;
      var url = this.searchListUrl[0];
      var param = {
        from: 'webapp_music',
        method: 'baidu.ting.search.catalogSug',
        format: 'jsonp',
        query: _self.searchVal
      };

      _self.$jsonp(url, param).then(function(data){
        //TODO
      });
    },

    //百度获取单首歌曲接口 TOFIX
    bdAudioGet(param) {
      //百度第二种搜索方式
      var _self = this;
      var bdurl = '/bdmusicapi/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.playAAC&format=jsonp&callback=song_playAAC&songid='+param;

      vm.axios.get(kgurl, {params: paramObj}).then((resp) => {
        if(resp.status == 200){
          //TODO
        }
      });
    },

    //加载更多TODO
    loadMore() {
      var _self = this;
      _self.loading = true;
      
      var promise = new Promise(function(resolve, reject){
        setTimeout(() => {
          _self.kgSongSearch(function(){
            resolve();
          });
        }, 2500);
      });

      promise.then(function(){
        _self.loading = false;
      });
    },

    //播放音乐
    play(data, index) {
      var _self = this;
      
      if(data.isTrusted){
        _self.audio && _self.audio.play();
        this.audioObj.isPlay = true;
        return;
      }
      _self.audioObj = {
        isShow: true,
        isPlay: true,
        index: index,
        img: data.imgUrl.replace('{size}','200'),
        name: data.songName,
        author: data.singerName
      };

      _self.audio ? _self.audio.pause() : _self.audio = new Audio();
      _self.audio.src = data.url;
      _self.audio.load();
      _self.audio.play();
    },

    //暂停
    pause() {
      this.audio && this.audio.pause();
      this.audioObj.isPlay = false;
    },

    //播放下一个音乐
    playNext() {
      var index = this.audioObj.index+1;
      if(index >= this.list.length){
        index = 0;
      }
      this.kgAudioGet(this.list[index].hash, index);
    }
  },
  watch: {
    searchVal: 'searchSong'
  }
}
 
</script>

<style>
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .song-ul{
    margin-top: 80px;
    padding-left: 0;
  }
  .mint-cell{
    background: none!important;
    text-align: left;
  }
  .mint-cell-wrapper{
    padding-left: 30px;
  }
  .song-li{
    list-style: none;
  }
  .mint-search-list{
    padding-bottom: 65px;
  }

  .audio-box{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    background: rgba(0,0,0,.9);
    color: #fff;
  }
  .audio-img{
    width: 60px;
    height: 60px;
    margin: 4px;
    border-radius: 4px;
  }
  .audio-center{
    padding: 12px 10px 12px;
    width: 50%;
  }
  .audio-name{
    text-align: left;
    line-height: 1.7;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    color: #fff;
  }
  .audio-author{
    text-align: left;
    line-height: 1.3;
    font-size: 14px;
    color: #888;
  }
  .audio-btn-box{
    margin-top: 16px;
    margin-right: 10px;
  }
  .audio-play{
    background: url(../assets/play_play.png) no-repeat;
    background-size: 100%;
  }
  .audio-btn{
    width: 32px;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
  .audio-pause{
    background: url(../assets/play_pause.png) no-repeat;
    background-size: 100%;
  }
  .audio-next{
    background: url(../assets/next_icon.png) no-repeat;
    background-size: 100%;
    margin-left: 10px;
  }
</style>