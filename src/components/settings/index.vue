<template>
  <div id="settings">
  
  
    <div class="infoPart">


      <div class="inputWrapper" v-for="value in settings">

        <div class="forInput">
          <toggle-button @change="e => set_settings(value.id, e)" :value="get_settings(value.id)"/>
        </div>

        <div class="label">
          <label :for="'settings_' + value.id">{{ $t(value.label) }}</label>
        </div>

      </div>
        
        
    </div>
  
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>

<!-- THEMES BEGIN -->
<style scoped lang="sass" src="./themes/theme_white.sass"></style>
<style scoped lang="sass" src="./themes/theme_black.sass"></style>
<!-- THEMES END -->





















