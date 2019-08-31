<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>

  </div>
</template>

<template>
  <div class="login ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <img src="../assets/logo.png" class="image">
        <div class="content">
          Register for an account
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked segment">
          <h4 class="ui header">Sign In with Email</h4>
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="email" v-model="email" placeholder="Email">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" v-model="password" placeholder="Password">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="retypePassword" v-model="retypePassword" placeholder="Retype Password">
            </div>
          </div>
          <div @click="signUp" class="ui fluid large teal submit button">Sign Up</div>
        </div>
        <div class="ui error message"></div>
      </form>

      <div class="ui message">
        <span>or go back to <router-link to="/login">login</router-link>.</span>
      </div>
    </div>
  </div>
</template>

 <script>
  import firebase from 'firebase';
  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: '',
        retypePassword: ''
      }
    },
    methods: {
      signUp: function() {
        if(this.password == this.retypePassword) {
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
            function (user) {
              this.$router.replace('home')
            },
            function (err) {
              alert('Oops. ' + err.message)
            }
          );
        }
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
        },
        retypePassword: {
          identifier  : 'retypePassword',
          rules: [
            {
              type  : 'match[password]',
              prompt  : 'Passwords do not match.'
            }
          ]
        }
      }
    });
  });
</script>

 <style scoped>
 .ui.grid {
   min-height: 100vh;
   background-color: #343233;
   padding: 10px;
 }
 .ui.horizontal.divider {
   color: white;
 }
 .image {
   margin-top: -100px;
 }
 .column {
   max-width: 450px;
 }
</style>
