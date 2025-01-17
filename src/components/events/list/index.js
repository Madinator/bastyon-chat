import {mapState} from 'vuex';
import f from "@/application/functions";
import * as _ from "underscore";


export default {
    name: 'events',
    props: {

        timeline: Object,
        events: Array,
        chat: Object,
        loading: Boolean,
        scrollType: ''


    },
    components: {},
    data: function () {

        return {
            type: '',
            tmt: null,
            lscroll: null,
            menuOpen: false,
            c: 1,
            ls: 0,
        }

    },

    watch: {
        events: function () {
        },
        
    },

    computed: {
        ios() {
            return f.isios();
        },

        ...mapState({
            auth: state => state.auth,
            mobile: state => state.mobile,
            scrollbottomshow: function () {
                return this.lscroll && this.lscroll.scrollTop > 500
            }
        }),

        eventsByPages: function () {
            var ps = [];
            var pc = 0

            _.each(this.events, function (e) {
                if (!pc) ps.push([])

                ps[ps.length - 1].push(e)

                pc++

                if (pc > 19) pc = 0
            })


            return ps
        }
    },
    destroyed: function () {
        this.core.menu(null)
    },
    mounted: function () {
    },

    methods: {

        dupdated: _.debounce(function () {
            this.$emit('updated', this.size())
        }, 75),

        dscroll: _.debounce(function () {
            return this.scroll()
        }, 35),

        ddscroll: function (e) {

            /*var _ls = this.$refs['container'].scrollTop 

            if (Math.abs(_ls - this.ls) > 500 && this.c * _ls < this.c * this.ls){
            }
            else{
                this.ls = _ls
            }*/

            this.dscroll()
        },

        emounted: function () {

            this.$nextTick(function () {
                this.scrollCorrection()
                this.dupdated()
            })

        },
        scroll: function () {
            this.$emit('scroll', this.size())
        },

        size: function () {

            var s = {
                scrollHeight: 0,
                scrollTop: 0,
                clientHeight: 0
            }

            if (this.$refs['container']) {

                s.scrollHeight = this.$refs['container'].scrollHeight
                s.scrollTop = this.c * this.$refs['container'].scrollTop
                s.clientHeight = this.$refs['container'].clientHeight
            }

            this.lscroll = s

            return s

        },

        editingEvent: function ({event, text}) {
            this.$emit('editingEvent', {event, text})
        },

        replyEvent: function ({event}) {
            this.$emit('replyEvent', {event})
        },

        removeEvent: function (event) {
            this.$emit('removeEvent', event)
        },

        showPhotoSwipe(index) {
            this.isOpen = true
            this.$set(this.options, 'index', index)
        },

        hidePhotoSwipe() {
            this.isOpen = false
        },

        galleryOpen(e) {
            this.$emit('galleryEventOpen', e)
        },

        scrolldown() {
            this.scrollToNew(0)
        },

        scrollCorrection() {
            //this.scrollToNew(this.c * this.ls)
        },
        scrollToNew(s) {
            if (this.$refs['container']) {

                this.$refs['container'].scrollTop = this.c * s
            }
        },

        menuIsVisibleHandler: function (isVisible) {
            this.menuOpen = isVisible;
            this.$emit('menuIsVisible', isVisible);
        },

        mousewheel: function (e) {

            if(this.scrollType === 'custom'){
                return

            }else {
                e.preventDefault();
                var dy = e.deltaY

                this.$refs['container'].scrollTop += dy > 0 ? -60 : 60
                return false
            }

        }

    },

}