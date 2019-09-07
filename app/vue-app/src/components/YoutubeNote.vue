<template>
  <div v-if="!note.editing" class="YoutubeNote">
    <div class="tab-handle">
      <img v-if="hasValue(this.note.persist.image)" :src="this.note.persist.image">
      <div class="note-header">
        <b>{{ this.note.persist.header }}</b>
        <br>
        <vue-mathjax v-if="hasValue(note.persist.description)" :formula="note.persist.description"></vue-mathjax>
        <br>
        <a :href="this.note.persist.url" target="_blank">{{this.note.persist.linktitle}}</a>
      </div>
    </div>
  </div>

  <div v-else class="YoutubeNote">
    <div class="tab-handle">
      <img v-if="hasValue(this.note.persist.image)" :src="this.note.persist.image">
      <div class="note-header">
        <b>
          <textarea id="edit-header" placeholder="Add a header..." @keydown="resize" @keyup="resize">{{ note.persist.header }}</textarea>
        </b>
        <br>
        <div>
          <textarea id="edit-description" placeholder="Add a description...">{{ note.persist.description }}</textarea>
        </div>
        <br>
        <a :href="this.note.persist.url" target="_blank">{{this.note.persist.linktitle}}</a>
      </div>
    </div>
  </div>

</template>

<script>
  import shared from '../assets/scripts/sharedmethods';

  export default {
    name: 'YoutubeNote',
    props: {
      note: Object
    },
    methods: {
      hasValue(val) {
        return shared.hasValue(val);
      },
      resize(event) {
        return shared.resize(event);
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
