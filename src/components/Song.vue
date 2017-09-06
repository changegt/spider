<template>
  <div class="song-box">
    <mt-header fixed red="title-tpl" title="spider页面" style="z-index:10;"></mt-header>
    <mt-search ref="search-tpl" v-model="searchVal" placeholder="请输入你要寻找的音乐" cancel-text="取消" >
    	<div class="song-ul" v-show="lists.length" style="margin-top: 80px;">
        <div class="song-li" v-for="li in lists">
          <mt-cell :title="li.songname" :label="li.artistname" style="text-align: left; padding-left: 20px;" :to="'/music/'+li.songid" is-link></mt-cell>
        </div>
    	</div>
      <div class="kong" style="margin-top: 80px;" v-show="!lists.length">没有所有结果</div>
    </mt-search>
  </div>
</template>

<script>

export default {
  name: 'song',
  data () {
    return {
      searchVal: this.$route.params.songname,
      lists: []
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

    search2() {
      //百度第二种搜索方式
    },

    
  },
  watch: {
    searchVal: 'search1'
  }
}
</script>