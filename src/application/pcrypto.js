var _ = require('underscore');
import f from "@/application/functions";
const SHA2 = require("sha2");
const BN = require('bn.js')
import * as miscreant from "miscreant";
var pbkdf2 = require('pbkdf2')
const EC = require('elliptic').ec
const secp256k1 = new EC('secp256k1')
var salt = 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82'
import cryptoRandomString from 'crypto-random-string';


const n = secp256k1.curve.n


var PcryptoRoom = function(pcrypto, chat){
    var self = this
        this.configurable = false


    var mtrxkit = pcrypto.core.mtrx.kit
    var hashes = {}

    var users = {}
    var m = 12

    var usersinfo = {}
    var usershistory = []

    var tetatet = pcrypto.core.mtrx.kit.tetatetchat(chat)


    var pcryptoFile = new PcryptoFile()

    chat.pcrypto = self
    
    self.clear = function(){

        hashes = {}
        usersinfo = {}
        usershistory = []
        users = {}
    
    }

    var lcachekey = 'pcrypto4_' + chat.roomId + '_';
    var ecachekey = 'e_pcrypto4_';
    var cache = {}

    

    self.preparedUsers = function(time){
        return _.filter(getusersinfobytime(time), function(ui){
            return ui.keys && ui.keys.length == m
        })
    }

    self.cantchat = function(){

        var pu = self.preparedUsers()

        if (pcrypto.core.mtrx.kit.tetatetchat(chat) && pu.length && pu.length < 2){
            return true
        }

        return false
    }

    self.canBeEncrypt = function(time){

        var usersinfoArray = _.toArray(usersinfo)

        if (

            pcrypto.user && pcrypto.user.private && 
            users[pcrypto.user.userinfo.id] && 
            pcrypto.core.mtrx.kit.tetatetchat(chat) &&
            usersinfoArray.length > 1 && usersinfoArray.length < 5 && 
            self.preparedUsers(time).length / usersinfoArray.length > 0.6){

            return true

        }

        return false

    }


    self.userschanded = function(){

        if(!self.cantchat()){
            return Promise.resolve()
        }
        
        self.clear()

        return self.prepare()
    }

    var getusersinfo = function(){
        var us = _.map(users, function(uh){
            return uh.id
        }) 

        /////////////////// FAIL

        return pcrypto.core.user.usersInfo(us).then(_usersinfo => {

            usersinfo = {}
            
            _.each(_usersinfo, function(ui){
                usersinfo[ui.id] = ui
            })

            return Promise.resolve()
        })
    }

    var getuserseventshistory = function(){


        var tetatet = pcrypto.core.mtrx.kit.tetatetchat(chat) 

        var history =  _.filter(_.map(chat.currentState.getStateEvents("m.room.member"), function(ue){
            var event = ue.event

            var membership = event.content.membership

            if (membership == 'join' || (membership == 'leave' && !tetatet) || (tetatet && membership == 'invite')){

                return {
                    time : event.origin_server_ts || 1,
    
                    membership : membership,
    
                    id : membership == 'invite' ? f.getmatrixid(event.state_key) : f.getmatrixid(event.sender)
                }
            }

            return null

        }), function(h){
            return h
        }) 

        history = _.sortBy(history, function(ui){
            return ui.time
        })

        return history
    }

    var period = function(time){
        var period = 0
        var h = getuserseventshistory()

        for(var i = h.length - 1; i >= 0; i--){
            if(h[i].time < time && !period){
                period = i
            }
        }

        return period
    }

    var getusershistory = function(){
        var history = getuserseventshistory()

        var tetatet = pcrypto.core.mtrx.kit.tetatetchat(chat) 

        _.each(history, function(ui){
            if(!users[ui.id]) {
                users[ui.id] = {
                    id : ui.id,
                    life : []
                }
            }

            var l = users[ui.id].life

            if (ui.membership && (ui.membership == 'join' || (ui.membership == 'invite' && tetatet))){
                l.push({
                    start : tetatet ? 1 : ui.time
                })
            }
            else{

                if (l.length && ui.membership == 'leave' && !tetatet){
                    var last = l[l.length - 1]

                    last.end = ui.time
                }
                
            }
        })

        //console.log("history", history)

    }

    var getusersinfobytime = function(time){
        var us = getusersbytime(time)

        return _.filter(_.map(us, function(u){
            return usersinfo[u.id]
        }), function(u){return u})
    }

    var getusersbytime = function(time){
        return _.filter(users, function(ui){

            var l = _.find(ui.life, function(l){

                if(!time){
                    if(l.start && !l.end) return true
                }
                else{
                    if(l.start < time && (!l.end || l.end > time)) return true
                }

            })

            if(l) return true
        })
    }

    //self.users = users
    self.getusersinfobytime = getusersinfobytime

    self.prepare = function(){

        getusershistory()

        return getusersinfo().then(r => {
            return self
        })

    }


    var ls = {
        set : function(k, v){
            try{
                localStorage[lcachekey + pcrypto.user.userinfo.id + '-' + k] = JSON.stringify(v)
            }
            catch(e){
               // console.error(e)
            }
        },

        get : function(k){
            var v = null;

            try{
                v = JSON.parse(localStorage[lcachekey + pcrypto.user.userinfo.id + '-' + k])
            }
            catch(e){
                //console.error(e)
            }
            
            return v
        }
    }

    var lse = {
        set : function(eventid, v){
            try{
                localStorage[ecachekey + pcrypto.user.userinfo.id + '-' + eventid] = JSON.stringify(v)
            }
            catch(e){
                console.log("E", e)
               // console.error(e)
            }
        },

        get : function(eventid){
            var v = null;

            try{
                v = JSON.parse(localStorage[ecachekey + pcrypto.user.userinfo.id + '-' + eventid])
            }
            catch(e){
                //console.error(e)
            }
            
            return v
        }
    }

    var convert = {
        aeskeys : {
            inp : function(k){
                var kr = {}

                _.each(k, function(v, i){
                    kr[i] = f._arrayBufferToBase64(v)
                })

                return kr
            },
            out : function(k){

                var kr = {}

                _.each(k, function(v, i){
                    kr[i] = new Uint8Array(f._base64ToArrayBuffer(v))
                })

                return kr

            }
        }
    }
    

    var eaac = {
        aeskeysls : function(time, block){

            if(!time) time = 0
            if(!block) block = pcrypto.currentblock.height

           // block = 100 * (block / 100).toFixed(0)

            var k = period(time) + '-' + block

            //console.log('getusersbytime', getusersbytime(time), users, time, chat.currentState.getStateEvents("m.room.member"))
            //debugger
            var keys = ls.get(k)


            if (keys){
                keys = convert.aeskeys.out(keys)
            }
            else{
                keys = eaac.aeskeys(time, block)

                if(self.preparedUsers(time).length > 1){
                    ls.set(k, convert.aeskeys.inp(keys))
                }
                    
                
            }

            return keys

        },
        aeskeys : function(time, block){

            if(!time) time = 0
            if(!block) block = pcrypto.currentblock.height

            return eaa.aeskeys(time, block)

            var timep = period(time)
            var k = timep + '-' + block

            if(cache[k]){
                return cache[k]
            }

            cache[k] = eaa.aeskeys(time, block)

            return cache[k]
        }
    }

    var eaa = {

        cuhash : function(users, num, block){

            return pbkdf2.pbkdf2Sync(SHA2.sha224(_.map(users, function(u){
                return u.keys[num]
            }).join('') + (block || pcrypto.currentblock.height)).toString('hex'), salt, 1, 32, 'sha256') 

        },

        userspublics : function(time, block){

            var users = self.preparedUsers(time)

            var sum = {}

            _.each(users, function(user){

                if (user.id == pcrypto.user.userinfo.id && users.length > 1){ return }

                var publics = _.map(user.keys, function(key){
                    return Buffer.from(key, 'hex')
                })

                sum[user.id] = eaa.points(time, block, publics)
            })

            return sum
        },

        current : function(time, block){

            var privates = _.map(pcrypto.user.private, function(key){
                return key.private
            })

            var buf = Buffer.allocUnsafe(32)
            var sc = eaa.scalars(time, block, privates).toBuffer()

            sc.copy(buf, 32 - sc.length)

            return buf
        },

        scalars : function(time, block, scalars){

            var users = self.preparedUsers(time)
    
            var sum = null
    
            for(var i = 0; i < m; i++){
    
                var ch = new BN(this.cuhash(users, i, block))

                var a = new BN(scalars[i], 16);

                var mul = a.mul(ch).umod(n)
    
                if(!i){
                    sum = mul
                }
                else{
                    sum = sum.add(mul).umod(n)
                }
            }

            return sum

        },

        points : function(time, block, points){

            var users = self.preparedUsers(time)
    
            var sum = null

    
            for(var i = 0; i < m; i++){

    
                var ch = this.cuhash(users, i, block) 
                
                var mul = bitcoin.ecc.pointMultiply(points[i], ch, undefined, true)
    
                if(!i){
                    sum = mul
                }
                else{
                    sum = bitcoin.ecc.pointAdd(sum, mul, undefined, true)
                }
            }

            return sum

        },

        aeskeys : function(time, block){

            var us = eaa.userspublics(time, block);
            var c = eaa.current(time, block)

            var su = {}

            _.each(us, function(s, id){

                if (id != pcrypto.user.userinfo.id){
                    su[id] = bitcoin.ecc.pointMultiply(s, c, undefined, true)
                    su[id] = pbkdf2.pbkdf2Sync(su[id].toString('hex'), salt, 64, 32, 'sha512')
                }

                
            })

            return su
        }
    }

    self.decrypt = async function(userid, {encrypted, nonce}, time, block){
        var keys = eaac.aeskeysls(time, block)

        if (keys[userid]){
            return await decrypt(keys[userid], {encrypted, nonce})
        }

        throw new Error('emptykey')

    }

    self.encrypt = async function(userid, text){
        var keys = eaac.aeskeysls()

        if (keys[userid]){
            return await encrypt(text, keys[userid])
        }

        throw new Error('emptykey')
    }   

    self.decryptEvent = async function(event){

        if(!pcrypto.user.userinfo){
            throw new Error('userinfo')
        }

        var stored = lse.get(event.event_id)

        if (stored){
            return stored
        }
        
        var sender = f.getmatrixid(event.sender)
        var me = pcrypto.user.userinfo.id

        var keyindex = null,
            bodyindex = null;

        var body = JSON.parse(f.Base64.decode(event.content.body))
        var time = event.origin_server_ts
        var block = event.content.block

        if (sender == me){

            _.find(body, function(s, i){

                if (i != me){

                    keyindex = i
                    bodyindex = i

                    return true
                }
                
            })
        }
        else{
            bodyindex = me
            keyindex = sender
        }

        if(!body[bodyindex]) throw new Error('emptyforme')


        var decrypted = await self.decrypt(keyindex, body[bodyindex], time, block)

        /*lse.set(event.event_id, {
            body : decrypted,
            msgtype: 'm.text'
        })*/

        return {
            body : decrypted,
            msgtype: 'm.text'
        }

    }

    self.encryptFile = async function(file, p){
        var secret = pcryptoFile.randomkey()

        var secrets = await self.encryptKey(secret)

        var result = {
            file : null,
            secrets : secrets
        }

        return pcryptoFile.encryptFile(file, secret, p).then(file => {
            result.file = file

            return Promise.resolve(result)
        })
    }

    self.decryptFile = async function(file, secret, p){

        return pcryptoFile.decryptFile(file, secret, p).then(file => {
            return Promise.resolve(file)
        })
    }

    self.encryptKey = async function(key){
        var users = self.preparedUsers()

        var encrypted = {
            block : pcrypto.currentblock.height,
            keys : {}
        }

        for(var i = 0; i < users.length ; i++){
            var user = users[i]

            if(user.id != pcrypto.user.userinfo.id || users.length <= 1){
                encrypted.keys[user.id] = await self.encrypt(user.id, key)
            }
        }

   
        encrypted.keys = f.Base64.encode(JSON.stringify(encrypted.keys))
        
        return encrypted
    }

    self.decryptKey = async function(event){

        if(!pcrypto.user.userinfo){
            throw new Error('userinfo')
        }

        var secrets = f.deep(event, 'content.info.secrets.keys') || f.deep(event, 'content.pbody.secrets.keys')
        var block = f.deep(event, 'content.info.secrets.block') || f.deep(event, 'content.pbody.secrets.block')
        

        if(!secrets) throw new Error('secrets')
        if(!block) throw new Error('block')
        
        var sender = f.getmatrixid(event.sender)
        var me = pcrypto.user.userinfo.id

        var keyindex = null,
            bodyindex = null;

        var body = JSON.parse(f.Base64.decode(secrets))
        var time = event.origin_server_ts
        
        if (sender == me){

            _.find(body, function(s, i){

                if (i != me){

                    keyindex = i
                    bodyindex = i

                    return true
                }
                
            })
        }
        else{
            bodyindex = me
            keyindex = sender
        }

        if(!body[bodyindex]) throw new Error('emptyforme')

        var decryptedKey = await self.decrypt(keyindex, body[bodyindex], time, block)

        return decryptedKey

    }

    self.encryptEvent = async function(text){

        var users = self.preparedUsers()

        var encryptedEvent = {
            block : pcrypto.currentblock.height,
            msgtype: 'm.encrypted',
            body : {}
        }

        //console.log(users, encryptedEvent, text)

        for(var i = 0; i < users.length ; i++){
            var user = users[i]

            if(user.id != pcrypto.user.userinfo.id || users.length <= 1){
                encryptedEvent.body[user.id] = await self.encrypt(user.id, text)
            }
        }

   
        encryptedEvent.body = f.Base64.encode(JSON.stringify(encryptedEvent.body))
        
        return encryptedEvent
    }

    var decrypt = async function(keyData, {encrypted, nonce}){

        var key = await miscreant.SIV.importKey(keyData, "AES-SIV");

        var _encrypted = new Uint8Array(f._base64ToArrayBuffer(encrypted))
        var _nonce = new Uint8Array(f._base64ToArrayBuffer(nonce))

        var k = await key.open(_encrypted, _nonce)

        var decrypted = await new TextDecoder().decode(k)

        return decrypted
    }

    var encrypt = async function(text, keyData){

        let key = await miscreant.SIV.importKey(keyData, "AES-SIV");

        let plaintext = new Uint8Array(new TextEncoder().encode(text));
        let nonce = new Uint8Array(32);

        window.crypto.getRandomValues(nonce);

        let ciphertext = await key.seal(plaintext, nonce);

        let encrypted  = {
            encrypted: f._arrayBufferToBase64(ciphertext.buffer),
            nonce: f._arrayBufferToBase64(nonce.buffer),
        }


        return encrypted
    }
    

    return self
}

