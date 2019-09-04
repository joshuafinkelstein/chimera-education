<template>
  <div v-if="!note.editing" class="LinkNote">
    <div class="tab-handle">
      <img v-if="hasValue(this.note.persist.image)" :src="this.note.persist.image">
      <div class="note-header">
        <b>{{ this.note.persist.header }}</b>
        <br>
        <div v-if="hasValue(this.note.persist.description)">{{this.note.persist.description}}</div>
        <br>
        <a v-bind:href="this.note.persist.url" target="_blank">{{this.note.persist.linktitle}}</a>
      </div>
    </div>
  </div>

  <div v-else class="LinkNote">
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
        <a>
          <textarea id="edit-linktitle" placeholder="Label the link...">{{ note.persist.linktitle }}</textarea>
        </a>
      </div>
      <div class="editing-tip" @click="submitEdit">Press Shift+Enter<i class="large check circle icon"></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LinkNote',
    props: {
      note: Object
    },
    methods: {
      hasValue(val) {
        if(val == false || val == '' || val == null) {
          return false;
        } else {
          return true;
        }
      },
      resize(event) {
        var textareaElement = event.target;
        // textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight+'px';
      },
      submitEdit() {
        this.note.persist.header = document.getElementById('edit-header').value;
        this.note.persist.description = document.getElementById('edit-description').value;
        this.note.persist.linktitle = document.getElementById('edit-linktitle').value;
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
