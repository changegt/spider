<template>
	<div class="music-box">
		<div class="data-box" style="display: none;" v-html="dom"></div>
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
			         	_self.setNextTick();
			        }
			      });
		      }, 200)
		    },
		    setNextTick() {
		    	var _self = this;
	         	_self.$nextTick(() => {
	         		_self.anylise();
	         	});
		    },

		    anylise() {
		    	var dom = document.getElementsByClassName('view-state')[0].innerHTML;
		    	var obj = eval('('+dom+')');
		    }
		}
	}
</script>

<style type="text/css">
	.view-state{
		display: none;
	}
	.backside {
		display: none;
	}
</style>