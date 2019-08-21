var accesspoint = null;
setInterval(function() {
  app.timepoint = elapsedTime;
  if(app.input.value == '') {
    app.input.timepoint = app.timepoint;
    app.input.type = 'blank';
  }
}, 1000)


// get user info
firebase.auth().onAuthStateChanged(function(user) {
  // display public directory
  firebase.database().ref('published/').once('value').then(function(snapshot) {
    app.directory.public = snapshot.val();
  });

  if (user) {
      // User is signed in.
      auth = firebase.auth();

      // document.getElementsByClassName('mdl-card')[0].style.display = 'none';

      document.getElementById('login-title').innerHTML = 'Switch Account';


      var photoURL = auth.currentUser.photoURL;
      var userPhoto = document.createElement('div.userphoto');
      userPhoto.setAttribute('style', 'height: 20px; font-size: 22px; padding: 9px 16px 11px 14px; margin: 5px 5px 5px 10px; width: 10px; background-color: darkblue; border-radius: 50%; font-family: Helvetica; cursor: pointer;');
      userPhoto.innerHTML = user.email.substring(0,1).toUpperCase();
      userPhoto.setAttribute('onclick', 'signIn();')
      document.getElementById('options').replaceChild(userPhoto, document.getElementById('login-button'));

      firebase.database().ref('users/'+auth.currentUser.uid+'/account').set(auth.currentUser.providerData[0]);

      // display public directory
      firebase.database().ref('users/'+auth.currentUser.uid+'/').once('value').then(function(snapshot) {
        app.directory.private = snapshot.val();
      });

      //does the user already have a noteset for this video?
      accesspoint = 'private';
      firebase.database().ref('users/'+auth.currentUser.uid+'/notes/'+videoID+'/').once('value').then(function(snapshot) {
        //the user has a private noteset
        if(snapshot.val() != null) {
          app.notes = pullNotes(snapshot);
        } else {
          //try to pull in a published noteset
          firebase.database().ref('published/notes/'+videoID+'/').once('value').then(function(snapshot) {
            //is there a public noteset available?
            if(snapshot.val() != null) {
              app.notes = pullNotes(snapshot);
            } else {
              //cannot save data
              console.log('Signed in. No public noteset.');
            }
          })
        }
      })
      //does the user already have video metadata for this video?
      firebase.database().ref('users/'+auth.currentUser.uid+'/notes/videometa'+videoID+'/').once('value').then(function(snapshot) {
        if(snapshot.val() != null) {
          app.videometa = snapshot.val();
          app.videometa.default = false;
          accesspoint = 'users/'+auth.currentUser.uid+'/notes/';
        } else {
          //try to pull in a published video metadata set
          firebase.database().ref('published/notes/videometa'+videoID+'/').once('value').then(function(snapshot) {
            //is there is a published videometa available?
            if(snapshot.val() != null) {
              app.videometa = snapshot.val();
              app.videometa.default = false;
            } else {
              //cannot save data
              console.log('Signed in. No public video metadata.');
              firebase.database().ref('users/'+auth.currentUser.uid+'/notes/videometa'+videoID+'/').set(app.videometa);
            }
          })
        }
      })
    } else {
      accesspoint = 'public';
      // No user is signed in.
      //annotations
      firebase.database().ref('published/notes/'+videoID+'/').once('value').then(function(snapshot) {
        //is there a public noteset available?
        if(snapshot.val() != null) {
          app.notes = pullNotes(snapshot);
        } else {
          //cannot save data
          console.log('Not signed in. No public noteset.');
        }
      })
      //video metadata
      firebase.database().ref('published/notes/videometa'+videoID+'/').once('value').then(function(snapshot) {
        //is there is a published videometa available?
        if(snapshot.val() != null) {
          app.videometa = snapshot.val();
          app.videometa.default = false;
        } else {
          //cannot save data
          console.log('Not signed in. No public video metadata.');
        }
      })
    }
});
