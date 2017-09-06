<template>
	<div class="music-box">
		<div v-html="dom"></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'music',
		data() {
			return {
				songid: this.$route.params.songid,
				dom: ''
			};
		},
		mounted() {
			this.play(this.songid);
		},
		methods: {
			play(songid) {
		      var _self = this;
		      setTimeout(() => {
			      vm.axios.get('/song/'+songid+'?_partial=true&header=false').then(function(resp){
			        if(resp.status == 200){
			         	_self.dom = resp.data.content;
			        }
			      });
		      }, 200)
		    }
		}
	}
</script>