var PcryptoFile = function(){
    var self = this;
    var iv = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

   

    var readFile = function(file) {

        let reader = new FileReader();

        if(window.cordova) reader = reader._realReader

        reader.readAsArrayBuffer(file);

        return new Promise((resolve, reject) => {
            
            reader.onloadend = function(evt) {
                resolve(reader.result);
            };
            
            reader.onerror = function() {
                reject(reader.error);
            };
        })
    }

    var convertFile = function(blob, file){
		return new (window.wFile || window.File)([blob], "encrypted", { type: "encrypted/" + file.type, name : file.name })
	}

    var convertDecryptedFile = function(blob, file){
		return new (window.wFile || window.File)([blob], "decrypted", { 
            type: (file.type || "").replace('encrypted/', ''), name : 'Unnamed'
        })
	}

    self.randomkey = function(){
        return cryptoRandomString({length: 24});
    }

    self.key = function(str){

        let enc = new TextEncoder();

        function getKeyMaterial() {
            

            return window.crypto.subtle.importKey(
              "raw",
              enc.encode(str),
              "PBKDF2",
              false,
              ["deriveBits", "deriveKey"]
            );
        }

        return getKeyMaterial().then(key => {
            return window.crypto.subtle.deriveKey(

                {
                    "name": "PBKDF2",
                    salt: enc.encode('matrix.pocketnet'),
                    "iterations": 10000,
                    "hash": "SHA-256"
                },
    
                key,
    
                { "name": "AES-CBC", "length": 256},
    
                true,
    
                [ "encrypt", "decrypt" ]
    
            );
        })

        
    }

    self.encryptFile = function(file, secret, p){
        return readFile(file).then(r => {

            return self.encrypt(r, secret, p)
        }).then(encrypted => {

            return Promise.resolve(convertFile(encrypted, file))
        })
    }

    self.decryptFile = function(file, secret, p){
        return readFile(file).then(r => {
            

            return self.decrypt(r, secret, p)
        }).then(decrypted => {

            return Promise.resolve(convertDecryptedFile(decrypted, file))
        })
    }

    self.encrypt = function(strBytes, secret, p){

        if(!strBytes || !secret) return Promise.reject('data')

        if (!p) p = {};

        p.charsetEnc = (p.charsetEnc || 'utf8')
        p.charsetDec = (p.charsetDec || 'hex')

        //var strBytes = aesjs.utils[p.charsetEnc].toBytes(str);

        return self.key(secret).then(key => {

            return crypto.subtle.encrypt({
                name: "AES-CBC",
                iv: new Uint8Array(iv)
            }, key, strBytes)
                
        }).then(function (encrypted) {

            return encrypted

        })
    };

    self.decrypt = function (encryptedBytes, secret, p) {

        if(!encryptedBytes || !secret) return Promise.reject('data')

        if (!p) p = {};

        p.charsetEnc = (p.charsetEnc || 'utf8')
        p.charsetDec = (p.charsetDec || 'hex')


        return self.key(secret).then(key => {

            if(!crypto.subtle) return Promise.reject('crypto.subtle')

            return crypto.subtle.decrypt({
                name: "AES-CBC",
                iv: new Uint8Array(iv)
            }, key, encryptedBytes)
                

        }).then(function (decrypted) {
            return decrypted
        }).catch(e => {
            return Promise.reject(e)
        })

    }

    return self
}

