<template>
  <div id="chatInput">
    <div class="work" v-if="ready">

      <div class="inputWrapper" v-if="chat">

        <div class="center">

          <InputField
            ref="newinput"

            @transaction="sendtransaction"
            @chatMessage="sendinput"
            @setMetaUrl="emitUrl"
            @emptyInput="emitInputData"
            @FilledInput="HideUploadPic"
            @base64="pasteImage"
            @focused="focused"

            :storagekey="'chatinput' + chat.roomId"
          />

          <div class="left" v-if="upload && chat">
            <div class="iconbutton">
              <dropdownMenu
                ref="dropdownMenu"
                :menuItems="menuItems"
                :rowObject="{}"
                icon="fas fa-plus"
              >
                <template v-slot:default="slotProps">
                  <div class="menu-item" @click="menuItemClick(slotProps.item)" v-if="!slotProps.item.upload">

                    <div class="iconWrapper">
                      <i v-if="slotProps.item.icon" :class="slotProps.item.icon"></i>
                    </div>

                    <div class="title">
                      {{ slotProps.item.title }}
                    </div>
                    
                  </div>

                  <upload 

                    @start="(files) => uploadStart(slotProps.item, files)"
                    @uploaded="(data) => uploadUploaded(slotProps.item, data)"
                    @uploadedAll="(result) => uploadUploadedAll(slotProps.item, result)"
                    @error="(error) => uploadError(slotProps.item, error)"

                    :multiple="slotProps.item.upload.multiple"
                    :extensions="slotProps.item.upload.extensions"
                    :images="slotProps.item.upload.images"

                  v-else>

                    <template v-slot:content>
                      <div class="menu-item">
                        <div class="iconWrapper">
                          <i v-if="slotProps.item.icon" :class="slotProps.item.icon"></i>
                        </div>

                        <div class="title">
                          {{ slotProps.item.title }}
                        </div>

                      </div>
                    </template>

                    <template v-slot:dropzone></template>

                  </upload>

                </template>
              </dropdownMenu>
            </div>
          </div>

        </div>
       
      </div>
      
    </div>
    
    <div class="notready" v-else>
      <linepreloader />
    </div>

    <!--<modal @close="closeShowuserselect" v-if="showuserselect">
      <template v-slot:header>
        <span>{{showuserselect.caption}}</span>
      </template>
      <template v-slot:body>
        <contacts :users="showuserselect.users" :mode="`Select`" @close="closeShowuserselect" @select="contact => {showuserselected(contact)}"/>
      </template>
      <template v-slot:footer></template>
    </modal>
    -->
    
  
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>

<!-- THEMES BEGIN -->
<style scoped lang="sass" src="./themes/theme_white.sass"></style>
<style scoped lang="sass" src="./themes/theme_black.sass"></style>
<!-- THEMES END -->





















