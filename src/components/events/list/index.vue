<template>
  <div id="events" class="maskedtop" :class="{mobile, ios, menuOpen, imagesList: (this.scrollType === 'custom' ? 'imagesList' : '')}">
    <div class="eventsflex" v-on="" @mousewheel="mousewheel" ref="container" @scroll="dscroll" :class="{mobile, ios, menuOpen}">
      <div class="ewr">
            
          <div class="eventWrapper"
              v-for="(event, i) in events"
              :key="event.event.event_id"
          >

            <eventsEvent
                :event="event"
                :prevevent="events[i+1]"
                :galleryData="events"
                :chat="chat"
                :timeline="timeline"
                :last="i == 0"
                @openImageEvent="e => galleryOpen(e)"
                @removeEvent="e => removeEvent(event)"
                @editing="text => editingEvent({event, text})"
                @reply="e => replyEvent({event})"
                @mounted="emounted"
                @menuIsVisible="menuIsVisibleHandler"
                
            />

          </div>
      </div>

      <div class="preloadingWrapper" v-if="loading">
        <linepreloader />
      </div>

      

    </div>

    <transition name="fade">
      <div class="scrollbottom" v-show="scrollbottomshow" @click="scrolldown"> 
        <i class="fas fa-chevron-down"></i>
      </div>
    </transition>

 

  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>

<!-- THEMES BEGIN -->
<style scoped lang="sass" src="./themes/theme_white.sass"></style>
<style scoped lang="sass" src="./themes/theme_black.sass"></style>
<!-- THEMES END -->





















