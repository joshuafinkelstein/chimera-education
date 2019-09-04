<template>
  <div v-if="!note.editing" class="WikipediaNote" @mouseover="showExtract" @mouseleave="hideExtract">
    <div class="tab-handle">
      <img :src="retrieveImage()">
      <div class="note-header">
        <b>{{ retrieveHeader() }}</b>
        <br>
        <div v-if="hasValue(note.persist.description)">{{note.persist.description}}</div>
        <br>
        <a :href="note.persist.url" target="_blank">{{note.persist.linktitle}}</a>
      </div>
    </div>
    <div class="tab-moreinfo" v-if="showingExtract">
      {{ note.persist.extract }}
      <div class="fadecorner"></div>
    </div>
  </div>

  <div v-else class="WikipediaNote" @mouseover="showExtract" @mouseleave="hideExtract">
    <div class="tab-handle">
      <img :src="retrieveImage()">
      <div class="note-header">
        <b>
          <textarea id="edit-header" placeholder="Add a header..." @keydown="resize" @keyup="resize">{{ note.persist.header }}</textarea>
        </b>
        <br>
        <div>
          <textarea id="edit-description" placeholder="Add a description...">{{ note.persist.description }}</textarea>
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
        if(val == false || val == '' || val == null) {
          return false;
        } else {
          return true;
        }
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
      resize(event) {
        var textareaElement = event.target;
        // textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight+'px';
      },
      submitEdit() {
        this.note.persist.header = document.getElementById('edit-header').value;
        this.note.persist.description = document.getElementById('edit-description').value;
        this.note.editing = false;
      }
    }
  }
</script>

<style scoped>
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

  /* editing mode */
  textarea {
    font-size: inherit;
    font-weight: inherit;
    background-color: inherit;
    width: 100%;
    border-color: rgba(27,28,29,0.2);
    resize: none;
    overflow: hidden;
    line-height: 0.25;
    padding-top: 6px;
  }
  .editing-tip {
    width: 110px;
    font-size: 10px;
    text-align: right;
    float: right;
  }
</style>
