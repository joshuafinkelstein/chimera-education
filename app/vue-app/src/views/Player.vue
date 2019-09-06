<template>
  <div class="player">
    <!-- header -->
    <div class="ui inverted menu">
      <div class="ui container">
        <a @click="toggleDashboard" id="toggle-back" class="item"><i class="large arrow alternate circle left icon"></i></a>
        <a href="https://chimeraeditor.com" class="header item">
          <img class="logo" src="../assets/logo.png">
        </a>
        <a @click="showSearch" id="toggle-search" class="item"><i class="search icon"></i></a>
        <div id="search-bar" class="ui item fluid category search">
          <div class="ui icon input">
            <input @keyup.enter="closeSearch" v-model="searchQuery" class="prompt" type="text" placeholder="YouTube Video URL...">
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
    <!-- video notes main content -->
    <div id="main">

      <div id="note-section">
        <div id="note-editor-header">
          <div id="filename">
            {{ currentVideo.metadata.title }}
          </div>
        </div>


        <div id="whole-paper">
          <div id="paper-text">

            <div id="list-notes">
              <div class="note tab-container" @click="timeJump(note)" v-for="note in sortedNotes" :data-type="note.persist.type" :data-index="note.persist.id">
                <!-- each note type is encapsulated and must be listed here to show up -->
                <div class="time" v-if="note.persist.type === 'blank'"></div>
                <div class="time" v-else>{{ getPrettyPrintTime(note.persist.timepoint) }}</div>

                <TextNote class="contents" v-if="note.persist.type === 'text'"
                  :note="note">
                </TextNote>

                <WikipediaNote class="contents" v-else-if="note.persist.type === 'Wikipedia'"
                  :note="note">
                </WikipediaNote>

                <LinkNote class="contents" v-else-if="note.persist.type === 'link'"
                  :note="note">
                </LinkNote>

                <YoutubeNote class="contents" v-else-if="note.persist.type === 'video'"
                  :note="note">
                </YoutubeNote>

                <ChimeraNote class="contents" v-else-if="note.persist.type === 'annotations'"
                  :note="note">
                </ChimeraNote>

                <div v-if="!note.editing" class="modify-note">
                  <i class="ellipsis horizontal icon toggle-additional-options" @click="toggleNoteEditOptions(note.persist.id)"></i>
                  <i class="edit icon edit-note" @click="toggleEditMode(note.persist.id)"></i>
                  <i class="trash icon delete-note" @click="deleteNote(note.persist.id)"></i>
                </div>

              </div>
            </div>

            <!-- take up remaining space -->
            <div id="blank-paper"></div>

          </div>
        </div>

        <div id="note-input-container">
          <input type="text" v-model="newNoteValue" @keyup.enter="submitNote" id="note-input" :placeholder="'Add note at ' + prettyPrintTime">
        </div>

      </div>


      <div id="videoSection">
        <div class="videoWrapper">
          <youtube :video-id="videoId" :player-vars="playerVars" ref="youtube" @ready="playerReady" @playing="playing"></youtube>
        </div>
        <div id="video-description">
          <div id="video-info">
            <img v-if="hasValue(currentVideo.metadata.channelPhoto)" :src="currentVideo.metadata.channelPhoto">
            <img v-else src="../assets/logo.png">
            <div id="video-title">
              <h4 class="ui header"><input @keyup.enter="syncMetadataChanges" type="text" class="low-impact" v-model="localMetadata.title"></h4>
              <h5 class="ui header"><input @keyup.enter="syncMetadataChanges" type="text" class="low-impact" v-model="localMetadata.channel" placeholder="Add an author/channel..."></h5>
            </div>
          </div>
          <div class="ui form">
            <div class="field">
              <textarea id="video-info-textarea" @keyup.enter="syncMetadataChanges" v-model="localMetadata.description" placeholder="Add a description..."></textarea>
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

  // check if URL
  function is_url(str) {
    const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
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

  // import component for each type of note
  import TextNote from '@/components/TextNote.vue'
  import WikipediaNote from '@/components/WikipediaNote.vue'
  import LinkNote from '@/components/LinkNote.vue'
  import YoutubeNote from '@/components/YoutubeNote.vue'
  import ChimeraNote from '@/components/ChimeraNote.vue'

  export default {
    name: 'player',
    components: {
      TextNote,
      WikipediaNote,
      LinkNote,
      YoutubeNote,
      ChimeraNote
    },
    data() {
      return {
        privacy: this.$route.query.privacy,
        searchQuery: '',
        videoId: this.$route.query.v,
        timestart: this.$route.query.t,
        localMetadata: {
          title: '...loading title',
          channel: '...loading channel',
          description: '..loading description'
        },
        collectElapsedTime: null,
        elapsedTime: 0,
        prettyPrintTime: '00:00',
        newNoteValue: '',
        timestartNewNote: null,
        disableTimeJump: false,
        playerVars: {
          autoplay: 0,
          rel: 0,
          showinfo: 1,
          egm: 0,
          showsearch: 0,
          controls: 1,
          modestbranding: 1,
          enablejsapi: 1
        }
      }
    },
    computed: {
      // get data from store
      userProfile() {
        return store.state.userProfile
      },
      privateDirectory() {
        return store.state.privateDirectory
      },
      publicDirectory() {
        return store.state.publicDirectory
      },
      // save history and current index in history
      history() {
        return store.state.history
      },
      index() {
        return store.state.index
      },
      player() {
        return this.$refs.youtube.player
      },
      currentVideo() {
        // each video can have associated notes and metadata
        var output = {
          notes: {},
          metadata: {}
        }

        var temp;
        // before anything, make sure the data is available
        // issue on linking directly to a video
        if(typeof this.privateDirectory.notes != 'undefined' && typeof this.publicDirectory.notes != 'undefined') {
          // console.log('here');
          if(this.privacy == 'public') {
            for(const key in this.publicDirectory.notes) {
              temp = this.publicDirectory.notes[key];
              if(key == this.videoId) {
                output.notes = temp;
              } else if(key.length > 11 && key.substring(key.length-11, key.length) == this.videoId) {
                output.metadata = temp;
              }
            }
          } else {
            // console.log(this.privateDirectory.notes);
            for(const key in this.privateDirectory.notes) {
              temp = this.privateDirectory.notes[key];
              // console.log(key);
              if(key == this.videoId) {
                output.notes = temp;
              } else if(key.length > 11 && key.substring(key.length-11, key.length) == this.videoId) {
                output.metadata = temp;
                // console.log('this one');
              }
            }
          }

          for(const key in output.notes) {
            if(output.notes[key] != null) {
              output.notes[key].persist.id = key;
              if(typeof output.notes[key].editing == 'undefined') {
                output.notes[key].editing = false;
              }
            }
          }

          if(typeof output.metadata.title == 'undefined') {
            output.metadata = {
              title: 'Untitled Video',
              author: '',
              channel: '',
              channelPhoto: '',
              default: false,
              description: '',
              lastOpened: Date.now(),
              videoId: this.videoId
            }
          }

          // update last opened timestamp
          output.metadata.lastOpened = Date.now();

          this.localMetadata = output.metadata;
        }

        return output;
      },
      // arrange notes by timestamp
      sortedNotes: function() {
        var sortedKeys;
        var notes = {};
        for(var i in this.currentVideo.notes) {
          if(typeof this.currentVideo.notes[i] != 'undefined') {
            notes[i] = this.currentVideo.notes[i];

          }
        }
        var output = {};
        if(Object.keys(notes).length > 1) {
          var sortedKeys = Object.keys(notes).sort(function(a, b) {
            try {
              return notes[a].persist.timepoint - notes[b].persist.timepoint;
            } catch(err) {
              console.log(err);
            }
          })

          var i = 0;
          for(var key = 0; key < Object.keys(sortedKeys).length; key++) {
            output[i] = notes[sortedKeys[key]];
            i++;
          }
          return output;
        } else {
          return notes;
        }
      }
    },
    created() {
      // console.log(fb.auth.currentUser);
    },
    beforeDestroy() {
      // update directory
      // this.$store.dispatch('fetchPublicDirectory');
      // this.$store.dispatch('fetchPrivateDirectory');
      clearInterval(this.collectElapsedTime);
    },
    watch: {
      currentVideo: {
        handler: function() {
          // before anything, make sure the data is available
          // issue on linking directly to a video
          if(typeof this.privateDirectory.notes != 'undefined' && typeof this.publicDirectory.notes != 'undefined') {
            if(this.privacy == 'private') {
              fb.db.ref('users/'+fb.auth.currentUser.uid+'/notes/videometa'+this.videoId).set(this.currentVideo.metadata);
              fb.db.ref('users/'+fb.auth.currentUser.uid+'/notes/'+this.videoId).set(this.currentVideo.notes);
            }
          }
        },
        deep: true,
        immediate: true
      },
      newNoteValue() {
        if(this.newNoteValue == '' && this.timestartNewNote != null) {
          this.timestartNewNote = null;
        } else if(this.timestartNewNote == null) {
          this.timestartNewNote = this.elapsedTime;
        }
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
      displayFirstName(displayName) {
        if(displayName == null) {
          return 'Account';
        }
        return displayName.split(" ")[0];
      },
      showSearch() {
        document.getElementById('toggle-search').style.display = 'none';
        var width = window.innerWidth;
        if (width < 900) {
          document.getElementById('toggle-back').style.display = 'none';
          document.getElementById('toggle-account').style.display = 'none';
        }
        document.getElementById('search-bar').style.display = 'flex';
      },
      closeSearch() {
        // go to new video
        var id = this.searchQuery;
        this.searchQuery = '';
        if(is_url(id)) { // accept url as input
          id = gup('v',id);
        }
        if(id != null && id != '' && id.length == 11) { // meets loose specifications for video id
          // update history
          this.history.push(id);
          store.state.history = this.history;
          if(store.state.index != null) {
            store.state.index++;
          } else {
            store.state.index = 0
          }
          // open player
          this.$router.replace({path: 'player', query: {v: id, privacy: 'private'}});
          this.$router.go();
        }
        // revert header buttons
        document.getElementById('search-bar').style.display = 'none';
        document.getElementById('toggle-back').style.display = 'flex';
        document.getElementById('toggle-account').style.display = 'flex';
        document.getElementById('toggle-search').style.display = 'flex';
      },
      toggleDashboard() {
        this.$router.replace('dashboard');
      },

      // iframe player
      playerReady(event) {
        Object.assign(document.getElementsByTagName('iframe')[0].style, {
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%'
        });

        if(typeof this.timestart != 'undefined') {
          this.timeJump(this.timestart);
        }
      },
      async playing() {
        this.collectElapsedTime = setInterval(() => {
          this.player.getCurrentTime().then((time) => {
            this.updateTime(time);
          });
        }, 1000);
      },
      updateTime(seconds) {
        this.elapsedTime = Math.floor(seconds);
        this.prettyPrintTime = this.getPrettyPrintTime(seconds);
      },
      getPrettyPrintTime(seconds) {
        seconds = Math.floor(seconds);
        var sec = seconds%60;
        var min = Math.floor(seconds/60);
        var hr = Math.floor(seconds/3600);
        // 60 min or greater?
        var ppt = '';
        if(hr > 0) {
          ppt += String(hr) + ':';
        }

        if(min < 10) {
          ppt += '0' + String(min) + ':';
        } else {
          ppt += String(min) + ':';
        }
        if(sec < 10) {
          ppt += '0' + String(sec);
        } else {
          ppt += String(sec);
        }
        return ppt;
      },
      timeJump(note) {
        var seconds = note.persist.timepoint;
        if(!note.editing) {
          if(!this.disableTimeJump) {
            this.player.seekTo(seconds);
          } else {
            this.disableTimeJump = false;
          }
        }
      },
      syncMetadataChanges() {
        this.currentVideo.metadata = this.localMetadata;
      },
      submitNote() {
        var val = this.newNoteValue;
        this.newNoteValue = '';
        var note = {};
        note.persist = {};
        note.persist.timepoint = this.timestartNewNote;
        note.persist.header = '';
        note.persist.description = '';
        note.persist.image = '';

        //check for special cases
        //wikipedia
        if(val.substring(0,30) == 'https://en.wikipedia.org/wiki/') {
          note.persist.type = 'Wikipedia';
          note.persist.url = val;
          note.persist.linktitle = 'Wikipedia Page';
          note.persist.extract = 'pulling info from Wikipedia';
        }
        //Chimera
        else if (val.substring(0,25) == 'https://chimeraeditor.com') {
          note.persist.type = 'annotations';
          note.persist.url = val;
          note.persist.linktitle = 'Annotated Video';
          note.persist.header = note.persist.url;
          note.persist.image = '..logos/star.png';
        }
        //YouTube video
        else if (val.substring(0,24) == 'https://www.youtube.com/') {
          note.persist.type = 'video';
          note.persist.url = val;
          note.persist.header = note.persist.url;
          note.persist.linktitle = 'YouTube Video';
          note.persist.image = 'images/youtube.png';
        }
        //generic link
        else if (val.substring(0,8) == 'https://') {
          note.persist.type = 'link';
          note.persist.url = val;
          note.persist.header = note.persist.url;
          note.persist.linktitle = 'Web Link';
        }
        // text note
        else {
          // markdown support for header/description
          if(val.substring(0,1) == '#'){
            note.persist.header = val.substring(1,val.length);
            note.persist.description = '';
            // check if there is a description as well
            var i = 0;
            for(var char in val.substring(1,val.length)){
              i++;
              if(val.charAt(parseInt(char)+1) == '#'){ //start description
                note.persist.header = val.substring(1,i);
                note.persist.description = val.substring(i+1,val.length);
              }
            }
          } else {
            note.persist.description = val;
          }
          // default to text note
          note.persist.type = 'text';
        }

        // append to notes locally
        var maxkey = 0;
        for(const key in this.currentVideo.notes) {
          if(parseInt(key) > maxkey) {
            maxkey = parseInt(key);
          }
        }
        if(typeof this.currentVideo.notes.length != 'undefined') {
          maxkey += 1;
        }
        note.persist.id = maxkey; // unique identifier for each note
        if(this.privacy == 'private') {
          this.$set(this.currentVideo.notes, maxkey, note);
          // sync local notes with database
          if(fb.auth.currentUser != null) {
            fb.db.ref('users/'+fb.auth.currentUser.uid+'/notes/'+this.videoId).set(this.currentVideo.notes);
            this.$store.dispatch('fetchPrivateDirectory');
          }
        } else {
          console.log('You can only make changes to your private data.');
          fb.db.ref('users/'+fb.auth.currentUser.uid+'/notes/'+this.videoId).set(this.currentVideo.notes);
          fb.db.ref('users/'+fb.auth.currentUser.uid+'/notes/videometa'+this.videoId).set(this.currentVideo.metadata);
          this.$store.dispatch('fetchPrivateDirectory');
          this.$router.replace({path: 'player', query: {v: this.videoId, privacy: 'private', t: this.elapsedTime}});
        }

        // reset timepoint for new notes
        this.timestartNewNote = null;
      },
      toggleNoteEditOptions(noteId) {
        this.disableTimeJump = true;
        var el = document.querySelectorAll("[data-index='"+String(noteId)+"']")[0].getElementsByClassName('modify-note')[0];
        el.getElementsByClassName('toggle-additional-options')[0].style.display = 'none';
        el.getElementsByClassName('edit-note')[0].style.display = 'inline-flex';
        el.getElementsByClassName('delete-note')[0].style.display = 'inline-flex';
        // hide options after 2 seconds
        var end = false;
        var toggleOptions = setInterval(() => {
          if(end) {
            el.getElementsByClassName('toggle-additional-options')[0].style.display = 'inline-flex';
            el.getElementsByClassName('edit-note')[0].style.display = 'none';
            el.getElementsByClassName('delete-note')[0].style.display = 'none';
            clearInterval(toggleOptions);
          }
          end = true;
        }, 2000)
      },
      toggleEditMode(noteId) {
        this.disableTimeJump = true;
        this.currentVideo.notes[noteId].editing = !this.currentVideo.notes[noteId].editing;
      },
      deleteNote(noteId) {
        this.disableTimeJump = true;
        if(this.privacy == 'private') {
          this.$delete(this.currentVideo.notes, noteId);
          fb.db.ref('users/'+fb.auth.currentUser.uid+'/notes/'+this.videoId+'/'+noteId+'/').set(null);
        }
      }
    }
  }
</script>

<style scoped>
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


  #main {
    display: flex;
    flex-wrap: wrap-reverse;
    min-height: calc(100vh - 52px);
    background-color: #343233;
  }

  #note-section {
    position: sticky;
    top: 0;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-flow: column;
    flex: auto;
    width: 30%;
    min-width: 310px;
    /* max-width: 790px; */
    align-self: end;
    height: calc(100vh - 37px);
    min-height: 320px;
    background-position: center;
    color: black;
    padding: 10px;
    /* resize: horizontal; */
    overflow: hidden;
  }

  #videoSection {
    display: flex;
    flex-direction: column;
    width: 65%;
    height: auto;
    flex: auto;
    padding-bottom: 0px;
    /* resize: horizontal; */
    overflow: hidden;
  }

  #video-description {
    background-color: #efeae1;
    opacity: 0.3;
    color: black;
    flex: auto;
    font-family: 'Noto Sans', sans-serif;
    font-size: 12px;
    padding: 10px;
  }

  #video-description:hover {
    opacity: 0.9;
  }

  #video-info {
    display: flex;
    font-weight: normal !important;
    font-family: 'Montserrat', 'Lato';
    text-align: left;
    width: 100%;
  }

  #video-info img {
    height: 60px;
    width: 60px;
    object-fit: cover;
    border-radius: 50%;
  }

  #video-title {
    padding: 15px 10px 10px 10px;
    width: 100%;
  }

  #video-title h4, h5 {
    margin: 0 !important;
  }

  #video-title h5 {
    color: grey;
  }

  #video-info-textarea {
    background-color: inherit;
    border: none;
  }

  .videoWrapper {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 7px;
    padding-left: 13px;
    margin-bottom: 0px;
    height: 0px;
  }

  /* ------------------ basic structure ---------------------- */
 #note-editor-header {
   background-color: #584b4f;
   height: 50px;
   overflow-y: hidden;
   color: #efeae1;
   text-align: center;
   padding: 8px 0 5px 0;
   font-size: 14px;
 }

 .toolbar {
   margin: 10px 5px 5px 5px;
   float: right;
   padding-right: 20px;
 }

 .toolbar .svgWrapper {
   margin-right: 5px;
   border: 1px solid #584b4f;
 }

 .toolbar .svgWrapper:hover {
   cursor: pointer;
   background-color: #423539;
 }

 #whole-paper {
   /* margin: 0 5px 0 5px; */
   max-height: calc(100% - 110px);
   display: flex;
   flex: auto;
   flex-flow: column;
   color: black;
   overflow-y: scroll;
   background-color: white;
 }

 #paper-text {
   padding: 5px 0 52px 0;
   background-color: white;
 }

 #blank-paper {
   background-color: white;
   flex: auto;
   min-height: 10px;
 }









 /* ---------------- notes ---------------------- */
 .note {
   padding: 3px;
   display: flex;
   position: relative;
   border: 1px solid white;
   /* border-bottom: 1px solid lightgrey; */
   font-size: 14px;
   min-height: 19.2px;
   /* max-height: 400px; */
   font-family: 'Noto Sans', sans-serif;
   font-size: 12px;
   word-break: break-word;
   margin: 4px;
   /* box-shadow: 0 0 1px #aaa; */
 }

 /* .note[data-type="text"] {
   font-size: 15px;
 } */

 .note[data-type="blank"] {
   border: 0;
   box-shadow: none;
 }

 .note[data-type="blank"]:hover {
   background-color: inherit;
   cursor: auto;
 }

 .note:hover {
   background-color: #f4decb;
   border: 1px solid darkgrey;
   box-shadow: 0 0 2px darkgrey;
   cursor: pointer;
 }

 .note .time {
   color: white;
   min-width: 38px;
   margin-right: 5px;
   margin-left: 5px;
   font-size: 11px;
   font-family: 'Noto Sans', sans-serif;
 }

 .note:hover .time {
   color: #282828;
 }

 .note .contents {
   font-weight: inherit;
   font-style: inherit;
   text-decoration: inherit;
   font-size: inherit;
   color: inherit;
   position: relative;
   flex: auto;
   text-align: left;
 }




 /* -------------- note tabs ---------------- */
 .tab-container .tab-handle img {
   height: 70px;
   object-fit: cover;
   width: 70px;
   border-radius: 5px;
   float: left;
   margin-right: 20px;
 }

 .tab-container .tab-handle .playVideo {
   position: absolute;
   margin-right: 0 !important;
   height: 30px !important;
   width: auto;
   object-fit: initial;
   left: 20px;
   top: 18px;
   z-index: 2;
 }

 .tab-container .tab-handle .note-header {
   padding-top: 10px;
   padding-bottom: 5px;
   overflow: hidden;
   text-overflow: ellipsis;
 }

 .tab-container a {
   color: grey;
   text-decoration: none;
   /* border: 1px solid grey; */
   padding: 3px 6px 3px 0;
   margin-bottom: 6px;
 }

 .tab-container a:hover {
   color: black;
   text-decoration: none;
   /* border: 1px solid black; */
   padding: 3px 6px 3px 0;
 }

 .tab-container .tab-handle {
   padding-bottom: 10px;
   height: 100%;
 }

 .tab-container .contents .tab-moreinfo {
   top: calc( -100% + 72px);
   left: -51px;
   position: relative;
   z-index: 5;
   height: auto;
   max-height: 115px;
   margin: 5px 10px 11px 10px;
   overflow: hidden;
   width: calc(100% + 35px);
 }

 .tab-moreinfo .fadecorner {
   position: absolute;
   top: calc(100% - 30px);
   right: 0;
   z-index: 6;
   background-image: linear-gradient(to bottom right, rgba(244, 222, 203, 0), rgba(244,222,203, 1));
   height: 30px;
   width: 60px;
 }


 /* ----------- toggle options for each note ---------------- */
 .modify-note {
   height: 20px;
   background-color: inherit;
   position: absolute;
   right: 5px;
   top: 2px;
 }

 .modify-note .delete-note, .edit-note {
   display: none;
 }

 .modify-note svg:hover .modify {
   fill: black;
 }

 .modify-note svg {
   height: 20px;
 }

 #modify-options {
   display: none;
   position: absolute;
   padding: 20px;
   margin: 0 !important;
   left: calc(100% - 176px);
   overflow: hidden;
 }

 #modify-options button {
   height: 40px;
   width: 100px;
   border: 2px solid #EFEFEF;
   background-color: #EFEFEF;
   color: black;
 }








 /* ---------------- note style in editing mode ----------------- */
 .editing textarea {
   border: none !important;
   min-height: unset !important;
   font-size: 12px;
   font-family: 'Noto Sans', sans-serif;
   width: 95%;
 }

 .editing .isediting {
   font-size: 12px;
   color: grey;
   margin: 14px;
   float: right;
 }

 .editing button {
   float: right;
   margin: 10px 4.3%;
 }

 .editing .header {
   font-weight: bold;
   height: 25px !important;
   resize: none !important;
 }

 .editing .description {
   font-weight: normal;
   resize: vertical !important;
 }

 .editing .linktitle {
   font-weight: normal;
   height: 22px !important;
   font-size: 14px !important;
   resize: none !important;
 }







 /* ------------------- note input ------------------- */
 #note-input-container {
   background-color: #584b4f;
   width: 100%;
   height: 45px;
   /* margin: 0 5px; */
   padding: 5px;
 }

 #note-input {
   border: 0;
   padding: 5px;
   width: 100%;
   height: 35px;
   font-size: 12px;
   font-family: 'Noto Sans', sans-serif;
 }

 .low-impact {
   box-shadow: none;
   border: none;
   font-size: inherit;
   font-weight: inherit;
   background-color: inherit;
   width: 100%;
 }
</style>
