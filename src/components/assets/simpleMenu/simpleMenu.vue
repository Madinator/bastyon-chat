<template>
  <div>
    <div class="items">
      <transition-group name="menulis2t" tag="div">
            <div class="item" v-bind:key="item.click" v-for="item in filteredItems">
                <slot v-bind:item="item">
                    <router-link :to="'/' + item.route">
                        <div class="iwr">
                            <i :class="item.icon" v-if="item.icon"></i>
                            <span>{{item.name && typeof item.name === 'string' ? item.name : 'undefined'}}</span>
                        </div>
                    </router-link>
                </slot>
            </div>
        </transition-group>
    </div>
  </div>
</template>

<script>
export default {
    name: 'simpleMenu',
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    computed: {
        filteredItems: function() {
            console.log('this.items', this.items)
            return this.items.filter(item => !item.hidden);
        }
    },
}
</script>
<style scoped lang="sass" src="./index.sass"></style>

<!-- THEMES BEGIN -->
<style scoped lang="sass" src="./themes/theme_white.sass"></style>
<style scoped lang="sass" src="./themes/theme_black.sass"></style>
<!-- THEMES END -->
