var app = new Vue({
  el: '#app',
  data: {
    notes: [
    ],
    directory: {
      public: [],
      private: []
    },
    videometa: {
      title: 'Untitled Video',
      channelPhoto: '../logos/star.png',
      channel: '',
      author: '',
      description: '',
      default: true,
      videoId: 'no value'
    },
    timepoint: 0,
    linkclicked: false,
    modifying: null,
    editing: false,
    adding: false,
    randomQuestion: 'test',
    input: {
      timepoint: null,
      type: 'blank',
      value: ''
    }
  },
  computed: {
    sortedNotes: function() {
      var sortedKeys;
      var notes = this.notes;
      console.log('rendering');
      var output = {};
      if(Object.keys(notes).length > 1) {
        var sortedKeys = Object.keys(notes).sort(function(a, b) {
          try {
            return notes[a].persist.timepoint - notes[b].persist.timepoint;
          } catch(err) {}
        })

        var i = 0;
        for(var key = 0; key < Object.keys(sortedKeys).length; key++) {
          output[i] = notes[sortedKeys[key]];
          i++;
        }
        return output;
      } else {
        return notes;
      }
    }
  },
  watch: {
    notes: {
      handler: function() {
        // console.log(this.notes);
        for(const key in this.notes) {

          if(this.notes[key] != null) {
            this.notes[key].persist.id = key;
          }

          if(typeof auth != 'undefined') {
            if(auth != null) {
              firebase.database().ref('users/'+auth.currentUser.uid+'/notes/'+videoID+'/'+key+'/').set(this.notes[key]);
            }
          }

        }
      },
      deep: true, //otherwise it only watches for changes to first level in tree and ignores nested values
      immediate: true
    },
    videometa: {
      handler: function() {

        if(typeof this.videometa.default == 'undefined') {
          this.videometa.default = true;
        }

        if(this.videometa.channel == 'MIT OpenCourseWare') {
          this.videometa.channelPhoto = "https://yt3.ggpht.com/-R20NMGble7Q/AAAAAAAAAAI/AAAAAAAAAAA/jtkvXd3lm7o/s68-c-k-no-mo-rj-c0xffffff/photo.jpg";
        } else if (this.videometa.channel == 'Udacity') {
          this.videometa.channelPhoto = "https://yt3.ggpht.com/-slzOwsq8iv0/AAAAAAAAAAI/AAAAAAAAAAA/KMUFhY9BQXc/s68-c-k-no-mo-rj-c0xffffff/photo.jpg";
        }

        // save changes if signed in
        if(typeof auth != 'undefined') {
          console.log(this.videometa);
          if(auth != null && videoID.length == 11) {
            firebase.database().ref('users/'+auth.currentUser.uid+'/notes/videometa'+videoID+'/').set(this.videometa);

            // display private directory
            firebase.database().ref('users/'+auth.currentUser.uid+'/').once('value').then(function(snapshot) {
              app.directory.private = snapshot.val();
            });
          }
        }
      },
      deep: true
    },
    input: {
      handler: function() {

        // if(this.input.value == '') {
        //   this.input.timepoint = this.timepoint;
        //   this.input.type = 'blank';
        // }

        if(this.input.timepoint == null) {
          this.input.timepoint = this.timepoint;
        } else {
          if(this.input.value != '') {
            this.input.type = 'text';
          }
        }
      },
      deep: true,
      immediate: true
    },
    editing: {
      handler: function() {
        if(this.editing == true) {
          document.getElementById('note-input-container').style.display = 'none';
        } else {
          document.getElementById('note-input-container').style.display = 'block';
        }
      }
    }
  },
  methods: {
    // rudimentary router
    toggleDirectory: function() {
      console.log(document.getElementById('noteSection').style.display);
      if(document.getElementById('noteSection').style.display == 'flex' || document.getElementById('noteSection').style.display == '') {
        document.getElementById('noteSection').style.display = 'none';
        document.getElementById('videoSection').style.display = 'none';
        document.getElementById('directory').style.display = 'block';
        // button
        // document.getElementById('directory-button').style.display = 'none';
        // document.getElementById('backtovideo-button').style.display = 'block';
      } else {
        document.getElementById('noteSection').style.display = 'flex';
        document.getElementById('videoSection').style.display = 'flex';
        document.getElementById('directory').style.display = 'none';
        // button
        // document.getElementById('directory-button').style.display = 'block';
        // document.getElementById('backtovideo-button').style.display = 'none';
      }
    },
    //misc
    askRandomQuestion: function() {
      // console.log('random');
      if(maintain == false) {
        firebase.database().ref('questions/').once('value').then(function(snapshot) {
          // console.log(Math.floor(Math.random() * (snapshot.val().length-1)));
          app.randomQuestion = snapshot.val()[Math.ceil(Math.random() * (snapshot.val().length-1))];
          // console.log(app.randomQuestion);
          return app.randomQuestion;
        })
        maintain = true;
      }

    },
    submitFeedback: function() {
      var feedback = document.getElementById('random-question').value;
      var comment = document.getElementById('general-feedback').value;
      document.getElementById('random-question').value = '';
      document.getElementById('general-feedback').value = '';
      firebase.database().ref('answers/feedback/'+this.randomQuestion+'/'+Date.now()+'/').set({
        'feedback': feedback
      });
      firebase.database().ref('answers/comments/'+Date.now()+'/').set({
        'comment': comment
      });
      document.getElementById('random-question').placeholder = 'We recieved your feedback. Thanks so much.';
    },
    //toggle sign in
    signIn: function() {


      // var status = document.getElementById('login').style.display;
      // if(status == '') {
      //   status = 'none';
      // }
      //
      // if(status == 'none') {
      //   document.getElementById('login').style.display = 'block';
      //   document.getElementById('main').style.opacity = '0.5';
      // } else {
      //   document.getElementById('login').style.display = 'none';
      //   document.getElementById('main').style.opacity = '1';
      // }
    },
    //00:00 format timepoints
    pptimepoint: function(seconds) {
      seconds = Math.floor(seconds);
      var prettyTime;
      if ((seconds/60) >= 10) {
        if ((seconds % 60) >= 10) {
          prettyTime = Math.floor(seconds/60)+':'+seconds%60;
        } else {
          prettyTime = Math.floor(seconds/60)+':0'+seconds%60;
        }
      } else {
        if ((seconds % 60) >= 10) {
          prettyTime = '0'+Math.floor(seconds/60)+':'+seconds%60;
        } else {
          prettyTime = '0'+Math.floor(seconds/60)+':0'+seconds%60;
        }
      }
      return prettyTime;
    },
    //jump to timepoint in video
    timeJump: function(seconds) {
      if(openingoptions != true && this.editing == false) {
        // don't jump to timepoint if user clicks to toggle note options
        timeJump(seconds);
      }

      if(this.editing == null) {
        this.editing = false;
      }
    },
    //check if name-value pair is in data
    isset: function(variable) {
      if(typeof variable == 'undefined') {
        return false;
      } else {
        return true;
      }
    },
    test: function() {
      alert('it works');
    },
    openFile: function(id) {
      window.location.href = "https://chimeraeditor.com/app/editor?v=" + id;
    },
    activate: function(note) {
      note.active = true;
    },
    deactivate: function(note) {
      note.active = false;
      note.showmoreinfo = false;
    },
    //article title from Wikipedia
    retrieveheader: function(note) {
      if(!note.persist.header) {
        var url = new URL(note.persist.url);
        note.persist.header = url.pathname.split('/')[2].replace('_', ' ');
        // firebase.database().ref('test/notes').set(this.notes);
      }
      return note.persist.header;
    },
    //main image from wikipedia article
    retrieveimage: function(note) {
      if(!note.persist.image) {
        console.log('retrieving image');
        var url = new URL(note.persist.url);
        var articleName = url.pathname.split('/')[2].replace('_', '%20');
        axios.get('https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=100&redirects=1&format=json&origin=*&titles=' + articleName).then(function(response) {
          for (const key of Object.keys(response.data.query.pages)) {
            try {
              note.persist.image = response.data.query.pages[key].thumbnail.source;
            } catch(err) {

              note.persist.image = 'images/225px-Wikipedia-logo-v2.png';
              // console.log(note.persist.image);
            }

            // console.log(note);
            // firebase.database().ref('test/notes').set(this.notes);
            break;
          }
        });
      }
      return note.persist.image;
    },
    //show additional info on hover
    showmoreinfo: function(note) {
      note.active = true;
      if(note.persist.extract == 'pulling info from Wikipedia') {
        var url = new URL(note.persist.url);
        var articleName = url.pathname.split('/')[2].replace('_', '%20');
        //ajax request and run function on response
        axios.get('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&format=json&origin=*&titles=' + articleName).then(function(response) {
          for (const key of Object.keys(response.data.query.pages)) {
            note.persist.extract = response.data.query.pages[key].extract;
            break;
          }
        });
      }
      var delay_open = 0;
      var interval = setInterval(function() {
        delay_open += 100;
        if(note.active == false) {
          delay_open = 0;
        }
        if(delay_open == 500 && note.active == true) {
          note.showmoreinfo = true;
          clearInterval(interval);
          delay_open = 600;
        }
      }, 100);
      return true;
    },
    //add new note
    submitnote: function() {

      var note = {};
      note.persist = {};
      note.persist.timepoint = this.input.timepoint;
      note.persist.header = false;
      note.persist.description = false;
      note.persist.image = false;

      //check for special cases
      //wikipedia
      if(this.input.value.substring(0,30) == 'https://en.wikipedia.org/wiki/') {
        note.persist.type = 'Wikipedia';
        note.persist.url = this.input.value;
        note.persist.linktitle = 'Wikipedia Page';
        note.persist.extract = 'pulling info from Wikipedia';
      }
      //Chimera
      else if (this.input.value.substring(0,25) == 'https://chimeraeditor.com') {
        note.persist.type = 'annotations';
        note.persist.url = this.input.value;
        note.persist.linktitle = 'Annotated Video';
        note.persist.header = note.persist.url;
        note.persist.image = '..logos/star.png';
      }
      //YouTube video
      else if (this.input.value.substring(0,24) == 'https://www.youtube.com/') {
        note.persist.type = 'video';
        note.persist.url = this.input.value;
        note.persist.header = note.persist.url;
        note.persist.linktitle = 'YouTube Video';
        note.persist.image = 'images/youtube.png';
      }
      //generic link
      else if (this.input.value.substring(0,8) == 'https://') {
        note.persist.type = 'link';
        note.persist.url = this.input.value;
        note.persist.header = note.persist.url;
        note.persist.linktitle = 'Web Link';
      }
      // text note
      else {
        var input_value = this.input.value;
        // markdown support for header/description
        if(input_value.substring(0,1) == '#'){
          note.persist.header = input_value.substring(1,input_value.length);
          note.persist.description = '';
          // check if there is a description as well
          var i = 0;
          for(var char in input_value.substring(1,input_value.length)){
            i++;
            if(input_value.charAt(parseInt(char)+1) == '#'){ //start description
              note.persist.header = input_value.substring(1,i);
              note.persist.description = input_value.substring(i+1,input_value.length);
            }
          }
        } else {
          note.persist.description = this.input.value;
        }
        note.persist.type = this.input.type;
      }

      note.showmoreinfo = false;
      note.active = false;

      var maxkey = 0;
      // console.log(Object.keys(this.notes));
      for(const key in this.notes) {

        if(parseInt(key) > maxkey) {
          maxkey = parseInt(key);
        }
      }
      // console.log(this.notes);
      if(this.notes.length != 0) {
        maxkey += 1;
      }
      // app.notes[maxkey] = note;

      app.$set(app.notes, maxkey, note);

      // console.log(maxkey);

      // app.notes = this.notes;

      if(auth != null) {
        firebase.database().ref('users/'+auth.currentUser.uid+'/notes/'+videoID).set(this.notes);
      }

      // console.log(this.notes);

      document.getElementById('note-input').value = '';
      this.input.value = '';
      this.input.type = 'blank';
      this.input.timepoint = null;
    },
    modifyThisNote: function(note) {
      this.editing = false;
      this.modifying = note.persist.id;
    },
    //delete, edit, format notes
    //opens a modal set relative to target
    toggleOptions: function(event) {
      target = event.target;

      //find assoicated note in DOM
      targetpath = event.path;
      targetId = null;
      parent = null;
      for(var i = 0; i < targetpath.length; i++) {

        if(targetpath[i].className == 'modify-note') {
          parent = targetpath[i];

          parent.getElementsByClassName('toggle-additional-options')[0].style.display = 'none';
          parent.getElementsByClassName('delete-note')[0].style.display = 'inline-block';
          if(this.modifying != targetId && this.editing == false) {
            parent.getElementsByClassName('edit-note')[0].style.display = 'inline-block';
          }
        }

        if(typeof targetpath[i].dataset != 'undefined') {
          if(typeof targetpath[i].dataset.index != 'undefined') {
            targetId = targetpath[i].dataset.index;
          }
        }

      }

      openingoptions = true;
    },
    hasValue: function(property) {
      if(typeof property == 'undefined') {
        return false;
      }

      if(property == false || property == '') {
        return false;
      } else {
        return true;
      }
    },
    editNote: function(modifying) {
      console.log('editing note at index ' + modifying);
      this.editing = true;

      if(this.notes[modifying].persist.header == false) {
        this.notes[modifying].persist.header = '';
      }
      if(this.notes[modifying].persist.description == false) {
        this.notes[modifying].persist.description = '';
      }

    },
    stopEditing: function() {
      this.editing = null;
      this.modifying = null;
    },
    deleteNote: function(modifying) {
      app.$delete(this.notes, modifying);
      // user signed in?
      if(auth != null) {
        firebase.database().ref('users/'+auth.currentUser.uid+'/notes/'+videoID+'/'+modifying+'/').set(null);
      }
    },
    share: function() {
      firebase.database().ref('shared/'+auth.currentUser.uid+'/notes/'+videoID).set(this.notes);
    },
    publish: function() {
      firebase.database().ref('published/notes/'+videoID).set(this.notes);
      firebase.database().ref('published/notes/videometa'+videoID+'/').set(this.videometa);
    }
  }
})
