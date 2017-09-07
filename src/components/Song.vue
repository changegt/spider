<template>
  <div class="song-box">
    <mt-header fixed red="title-tpl" title="spider页面" style="z-index:10;"></mt-header>
    <mt-search ref="search-tpl" v-model="searchVal" placeholder="请输入你要寻找的音乐" cancel-text="取消" >
    	<div class="song-ul" v-show="lists.length" style="margin-top: 80px;">
        <div class="song-li" v-for="li in lists" @click="search2(li.songid)">
          <!-- <mt-cell :title="li.songname" :label="li.artistname" style="text-align: left; padding-left: 20px;" :to="'/music/'+li.songid" is-link></mt-cell> -->
          <mt-cell-swipe :title="li.songname" :label="li.artistname" style="text-align: left; padding-left: 20px;"></mt-cell-swipe>
        </div>
    	</div>
      <div class="kong" style="margin-top: 80px;" v-show="!lists.length">没有所有结果</div>
    </mt-search>
    <audio :src="audioSrc" preload="auto"></audio>
  </div>
</template>

<script>

export default {
  name: 'song',
  data () {
    return {
      searchVal: this.$route.params.songname,
      lists: [],
      audioSrc: ''
    }
  },
  mounted () {
    this.search1();
  },
  methods: {
    search1() {
      var _self = this;
      setTimeout(() => {
        var url = '/v1/restserver/ting?from=webapp_music&method=baidu.ting.search.catalogSug&format=jsonp&query='+_self.searchVal;
        vm.axios.get(url).then(function(resp){
          if(resp.status == 200){
            if(resp.data.error_code == 22000){
              _self.lists = resp.data.song;
            }else{
              _self.lists = [];
            }
          }
        })
      }, 200);
    },

    search2(songid) {
      //百度第二种搜索方式
      var _self = this;
      var url = '/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.playAAC&format=jsonp&callback=song_playAAC&songid='+songid;
      vm.axios.get(url).then((resp) => {
        if(resp.status == 200){
          var str = resp.data.split('/**/song_playAAC(')[1].split(');')[0];
          var obj = eval('('+str+')');
          _self.play(obj);
        }
      });
    },

    play(obj) {
      var _self = this;
      if(obj.error_code == 22000){
        console.log('音乐地址'+obj.bitrate.file_link);
        var audio = new Audio();
        _self.audioSrc = obj.bitrate.file_link.split('http://zhangmenshiting.baidu.com')[1];
        // _self.audioSrc = 'http://fs.web.kugou.com/cd8915ef07cda453c7922204de61aff1/59b17676/G113/M05/16/0D/EYcBAFlY-AaABwivAEObryqvOLU503.mp3';
        console.log(_self.audioSrc);
      }else{
        console.log('error');
      }
    }
      //http://musicapi.qianqian.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.playAAC&format=jsonp&callback=song_playAAC&songid=246667275
    
  },
  watch: {
    searchVal: 'search1'
  }
}
</script>