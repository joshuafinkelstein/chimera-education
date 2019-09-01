<template>
  <div class="home">
    <div class="ui inverted menu">
      <div class="ui container">
        <a href="https://chimeraeditor.com" class="header item">
          <img class="logo" src="../assets/logo.png">
        </a>
        <a id="toggle-search" v-on:click="changevideo()" class="item"><i class="search icon"></i></a>
        <div id="search-bar" class="ui item fluid category search">
          <div class="ui icon input">
            <input class="prompt" type="text" placeholder="YouTube Video URL...">
            <i class="search icon"></i>
          </div>
        </div>
        <a id="toggle-directory" v-on:click="toggleDirectory()" class="item"><i class="folder icon"></i></a>
        <div id="toggle-account" class="ui right simple dropdown item">
          <i class="user outline icon"></i> Account
          <div class="menu">
            <a class="item" id="sign-in-button">Sign In</a>
            <a class="item" href="https://chimeraeditor.com/privacy/Privacy%20Notice.pdf">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import {db} from '../main';

  // try {
  //   db.ref('published').once('value').then(function(snapshot) {
  //     // $el.publicDirectory = snapshot.val();
  //     console.log(snapshot.val());
  //   });
  // } catch(err) {
  //   console.log(err.message);
  // }



  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  export default {
    name: 'home',
    methods: {
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  }
  //
  // db.ref('published/').once('value').then(function(snapshot) {
  //   app.publicDirectory = snapshot.val();
  //   // console.log(firebase.auth());
  //   console.log(app.publicDirectory);
  // });

  // if(app) {
  //   firebase.database().ref('published/').once('value').then(function(snapshot) {
  //     app.publicDirectory = snapshot.val();
  //     // console.log(firebase.auth());
  //     console.log(app);
  //   });
  // }


</script>
