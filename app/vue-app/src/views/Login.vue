<template>
  <div class="login ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui white image header">
        <img src="../assets/logo.png" class="image">
        <div class="content">
          Chimera
        </div>
      </h2>
      <form v-on:submit.prevent class="ui large form">
        <div class="ui stacked segment">
          <h4 class="ui header">Sign In with Email</h4>
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="email" v-model="email" placeholder="E-mail address">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" v-model="password" placeholder="Password">
            </div>
          </div>
          <div @click="emailSignIn" class="ui fluid large teal submit button">Login</div>
        </div>
        <div class="ui error message"></div>
        <div class="ui horizontal divider">OR</div>
        <div class="ui stacked segment">
          <h4 class="ui header">Sign In with Another Provider</h4>
          <div class="ui vertical segment">
            <button @click="googleSignIn" class="ui fluid google button">
              <i class="google icon"></i>
              Sign in with Google
            </button>
          </div>
        </div>

      </form>

      <div class="ui message">
        Don't have an account? <router-link to="/sign-up">Register Here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  const fb = require('../firebaseConfig.js');

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      emailSignIn: function() {
        fb.auth.signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$store.commit('setCurrentUser', user)
            this.$router.replace('home')
          },
          (err) => {
            console.log(err.message)
          }
        );
      },
      googleSignIn: function() {
        fb.auth.signInWithPopup(fb.google).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          this.$store.commit('setCurrentUser', user)

          if(user) {
            this.$router.replace('home');            
          }
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(error.message);
        });
      }
    }
  }


  $(document).ready(function() {
      $('.ui.form').form({
        fields: {
          email: {
            identifier  : 'email',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter your e-mail'
              },
              {
                type   : 'email',
                prompt : 'Please enter a valid e-mail'
              }
            ]
          },
          password: {
            identifier  : 'password',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter your password'
              }
            ]
          }
        }
      });
    });

</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .ui.grid {
    min-height: 100vh;
    background-color: #343233;
    padding: 10px;
  }
  .ui.horizontal.divider {
    color: white;
  }
  .ui.header.white {
    color: white;
    font-family: 'Montserrat', 'Lato';
  }
  .image {
    margin-top: -100px;
  }
  .column {
    max-width: 450px;
  }
</style>