var Pcrypto = function(core, p){

    var self = this

    self.core = core

    self.clearStorage = function(){
        self.core.mtrx.clearstorage('pcrypto')
    }

    self.currentblock = {
        height : 1
    };

    self.blocks = {}

    self.user = null
    self.rooms = {}

    self.init = function(user){
        self.user = user
    }

    self.destroy = function(){
        _.each(self.rooms, function(r){
            r.clear()
        })

        self.rooms = {}
        /*self.user = null*/
    }

    self.addroom = function(chat){

        if (self.rooms[chat.roomId]){
            return self.rooms[chat.roomId].prepare()
        }

        var room = new PcryptoRoom(self, chat)

        self.rooms[chat.roomId] = room

        return room.prepare()
    }


    self.set = {
        block : function(block){

            if (block && block.height > self.currentblock.height){
                self.currentblock = block
            }
                
            if (block.height){
                self.blocks[block.height] = block
            }
                
        }
    }

    self.helpers = {
        checkuser : function(){
            if(core.user && core.user.private && core.user.userinfo && core.user.userinfo.keys && core.user.userinfo.keys.length){

                var pk = core.user.userinfo.keys.join(',')

                var pk2 = _.map(core.user.private, function(p){
                    return p.public
                }).join(',')

                return pk == pk2

            }

            return false
        },

        /*alternativeKeys : function(){
            if(core.user && core.user.private){

                var pk2 = _.map(core.user.private, function(p){
                    return p.public
                })

                return pk2

            }

            return []
        }*/

    }


    return self
}


export default Pcrypto