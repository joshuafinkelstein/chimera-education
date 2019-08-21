<?

function isSecure() {
  return
    (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || $_SERVER['SERVER_PORT'] == 443;
}

if (!isSecure()) {
  $redirect_uri = 'https://' . $_SERVER['HTTP_HOST'];
  header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}

?>

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1, user-scalable=yes">
    <title>Chimera | video notes</title>
    <link href='styles/main.css' rel='stylesheet'>
    <link href='styles/sharedstyles.css' rel='stylesheet'>
    <link href='styles/notes.css' rel='stylesheet'>
    <link href='styles/directory.css' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans|Open+Sans" rel="stylesheet">
    <script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>
    <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css" />
    <script>
      var url = new URL(window.location.href);
      videoID = url.searchParams.get('v');
      if(videoID == null) {
        videoID = '5utybhhmpFk';
      }
    </script>
    <!-- vue.js -->
    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <!-- axios for ajax requests from vue.js -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [ ['$','$'], ["\\(","\\)"] ],
          processEscapes: true
        }
      });
    </script>
    <script type="text/javascript" src="../MathJax/MathJax.js?config=TeX-AMS_HTML"></script> -->
    <link rel="apple-touch-icon" sizes="57x57" href="../logos/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="../logos/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="../logos/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="../logos/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="../logos/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="../logos/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="../logos/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="../logos/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../logos/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="../logos/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../logos/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="../logos/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../logos/favicon-16x16.png">
    <link rel="manifest" href="../manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="../logos/ms-icon-144x144.png">
    <meta name="theme-color" content="#584b4f">
  </head>
  <body>
    <div id="app">
      <header>
        <a href="https://chimeraeditor.com">
          <img id="chimera-logo" src="../logos/star.png" style="height: 40px; width: 40px; padding: 5px;">
        </a>
        <svg v-on:click="changevideo()" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="white" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        <nav id="options">
          <div class="flex"></div>
          <svg id="directory-button" v-on:click="toggleDirectory()" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="white" d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
          <svg id="backtovideo-button" v-on:click="toggleDirectory()" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="white" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>
          <img id="login-button" v-on:click="signIn()" src="images/blank-profile-picture.png">
        </nav>
      </header>

      <!-- login firebase auth -->
      <div id="login">
        <h4 id="login-title" style="text-align: center;">Welcome to Chimera</h4>
        <div id="firebaseui-auth-container">
          <div id="toggle-login-form" class="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner">
            <div class="firebaseui-card-content">
              <form onsubmit="return false;">
                <ul class="firebaseui-idp-list">
                  <li class="firebaseui-list-item">
                    <button onclick="toggleFirebasePasswordAuth();" class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button" data-provider-id="password" style="background-color:" data-upgraded=",MaterialButton">
                      <span class="firebaseui-idp-icon-wrapper">
                        <img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg">
                      </span>
                      <span class="firebaseui-idp-text firebaseui-idp-text-long">
                        Sign in with email
                      </span>
                      <span class="firebaseui-idp-text firebaseui-idp-text-short">
                        Email
                      </span>
                    </button>
                  </li>
                </ul>
              </form>
            </div>
            <div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">
              <p class="firebaseui-tos firebaseui-tospp-full-message">
                By continuing, you are indicating that you accept our <a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Terms of Service</a> and <a href="https://chimeraeditor.com/privacy/Privacy%20Notice.pdf" class="firebaseui-link firebaseui-pp-link" target="_blank">Privacy Policy</a>.
              </p>
            </div>
          </div>

          <div id="login-form" class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-sign-in hide">
            <form onsubmit="return false;">
              <div class="firebaseui-card-header">
                <h1 class="firebaseui-title">Sign in</h1>
              </div>
              <div class="firebaseui-card-content">
                <div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-upgraded" data-upgraded=",MaterialTextfield">
                  <label class="mdl-textfield__label firebaseui-label" for="email">Email</label>
                  <input id="email-input" type="email" name="email" autocomplete="username" class="mdl-textfield__input firebaseui-input firebaseui-id-email" value="joshfink429@gmail.com">
                </div>
                <div class="firebaseui-error-wrapper">
                  <p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-email-error"></p>
                </div>
                <div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty" data-upgraded=",MaterialTextfield">
                  <label class="mdl-textfield__label firebaseui-label" for="password">Password</label>
                  <input id="password-input" type="password" name="password" autocomplete="current-password" class="mdl-textfield__input firebaseui-input firebaseui-id-password">
                </div>
                <div class="firebaseui-error-wrapper">
                  <p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-password-error"></p>
                </div>
              </div>
              <div class="firebaseui-card-actions">
                <div class="firebaseui-form-links">
                  <a class="firebaseui-link firebaseui-id-secondary-link" href="javascript:void(0)">Trouble signing in?</a>
                </div>
                <div class="firebaseui-form-actions">
                  <button onclick="firebasePasswordAuth();" type="submit" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored" data-upgraded=",MaterialButton">
                    Sign In
                  </button>
                </div>
              </div>
              <div class="firebaseui-card-footer">
                <p class="firebaseui-tos firebaseui-tospp-full-message">
                  By continuing, you are indicating that you accept our <a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Terms of Service</a> and <a href="https://chimeraeditor.com/privacy/Privacy%20Notice.pdf" class="firebaseui-link firebaseui-pp-link" target="_blank">Privacy Policy</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
        <div id="loader">Loading...</div>
      </div>


      <!-- video notes -->
      <div id="main">

        <div id="noteSection">
          <div id="note-editor-header">
            <div id="filename">
              {{ videometa.title }}
            </div>
          </div>


          <div id="whole-paper">
            <div id="paper-text">
              <div id="history">

                <div class="note tab-container" v-on:click="timeJump(note.persist.timepoint)" v-for="note in sortedNotes" v-bind:data-type="note.persist.type" v-bind:data-index="note.persist.id" v-on:keyup.shift.enter="stopEditing()">

                  <div class="time" v-if="note.persist.type === 'blank'"></div>
                  <div class="time" v-else>{{ pptimepoint(note.persist.timepoint) }}</div>

                  <!-- TEXT NOTES view mode -->
                  <div class="contents" v-if="(note.persist.type === 'text' && note.persist.id != modifying) || (note.persist.type === 'text' && editing == false)">
                    <b v-if="hasValue(note.persist.header)">
                      {{ note.persist.header }}
                    </b>
                    <br v-if="hasValue(note.persist.header)">
                    {{ note.persist.description }}
                  </div>

                  <!-- TEXT NOTES edit mode -->
                  <div class="contents editing" v-else-if="note.persist.type === 'text'">
                    <textarea class="header" v-if="hasValue(note.persist.header)" v-model="note.persist.header">{{ note.persist.header }}</textarea>
                    <textarea class="header" v-else v-model="note.persist.header" placeholder="Add a Header"></textarea>
                    <br>
                    <textarea class="description" v-if="hasValue(note.persist.description)"  v-model="note.persist.description">{{ note.persist.description }}</textarea>
                    <textarea class="description" v-model="note.persist.description" v-else placeholder="Add a Description">{{ note.persist.description }}</textarea>
                    <button class="primary-button short-button" v-on:click="stopEditing()">Done</button>
                    <div class="isediting">EDITING</div>
                  </div>


                  <!-- WIKIPEDIA NOTES view mode -->
                  <div class="contents" v-else-if="(note.persist.type === 'Wikipedia' && note.persist.id != modifying) || (note.persist.type === 'Wikipedia' && editing == false)" v-on:mouseleave="deactivate(note)">

                    <div class="tab-handle" v-on:mouseover="showmoreinfo(note)">
                      <!-- <img v-if="!isset(note.image)" src="images/225px-Wikipedia-logo-v2.png"> -->
                      <img v-bind:src="retrieveimage(note)">
                      <div class="note-header">
                        <b>{{ retrieveheader(note) }}</b>
                        <br>
                        <div v-if="hasValue(note.persist.description)">{{note.persist.description}}</div>
                        <br>
                        <a v-bind:href="note.persist.url" target="_blank" v-on:click="linkclicked = true">{{note.persist.linktitle}}</a>
                      </div>
                    </div>
                    <div class="tab-moreinfo" v-if="note.showmoreinfo">
                      {{ note.persist.extract }}
                      <div class="fadecorner"></div>
                    </div>
                  </div>

                  <!-- TEXT NOTES edit mode -->
                  <div class="contents editing" v-else-if="note.persist.type === 'Wikipedia'">
                    <textarea class="header" v-if="hasValue(note.persist.header)" v-model="note.persist.header">{{ note.persist.header }}</textarea>
                    <textarea class="header" v-else v-model="note.persist.header" placeholder="Add a Header"></textarea>
                    <br>
                    <textarea class="description" v-if="hasValue(note.persist.description)"  v-model="note.persist.description">{{ note.persist.description }}</textarea>
                    <textarea class="description" v-model="note.persist.description" v-else placeholder="Add a Description">{{ note.persist.description }}</textarea>
                    <button class="primary-button short-button" v-on:click="stopEditing()">Done</button>
                    <div class="isediting">EDITING</div>
                  </div>


                  <!-- GENERAL LINK NOTES view mode -->
                  <div class="contents" v-else-if="(note.persist.type === 'link' && note.persist.id != modifying) || (note.persist.type === 'link' && editing == false)" v-on:mouseleave="deactivate(note)">

                    <div class="tab-handle">
                      <img v-if="hasValue(note.persist.image)" v-bind:src="note.persist.image">
                      <div class="note-header">
                        <b>{{ note.persist.header }}</b>
                        <br>
                        <div v-if="hasValue(note.persist.description)">{{note.persist.description}}</div>
                        <br>
                        <a v-bind:href="note.persist.url" target="_blank" v-on:click="linkclicked = true">{{note.persist.linktitle}}</a>
                      </div>
                    </div>
                    <div class="tab-moreinfo" v-if="note.showmoreinfo">
                      {{ note.persist.extract }}
                      <div class="fadecorner"></div>
                    </div>

                  </div>

                  <!-- GENERAL LINK NOTES edit mode -->
                  <div class="contents editing" v-else-if="note.persist.type === 'link'">
                    <textarea class="header" v-if="hasValue(note.persist.header)" v-model="note.persist.header">{{ note.persist.header }}</textarea>
                    <textarea class="header" v-else v-model="note.persist.header" placeholder="Add a Header"></textarea>
                    <br>
                    <textarea class="description" v-if="hasValue(note.persist.description)"  v-model="note.persist.description">{{ note.persist.description }}</textarea>
                    <textarea class="description" v-model="note.persist.description" v-else placeholder="Add a Description">{{ note.persist.description }}</textarea>
                    <br>
                    <textarea class="linktitle" v-if="hasValue(note.persist.linktitle)"  v-model="note.persist.linktitle">{{ note.persist.linktitle }}</textarea>
                    <textarea class="linktitle" v-model="note.persist.linktitle" v-else placeholder="Change the Link Title">{{ note.persist.linktitle }}</textarea>
                    <button class="primary-button short-button" v-on:click="stopEditing()">Done</button>
                    <div class="isediting">EDITING</div>
                  </div>


                  <!-- CHIMERA ANNOTATED VIDEO LINK view mode -->
                  <div class="contents" v-else-if="(note.persist.type === 'annotations' && note.persist.id != modifying) || (note.persist.type === 'annotations' && editing == false)" v-on:mouseleave="deactivate(note)">

                    <div class="tab-handle">
                      <img v-if="hasValue(note.persist.image)" v-bind:src="note.persist.image">
                      <div class="note-header">
                        <b>{{ note.persist.header }}</b>
                        <br>
                        <div v-if="hasValue(note.persist.description)">{{note.persist.description}}</div>
                        <br>
                        <a v-bind:href="note.persist.url" target="_blank" v-on:click="linkclicked = true">{{note.persist.linktitle}}</a>
                      </div>
                    </div>
                    <div class="tab-moreinfo" v-if="note.showmoreinfo">
                      {{ note.persist.extract }}
                      <div class="fadecorner"></div>
                    </div>
                  </div>

                  <!-- CHIMERA ANNOTATED VIDEO LINK NOTES edit mode -->
                  <div class="contents editing" v-else-if="note.persist.type === 'annotations'">
                    <textarea class="header" v-if="hasValue(note.persist.header)" v-model="note.persist.header">{{ note.persist.header }}</textarea>
                    <textarea class="header" v-else v-model="note.persist.header" placeholder="Add a Header"></textarea>
                    <br>
                    <textarea class="description" v-if="hasValue(note.persist.description)"  v-model="note.persist.description">{{ note.persist.description }}</textarea>
                    <textarea class="description" v-model="note.persist.description" v-else placeholder="Add a Description">{{ note.persist.description }}</textarea>
                    <button class="primary-button short-button" v-on:click="stopEditing()">Done</button>
                    <div class="isediting">EDITING</div>
                  </div>


                  <!-- YOUTUBE VIDEO LINK NOTES view mode -->
                  <div class="contents" v-else-if="(note.persist.type === 'video' && note.persist.id != modifying) || (note.persist.type === 'video' && editing == false)" v-on:mouseleave="deactivate(note)">

                    <div class="tab-handle">
                      <img v-if="hasValue(note.persist.image)" v-bind:src="note.persist.image">
                      <div class="note-header">
                        <b>{{ note.persist.header }}</b>
                        <br>
                        <div v-if="hasValue(note.persist.description)">{{note.persist.description}}</div>
                        <br>
                        <a v-bind:href="note.persist.url" target="_blank" v-on:click="linkclicked = true">{{note.persist.linktitle}}</a>
                      </div>
                    </div>
                    <div class="tab-moreinfo" v-if="note.showmoreinfo">
                      {{ note.persist.extract }}
                      <div class="fadecorner"></div>
                    </div>

                  </div>

                  <!-- YOUTUBE VIDEO LINK NOTES edit mode -->
                  <div class="contents editing" v-else-if="note.persist.type === 'video'">
                    <textarea class="header" v-if="hasValue(note.persist.header)" v-model="note.persist.header">{{ note.persist.header }}</textarea>
                    <textarea class="header" v-else v-model="note.persist.header" placeholder="Add a Header"></textarea>
                    <br>
                    <textarea class="description" v-if="hasValue(note.persist.description)"  v-model="note.persist.description">{{ note.persist.description }}</textarea>
                    <textarea class="description" v-model="note.persist.description" v-else placeholder="Add a Description">{{ note.persist.description }}</textarea>
                    <button class="primary-button short-button" v-on:click="stopEditing()">Done</button>
                    <div class="isediting">EDITING</div>
                  </div>



                  <div class="modify-note" v-on:click="toggleOptions" v-if="(note.persist.id != modifying || editing == false) || (note.persist.id == modifying && editing == false)  || modifying == null">
                    <!-- toggle additional options for each note -->
                    <svg v-on:click="modifyThisNote(note)" class="toggle-additional-options" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path class="modify" fill="darkgrey" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                    <!-- options -->
                    <svg v-on:click="editNote(modifying)" v-if="editing == false" class="edit-note" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="darkgrey" class="modify" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"/></svg>
                    <svg v-on:click="deleteNote(modifying)" class="delete-note" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="darkgrey" class="modify" d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                  </div>


                </div>

              </div>

              <!-- take up remaining space -->
              <div id="blank-paper"></div>

            </div>
          </div>

          <div id="note-input-container">
            <input type="text" id="note-input" v-model="input.value" v-on:keyup.enter="submitnote()" v-bind:placeholder="'add a note at ' + pptimepoint(timepoint) + ' (HINT: try a Wikipedia URL)'">
          </div>

        </div>


        <div id="videoSection">
          <div class="videoWrapper">
            <div id="player"></div>
          </div>
          <div id="video-description">
            <div id="video-info">
              <img v-bind:src="videometa.channelPhoto">
              <div id="video-title">
                <h4>{{videometa.title}}</h4>
                <h5>{{videometa.channel}}<h5>
              </div>
            </div>
            <p>
              {{videometa.description}}
            </p>
          </div>
        </div>


        <!-- DIRECTORY VIEW -->
        <div id="directory">
          <h3>My Files</h3>
          <div class="file" v-if="hasValue(file.title)" v-for="file in directory.private.notes" v-on:click="openFile(file.videoId)">
            <div class="filetitle" v-if="hasValue(file.title)">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="black" d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
              {{ file.title }}
            </div>
            <div class="filechannel" v-if="hasValue(file.channel)">{{ file.channel }}</div>
            <div class="fileauthor" v-if="hasValue(file.author)">{{ file.author }}</div>
          </div>
          <br>
          <br>
          <h3>Public Files</h3>
          <div class="file" v-if="hasValue(file.title)" v-for="file in directory.public.notes" v-on:click="openFile(file.videoId)">
            <div class="filetitle" v-if="hasValue(file.title)">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="black" d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
              {{ file.title }}
            </div>
            <div class="filechannel" v-if="hasValue(file.channel)">{{ file.channel }}</div>
            <div class="fileauthor" v-if="hasValue(file.author)">{{ file.author }}</div>
          </div>
        </div>

      </div>

    </div>

    <div class="footer">
      <span>Chimera Video Annotation Software &copy 2019</span><div class="flex"></div><span>info@chimeraeditor.com</span>
    </div>

    <script
    src="https://code.jquery.com/jquery-3.2.1.min.js"
    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>

    <script src="scripts/videoplayer.js"></script>
    <script src="scripts/functions.js"></script>

    <!-- Add the entire Firebase JavaScript SDK -->
    <script src="https://www.gstatic.com/firebasejs/6.3.0/firebase.js"></script>

    <script>
      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      function toggleFirebasePasswordAuth() {
        document.getElementById('toggle-login-form').style.display = 'none';
        document.getElementById('login-form').classList.remove('hide');
      }

      function firebasePasswordAuth() {

        var email = document.getElementById('email-input').value;
        var password = document.getElementById('password-input').value;

        document.getElementById('toggle-login-form').style.display = 'block';
        document.getElementById('login-form').classList.add('hide');

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      }
      auth = null;

      // Get a reference to the database service
      database = firebase.database();
    </script>

    <!-- vue.js-->
    <script src="scripts/app.js"></script>

    <!-- access control via firebase -->
    <script src="scripts/firebase.js"></script>

  </body>
</html>
