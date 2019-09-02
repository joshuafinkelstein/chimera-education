<template>
  <div class="WikipediaNote" @mouseover="showExtract" @mouseleave="hideExtract">
    <div class="tab-handle">
      <img :src="retrieveImage()">
      <div class="note-header">
        <b>{{ retrieveHeader() }}</b>
        <br>
        <div v-if="hasValue(note.description)">{{note.description}}</div>
        <br>
        <a :href="note.url" target="_blank">{{note.linktitle}}</a>
      </div>
    </div>
    <div class="tab-moreinfo" v-if="showingExtract">
      {{ note.extract }}
      <div class="fadecorner"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WikipediaNote',
    props: {
      note: Object,
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
        if(this.note.extract == 'pulling info from Wikipedia') {
          var url = new URL(this.note.url);
          var articleName = this.url.pathname.split('/')[2].replace('_', '%20');
          //ajax request and run function on response
          Vue.axios.get('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&format=json&origin=*&titles=' + articleName).then(function(response) {
            for (const key of Object.keys(response.data.query.pages)) {
              this.note.extract = response.data.query.pages[key].extract;
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
        if(!this.note.header) {
          var url = new URL(this.note.url);
          this.note.header = this.note.url.pathname.split('/')[2].replace('_', ' ');
        }
        return this.note.header;
      },
      //main image from wikipedia article
      retrieveImage() {
        if(!this.note.image) {
          var url = new URL(this.note.url);
          var articleName = url.pathname.split('/')[2].replace('_', '%20');
          Vue.axios.get('https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=100&redirects=1&format=json&origin=*&titles=' + articleName).then(function(response) {
            for (const key of Object.keys(response.data.query.pages)) {
              try {
                this.note.image = response.data.query.pages[key].thumbnail.source;
              } catch(err) {
                this.note.image = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1024px-Wikipedia-logo-v2.svg.png';
              }
              break;
            }
          });
        }
        if(this.note.image == 'images/225px-Wikipedia-logo-v2.png') {
          this.note.image = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1024px-Wikipedia-logo-v2.svg.png';
        }
        return this.note.image;
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
</style>
