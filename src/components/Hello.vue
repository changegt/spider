<template>
  <div class="hello">
      <mt-header fixed red="title-tpl" title="spider页面"></mt-header>
      <mt-search ref="search-tpl" v-model="searchVal" placeholder="请输入你要寻找的音乐" cancel-text="取消" >
      </mt-search>
  </div>
</template>

<script>

// import { Header } from 'mint-ui';
// Vue.component(Header.name, Header);

export default {
  name: 'hello',
  data () {
    return {
      searchVal: ''
    }
  },
  mounted () {

  },
  methods: {
    jump (newVal, oldVal) {
      var _self = this;
      if(newVal != oldVal){
        _self.$router.push({name: 'Song', params: { songname: newVal }});
      }
    }
  },
  watch: {
    searchVal: 'jump'
  }
}
</script>

<!-- http://musicapi.qianqian.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.search.catalogSug&format=jsonp&query=%E4%B8%89%E5%9B%BD -->


