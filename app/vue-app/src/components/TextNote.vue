<template>
  <!-- view mode -->
  <div v-if="!note.editing" class="TextNote">
    <b v-if="hasValue(note.persist.header)">
      {{ note.persist.header }}
    </b>
    <br v-if="hasValue(note.persist.header)">
    <vue-mathjax v-if="hasValue(note.persist.description)" :formula="note.persist.description"></vue-mathjax>
    <img class="banner" v-if="hasValue(note.persist.image)" :src="note.persist.image">
  </div>
  <!-- editing mode -->
  <div v-else class="TextNote" @keyup.shift.enter="submitEdit">
    <b>
      <textarea id="edit-header" placeholder="Add a header..." @keydown="resize" @keyup="resize">{{ note.persist.header }}</textarea>
    </b>
    <br>
    <textarea id="edit-description" placeholder="Add a description..." @keydown="resize" @keyup="resize">{{ note.persist.description }}</textarea>
    <img class="banner" v-if="hasValue(note.persist.image)" :src="note.persist.image">
    <div class="editing-tip" @click="submitEdit">Press Shift+Enter<i class="large check circle icon"></i></div>
  </div>
</template>

<script>
  import shared from '../assets/scripts/sharedmethods';

  export default {
    name: 'TextNote',
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
