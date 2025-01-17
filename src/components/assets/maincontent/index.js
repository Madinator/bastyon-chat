import { mapState } from 'vuex';
import contact from '@/components/contact/index.vue'
import contacts from '@/components/contacts/list/index.vue'
import complain from '@/components/complain/index.vue'
export default {
    name: 'maincontent',
    props: {
        rbackexp : Boolean
    },

    components : {
        contact, contacts, complain
    },

    data : function(){

        return {
            loading : false
        }

    },

    created : () => {

    },

    watch: {
        //$route: 'getdata'
    },

    

    computed: mapState({
        auth : state => state.auth,
        iconshow: function() {
			return this.$store.state.icon ? true : false
		},
        pocketnet: state => state.pocketnet,
        minimized: state => state.minimized,
        active : state => state.active,
        modalShowed : state => state.modalShowed,
        hiddenInParent : state => state.hiddenInParent,
        mobile : state => state.mobile
    }),

    methods : {
        setactive : function(){
            this.$store.commit('active', true)
            this.$store.commit('blockactive', {value : true, item : 'main'})
            this.$store.commit('setiteraction', true)
        },
        mouseenter : function(){
            /*this.$store.commit('active', true)
            this.$store.commit('blockactive', {value : true, item : 'main'})*/
        },

        mouseleave : function(){

            if (this.$store.state.autohide){
                this.$store.commit('active', false)
            }
            // console.log("MEOW")
            this.$store.commit('blockactive', {value : false, item : 'main'})
        },

        effect : function(e){
            /*const x = e.pageX - e.target.offsetLeft
            const y = e.pageY - e.target.offsetTop

            e.target.style.setProperty('--x', `${ x }px`)
            e.target.style.setProperty('--y', `${ y }px`)*/
        },

        closeModal : function(){
            this.$store.commit('setmodal', null)
        },

        scroll : function(v){
            this.$refs['scrollable'].scrollTop = v || 0
        },
        
      
    },
}