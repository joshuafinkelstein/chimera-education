<template>
  <div class="LinkNote">
    <div class="tab-handle">
      <img v-if="hasValue(this.note.image)" :src="this.note.image">
      <div class="note-header">
        <b>{{ this.note.header }}</b>
        <br>
        <div v-if="hasValue(this.note.description)">{{this.note.description}}</div>
        <br>
        <a v-bind:href="this.note.url" target="_blank">{{this.note.linktitle}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LinkNote',
    props: {
      note: Object,
    },
    methods: {
      hasValue(val) {
        if(val == false || val == '' || val == null) {
          return false;
        } else {
          return true;
        }
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
