<template>

  <div ref="metaMsg" class='metaMsg'>

    <div class="pocketnet_iframe" v-show="iframe" ref="iframe">
    </div>

    <div class="openlink" v-if="iframe && gotopn">
      <button class="button orange small rounded" @click="openlinkiframe(url)">{{$t('caption.open')}}</button>
    </div>

    <div class="matrixUrl" v-if="matrix">
      <matrixlink :url="url"/>
    </div>

    <div class="customURL" v-if="!iframe && !matrix">

      <div class="link">
        <div @click="openlink(url)"><i class="fas fa-link"></i> <span>{{url}}</span></div>
      </div>

      <div class="header" v-if="image || title">  

        <div v-if="image">
          <bgimage :src="image" />
        </div>

        <div class="header-text">
          <span class="title">{{ title }}</span>
          <span class="description" v-if="description">{{ description }}</span>
        </div>
      </div>

      <Player v-if="video" :video="video_url" :autoplay="false" />

    </div>

  </div>
</template>
<script>
import Player from '@/components/chat/player/Player.vue'
import Widgets from '@/application/utils/widgets.js'
import matrixlink from '@/components/events/event/metaMessage/matrixlink.vue'

import imagesLoaded from 'vue-images-loaded'

import f from '@/application/functions'
import { createLogger } from 'node_modules/vuex/types'
// import Plyr from 'plyr'

export default {
  components: {
    Player, matrixlink
  },
  directives: {
    imagesLoaded
  },
  props: {
    title: String,
    msg: String,
    name: String,
    description: String,
    image: String,
    video: String,
    url: String,
    h: Number, 
    w: Number,
    initImageWidth: Number,
    imageFactor: Number,
    clientWidth: Number,
    post: String,
    type : String,
  },

  data: () => {
    return {
      link: '',
      txt: String,
      gotopn : false
    }
  },
  computed: {
    smallsize(){
      if (this.url){
        var _u = new URL(this.url)

        if(_u.pathname && _u.pathname != '/') return false

        return true
      }
    },

    imageWidth(){
      return this.clientWidth < 650 ? this.imageFactor * this.initImageWidth : this.initImageWidth;
    },

    getUrl : function () {

        var domain = window.pocketnetdomain || 'pocketnet.app'

        if(this.metaUrl) return new URL(this.metaUrl).hostname === domain
    },

    imageHeight(){

      const ratio = this.w / this.imageWidth;

      return this.h / ratio || 300;
    },

    iframe(){
      if(this.type === 'pocketnet') {
        return true
      }
    },

    matrix(){
      if(this.type === 'matrix') {
        return true
      }
    }
  },

  beforeMount() {
    if(this.video) this.video_url = this.video
  },
  mounted() {
    
    if(this.type === 'pocketnet' && this.$refs.iframe) {

      let widget = new Widgets()

      if(this.$refs.iframe)

        this.gotopn = widget.makefromurl(this.$refs.iframe, this.url, (before) => {
          this.updatedSize(before)
        }, {
          theme : this.core.vm.ctheme || this.$store.state.theme
        })

    }
  
  },
  
  methods: {

    openlink : function(url){

      if(typeof window != 'undefined' && typeof window.cordova != 'undefined' && cordova.InAppBrowser){
        var ref = cordova.InAppBrowser.open(url, '_system');
        return false
			}
      else{
        window.open(url, "_blank")
      }

    },

    openlinkiframe : function(url){

      if(this.core.backtoapp) {

        var pu = new URL(url)

        this.core.backtoapp(pu.pathname.replace('/', '') + pu.search)
      }
      else
          window.open(url,"_blank")
    },

    imagesLoaded : function(){
      //this.updatedSize()
    },
    updatedSize: function(before) {
        //this.$emit('updatedSize', before)
    },
  },

}
</script>

<style lang="less" src="@/components/events/event/metaMessage/exported.less"></style>
<style lang="less" src="@/components/events/event/metaMessage/exported2.less"></style>
<style src="@/styles/peerTube.css"></style>

<style scoped lang="sass" src="./index.sass"></style>

<!-- THEMES BEGIN -->
<style scoped lang="sass" src="./themes/theme_white.sass"></style>
<style scoped lang="sass" src="./themes/theme_black.sass"></style>
<!-- THEMES END -->