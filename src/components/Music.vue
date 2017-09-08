<template>
	<div class="music-box" style="text-align: left;">
		<div>歌曲名字：{{data.songinfo.title}}</div>
		<div>歌曲作者：{{data.songinfo.author}}</div>
		<a :href="data.bitrate.file_link">歌曲link：{{data.bitrate.file_link}}</a>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'music',
		data() {
			return {
				songid: this.$route.params.songid,
				data: {}
			};
		},
		mounted() {
			this.play2(this.songid);
		},
		methods: {
			play(songid) {
		      var _self = this;
		      setTimeout(() => {
			      vm.axios.get('/song/'+songid+'?_partial=true&header=false').then(function(resp){
			        if(resp.status == 200){
			         	_self.dom = resp.data.content;
			         	console.log(resp.data);
			        }
			      });
		      }, 200)
		    },

		    play2() {
		    	var _self = this;
		    	var url = '/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.playAAC&format=jsonp&callback=song_playAAC&songid='+this.songid+'&s_protocol=';
		    	setTimeout(() => {
		    		vm.axios.get(url).then(function(resp){
			        if(resp.status == 200){
			        	var data = resp.data.split('/**/song_playAAC(')[1].split(');')[0];
			        	_self.data = eval('('+data+')');
			        	console.log(_self.data);
			        }
			      });
		    	}, 200);
		    }
		}
	}
</script>