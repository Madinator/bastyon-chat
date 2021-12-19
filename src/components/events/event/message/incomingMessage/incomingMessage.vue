<template>
    <label>
        <label  v-for="(elem, index) in fixedMessage" v-bind:key="index">
            <label class="likelink" v-if="elem.isUsername" @click="core.mtrx.opencontact(getUser(elem.message))"> {{elem.message}} </label>
            <label v-else> {{elem.message}} </label>
        </label>
    </label>
</template>

<script>
export default {
    name: 'IncomingMessage',
    props: {
        message: {
            type: String,
            default: ''
        },
        roomId: {
            type: String
        }
    },
    data() {
        return {
            user_id_regex: /\w{68}:/,
            user_regex: /(^|\s)@\w{68}:\w{1,50}/,
        }
    },
    computed: {
        fixedMessage() {
            let fixedMessage = []

            for(let elem of this.message.split(' ')) {
                if(this.user_regex.test(elem)) {
                    fixedMessage.push({message : elem.replace(this.user_id_regex, ''), isUsername : true})
                }
                else {
                    fixedMessage.push({message: elem, isUsername: false})
                }
            }
            return fixedMessage
        }
    },
    methods: {
        getUser(userName){
            let user = this.core.mtrx.chatUsersInfo(this.roomId, 'anotherChatUsers')
            .filter(word => word.name === userName.trim().slice(1).toLowerCase())[0]
            return user
        }
    }
}
</script>

<style lang="sass" scoped>

.likelink 
    color: #f44336
    cursor: pointer
    content: attr(data-text)

.likelink:hover
    color: red
    

</style>