<template>
    <div class="audio-player">
        <span class="icon-trash option right" v-if="canDelete" @click="$emit('delete')"></span>
        <div class="audio-player__inner">
          <div class="player-button" @click="play">
            <span class="icon-control-pause" v-if="player.playing"></span>
            <span class="icon-control-play" v-if="!player.playing"></span>
            <button class="test-button" style="display: none;"></button>
          </div>
          <div class="player-details">
            <progress :value="progress" max="100" @click="updateProgress"></progress>
            <div class="time">
              <span class="current">{{player.currentTime | formatTime}}</span>
              <span class="final right">{{player.duration | formatTime}}</span>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props:{
  	src:{
  		required: true
  	},
  	canDelete: {
  		type: Boolean,
  		default: false
  	}
  },
  data() {
    return {
    	player: {
    		playing: false,
    		audio: null,
    		duration: 0,
    		currentTime: 0,
    		progress: 10
    	}
    };
  },
  created(){
      	this.player.audio = new Audio(this.src);
      	this.player.audio.autoplay = true;
      	this.player.audio.muted = true;

        // setTimeout(() => {
        //     if (!this.player.audio.paused) return;
        //     setTimeout(() => {
        //         if (!this.player.audio.paused) return;
        //         this.player.audio.play();
        //     }, 1000);

        //     this.player.audio.play();
        // }, 300);

      	var playInterval = setInterval(()=>{
      		if(this.player.currentTime > 0 && !this.player.audio.paused){
      			this.player.audio.autoplay = false;
      			this.player.audio.muted = false;
      			this.player.audio.pause();
      			this.player.audio.currentTime = 0;
      			clearInterval(playInterval);
      		}
      	}, 25);

		this.player.audio.onloadedmetadata = ()=> {
		    // it should already be available here
		    var invalidDuration = this.player.audio.duration === Infinity || this.player.audio.duration === NaN;
		    // handle chrome's bug
		    if(!invalidDuration){
		    	this.player.duration = this.player.audio.duration;
		    }else{
		      // set it to bigger than the actual duration
		      this.player.audio.currentTime = 1e101;
		      var self = this;
		      this.player.audio.ontimeupdate = function() {
		        this.ontimeupdate = () => {
		          self.player.currentTime = self.player.audio.currentTime;
		        }
		        	self.player.duration = self.player.audio.duration;
		        	self.player.audio.currentTime = 0;
		        	self.player.currentTime = 0;
		      }

		      this.player.audio.onplay = () => {
		      	this.player.playing = true;
		      }
		      this.player.audio.onpause = () => {
		      	this.player.playing = false;
		      }
		    }
		};
  },
  methods:{
  	updateProgress(e){
  		var target = e.target;
  		var offset = target.getBoundingClientRect();
  		var x = e.pageX - offset.left;

  		this.player.audio.currentTime = ( parseFloat( x ) / parseFloat( target.offsetWidth) ) * this.player.duration;
  	},
  	play(){
      console.log(this.player.audio.autoplay);
  		if(this.player.playing){
  			this.player.audio.pause();
  		}else{
        	this.player.audio.play();
  		}
  	},
  },
  computed:{
  	progress(){
  		var invalidDuration = this.player.audio.duration === Infinity || this.player.audio.duration === NaN || this.player.duration === 0 ;
  		if(!invalidDuration){
  			return (this.player.currentTime/this.player.duration) * 100;			
  		}else{
  			return 0;
  		}
  	}
  }
};
</script>

<style lang="css" scoped>
</style>
