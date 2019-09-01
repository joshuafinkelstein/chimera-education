<template>
  <div class="dashboard">
    <!-- header -->
    <div class="ui inverted menu">
      <div class="ui container">
        <a id="toggle-back" class="disabled item"><i class="large arrow alternate circle left icon"></i></a>
        <a href="https://chimeraeditor.com" class="header item">
          <img class="logo" src="../assets/logo.png">
        </a>
        <a id="toggle-search" class="item"><i class="search icon"></i></a>
        <div id="search-bar" class="ui item fluid category search">
          <div class="ui icon input">
            <input class="prompt" type="text" placeholder="YouTube Video URL...">
            <i class="search icon"></i>
          </div>
        </div>
        <div id="toggle-account" class="ui right simple dropdown item">
          <i class="user outline icon"></i> {{ displayFirstName(userProfile.displayName) }}
          <div class="menu">
            <a @click="logout" class="item">Logout</a>
            <a class="item" href="https://chimeraeditor.com/privacy/Privacy%20Notice.pdf">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
    <!-- main content of dashboard view -->
    <div id="directory">
      <div class="ui segment">
        <h3 class="ui header">Private Files</h3>
        <div v-if="hasValue(privateDirectory)" class="ui items">
          <div class="item file" v-if="hasValue(file.title)" v-for="file in privateDirectory.notes" v-on:click="openFile(file.videoId)">
            <div class="ui mini image">
              <img v-bind:src="file.channelPhoto">
            </div>
            <div class="content">
              <div class="header">{{ file.title }}</div>
              <div class="meta">
                <span class="channel">{{ file.channel }}</span>
              </div>
              <div class="description">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <h5 class="ui header" v-else>
          You haven't saved any files yet.
        </h5>
      </div>
      <div class="ui divider"></div>
      <div class="ui segment">
        <h3 class="ui header">Public Files</h3>
        <div class="ui items">
          <div class="item file" v-if="hasValue(file.title)" v-for="file in publicDirectory.notes" v-on:click="openFile(file.videoId)">
            <div class="ui mini image">
              <img v-bind:src="file.channelPhoto">
            </div>
            <div class="content">
              <div class="header">{{ file.title }}</div>
              <div class="meta">
                <span class="channel">{{ file.channel }}</span>
              </div>
              <div class="description">
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const fb = require('../firebaseConfig.js');
  import {store} from '../store'

  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  export default {
    name: 'dashboard',
    computed: {
      userProfile() {
        return store.state.userProfile
      },
      privateDirectory() {
        return store.state.privateDirectory
      },
      publicDirectory() {
        return store.state.publicDirectory
      }
    },
    methods: {
      logout() {
        fb.auth.signOut().then(() => {
          this.$router.replace('login')
        })
      },
      hasValue(val) {
        if(val == false || val == '' || val == null) {
          return false;
        } else {
          return true;
        }
      },
      openFile(id) {
        window.location.href = "https://chimeraeditor.com/app/editor?v=" + id;
      },
      displayFirstName(displayName) {
        if(displayName == null) {
          return 'Account';
        }
        return displayName.split(" ")[0];
      }
    }
  }

  // check if URL
  function is_url(str) {
    regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  //get properties from url
  function gup( name, url ) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
  }

  $(document).ready(function() {

      // toggle search bar
      $('#toggle-search').on('click', function() {
        $('#toggle-search').hide();
        width = $(window).width();
        if (width < 900) {
          $('#toggle-back').hide();
          $('#toggle-account').hide();
        }
        $('#search-bar').show();
      })
      // // close
      // $('#search-bar').find('input').keypress(function (e) {
      //   if (e.which == 13) {
      //     // go to new video
      //     var id = $('#search-bar').find('input').val();
      //     $('#search-bar').find('input').val('');
      //     // get if from url
      //     if(is_url(id)) {
      //       id = gup('v',id);
      //     }
      //
      //     if(id != null && id != '') {
      //       window.location.href = "https://chimeraeditor.com/app/editor?v=" + id;
      //     }
      //     // revert header buttons
      //     $('#search-bar').hide();
      //     $('#toggle-search').show();
      //     $('#toggle-directory').show();
      //     $('#toggle-account').show();
      //   }
      // });
    });
</script>

<style scoped>
  #directory {
    flex: auto;
    text-align: center;
  }

  .ui.segment {
    background-color: inherit;
    box-shadow: none;
    border: none;
  }

  .ui.header {
    width: 100%;
    height: 20px;
    margin: 30px 0;
    color: white;
    font-family: 'Montserrat', 'Lato';
    font-weight: normal;
  }

  #directory .file {
    background-color: white;
    color: black;
    font-size: 11px;
    text-align: left;
    padding: 14px;
    max-width: 700px;
    min-width: 50%;
    margin: 5px auto;
    box-shadow: 0 0 10px black;
    font-family: 'Montserrat', sans-serif;
  }

  #directory .file:hover {
    background-color: #f4decb;
    cursor: pointer;
  }

  .file .filetitle {
    display: flex;
    font-size: 14px;
    font-weight: bold;
  }

  .filetitle svg {
    min-width: 23px !important;
    position: relative;
    bottom: 4px;
    margin: 0 5px;
  }

  .file .filechannel, .fileauthor {
    padding-left: 32px;
  }

  .ui.inverted.menu {
    font-family: 'Montserrat', sans-serif;
    background-color: #584b4f;
    margin-bottom: 0 !important;
  }

  .ui.modal {
    width: 300px;
    height: auto;
    position: relative;
  }

  .ui.inverted.segment {
    background-color: #584b4f;
    font-family: 'Montserrat', sans-serif;
  }

  #search-bar {
    display: none;
  }

  #search-bar .ui.icon.input {
    padding: 3px;
  }

  @media only screen and (max-width: 767px) {
    .ui.items:not(.unstackable)>.item>.image, .ui.items:not(.unstackable)>.item>.image>img {
      max-height: 50px !important;
    }
  }
</style>
