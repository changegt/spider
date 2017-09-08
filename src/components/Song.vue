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
      searchListUrl : ['/kgsongapi/api/v3/search/song', '/bdmusicapi/v1/restserver/ting'],
      searchVal: this.$route.params.songname,
      lists: [],
      audioSrc: ''
    }
  },
  mounted () {
    this.search1('kg');
  },
  methods: {
    search1(type) {
      var _self = this;
      setTimeout(() => {
        // param format=jsonp&keyword=%E4%B8%89%E5%9B%BD&page=1&pagesize=30&showtype=1

        var url = '', param = {};
        if(type == 'kg'){
          url = this.searchListUrl[0];
          param = {
            format: 'jsonp',
            keyword: _self.searchVal,
            page: 1,
            pagesize: 30,
            showtype: 1
          };
        }else if(type == 'bd'){
          url = '/bdmusicapi/v1/restserver/ting';
          param = {
            from: 'webapp_music',
            method: 'baidu.ting.search.catalogSug',
            format: 'jsonp',
            query: _self.searchVal
          };
        }
        vm.$jsonp(url, param).then(function(data){
          console.log(data);
        });

        // var url = '/bdmusicapi/v1/restserver/ting?from=webapp_music&method=baidu.ting.search.catalogSug&format=jsonp&query='+_self.searchVal;
        // vm.axios.get(url).then(function(resp){
        //   if(resp.status == 200){
        //     if(resp.data.error_code == 22000){
        //       _self.lists = resp.data.song;
        //     }else{
        //       _self.lists = [];
        //     }
        //   }
        // })
      }, 200);
    },

    kgAnalysis(data) {
      debugger;
    },

    bdAnalysis(data) {

    },

    search2(songid) {
      //百度第二种搜索方式
      var _self = this;
      var url = '/bdmusicapi/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.playAAC&format=jsonp&callback=song_playAAC&songid='+songid;
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
        var audio = new Audio();
        // _self.audioSrc = obj.bitrate.file_link.split('http://zhangmenshiting.baidu.com')[1];
        _self.audioSrc = obj.bitrate.file_link;
        // _self.audioSrc = 'http://fs.web.kugou.com/cd8915ef07cda453c7922204de61aff1/59b17676/G113/M05/16/0D/EYcBAFlY-AaABwivAEObryqvOLU503.mp3';
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

/** 
 * param 将要转为URL参数字符串的对象 
 * key URL参数字符串的前缀 
 * encode true/false 是否进行URL编码,默认为true 
 *  
 * return URL参数字符串 
 */  
var urlEncode = function (param, key, encode) {  
  if(param==null) return '';  
  var paramStr = '';  
  var t = typeof (param);  
  if (t == 'string' || t == 'number' || t == 'boolean') {  
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);  
  } else {  
    for (var i in param) {  
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);  
      paramStr += urlEncode(param[i], k, encode);  
    }  
  }  
  return paramStr;  
};  
</script>