<template>
  <div v-if="!note.editing" class="WikipediaNote" @mouseover="showExtract" @mouseleave="hideExtract">
    <div class="tab-handle">
      <img :src="retrieveImage()">
      <div class="note-header">
        <b>{{ retrieveHeader() }}</b>
        <br>
        <vue-mathjax v-if="hasValue(note.persist.description)" :formula="note.persist.description"></vue-mathjax>
        <br>
        <a :href="note.persist.url" target="_blank">{{note.persist.linktitle}}</a>
      </div>
      <div class="tab-moreinfo" v-if="showingExtract">
        {{ note.persist.extract }}
        <div class="fadecorner"></div>
      </div>
    </div>
  </div>

  <div v-else class="WikipediaNote" @mouseover="showExtract" @mouseleave="hideExtract" @keyup.shift.enter="submitEdit">
    <div class="tab-handle">
      <img :src="retrieveImage()">
      <div class="note-header">
        <b>
          <textarea id="edit-header" placeholder="Add a header..." @keydown="resize" @keyup="resize">{{ note.persist.header }}</textarea>
        </b>
        <br>
        <div>
          <textarea id="edit-description" placeholder="Add a description..." @keydown="resize" @keyup="resize">{{ note.persist.description }}</textarea>
        </div>
        <br>
        <a :href="note.persist.url" target="_blank">
          {{note.persist.linktitle}}
        </a>
      </div>
      <div class="editing-tip" @click="submitEdit">Press Shift+Enter<i class="large check circle icon"></i></div>
    </div>
  </div>
</template>

<script>
  import shared from '../assets/scripts/sharedmethods';

  export default {
    name: 'WikipediaNote',
    props: {
      note: Object
    },
    data() {
      return {
        showingExtract: false,
        delayOpenExtract: null,
        active: false
      }
    },
    methods: {
      hasValue(val) {
        return shared.hasValue(val);
      },
      resize(event) {
        return shared.resize(event);
      },
      showExtract() {
        // pull extract from Wikipedia
        if(this.note.persist.extract == 'pulling info from Wikipedia') {
          var url = new URL(this.note.persist.url);
          var articleName = url.pathname.split('/')[2].replace('_', '%20');
          //ajax request and run function on response
          const self = this;
          this.axios.get('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&format=json&origin=*&titles=' + articleName).then(function(response) {
            for (const key of Object.keys(response.data.query.pages)) {
              self.note.persist.extract = response.data.query.pages[key].extract;
              break;
            }
          });
        }
        // toggle show extract
        let once = false;
        this.active = true;
        this.delayOpenExtract = setInterval(() => {
          if(once && this.active) {
            this.showingExtract = true;
            clearInterval(this.delayOpenExtract);
          }
          once = true;
        }, 600)
      },
      hideExtract() {
        this.active = false;
        this.showingExtract = false;
        clearInterval(this.delayOpenExtract);
      },
      //article title from Wikipedia
      retrieveHeader() {
        if(!this.note.persist.header) {
          var url = new URL(this.note.persist.url);
          this.note.persist.header = url.pathname.split('/')[2].replace('_', ' ');
        }
        return this.note.persist.header;
      },
      //main image from wikipedia article
      retrieveImage() {
        if(!this.note.persist.image) {
          var url = new URL(this.note.persist.url);
          var articleName = url.pathname.split('/')[2].replace('_', '%20');
          const self = this;
          this.axios.get('https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=100&redirects=1&format=json&origin=*&titles=' + articleName).then(function(response) {
            for (const key of Object.keys(response.data.query.pages)) {
              try {
                self.note.persist.image = response.data.query.pages[key].thumbnail.source;
              } catch(err) {
                self.note.persist.image = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1024px-Wikipedia-logo-v2.svg.png';
              }
              break;
            }
          });
        }
        if(this.note.persist.image == 'images/225px-Wikipedia-logo-v2.png') {
          this.note.persist.image = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1024px-Wikipedia-logo-v2.svg.png';
        }
        return this.note.persist.image;
      },
      submitEdit() {
        this.note.persist.header = document.getElementById('edit-header').value;
        this.note.persist.description = document.getElementById('edit-description').value;
        this.note.editing = false;
      }
    }
  }
</script>

<style>
  @import '../assets/styles/sharedstylesnotes.css';
</style>
