// defaultModal = document.getElementById('modal-background');
// defaultModalWindow = document.getElementById('modal-window');
parent = null;
target = null;
targetId = null;
prevId = null;
targetpath = null;
openingoptions = false;
maintain = false;
noteOptions = document.getElementById('modify-options');
modalopen = false;
window.onclick = function(event) {
  try {

    if(event.target != target && event.target != parent) {
      parent.getElementsByClassName('toggle-additional-options')[0].style.display = 'block';
      parent.getElementsByClassName('delete-note')[0].style.display = 'none';
      parent.getElementsByClassName('edit-note')[0].style.display = 'none';
      openingoptions = false;
    } else {
      for(var i = 0; i < event.path.length; i++) {

        if(typeof event.path[i].dataset != 'undefined') {
          if(typeof event.path[i].dataset.index != 'undefined') {
            if(prevId != event.path[i].dataset.index && prevId != null) {
              var toclose = document.getElementsByClassName('modify-note')
              // console.log('new target: ' + event.path[i].dataset.index);
              for(var q = 0; q < toclose.length; q++) {
                toclose[q].getElementsByClassName('toggle-additional-options')[0].style.display = 'block';
                toclose[q].getElementsByClassName('delete-note')[0].style.display = 'none';
                toclose[q].getElementsByClassName('edit-note')[0].style.display = 'none';
              }

              // open new target options
              event.path[i].getElementsByClassName('toggle-additional-options')[0].style.display = 'none';
              event.path[i].getElementsByClassName('delete-note')[0].style.display = 'inline-block';
              event.path[i].getElementsByClassName('edit-note')[0].style.display = 'inline-block';
              openingoptions = true;
              // console.log('false');
            }
          }
        }
      }
    }

    // manage editor close
    if(app.editing == true) {
      for(var i = 0; i < event.path.length; i++) {
        if(typeof event.path[i].dataset != 'undefined') {
          if(typeof event.path[i].dataset.index != 'undefined') {
            if(event.path[i].dataset.index != targetId) {
              app.editing = false;
              console.log(targetId);
            }
          }
        }
      }
    }

    prevId = targetId;

  } catch(err) {}
}

//position on document
function offset(el) {
    var rect = el.getBoundingClientRect();
    // scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    // scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top, left: rect.left, height: rect.height}
}

function signIn() {
  var status = document.getElementById('login').style.display;
  if(status == '') {
    status = 'none';
  }

  if(status == 'none') {
    document.getElementById('login').style.display = 'block';
  } else {
    document.getElementById('login').style.display = 'none';
  }
}

function prettyprinttime(seconds) {
  seconds = Math.floor(seconds);
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
};

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

//update client with noteset from database
function pullNotes(snapshot) {
  var update = {};
  try {
    for(const key in snapshot.val()) {
      if(typeof app.notes[key] != 'undefined') {
        if(typeof app.notes[key].showmoreinfo == 'undefined') {
          app.notes[key].showmoreinfo = false;
          app.notes[key].active = false;
        }
      } else {
        app.notes[key] = {};
        app.notes[key].showmoreinfo = false;
        app.notes[key].active = false;
      }
      update[key] = {
        persist: snapshot.val()[key].persist,
        showmoreinfo: app.notes[key].showmoreinfo,
        active: app.notes[key].active
      };
    }
  } catch(err) {
    return app.notes;
  }
  return update;
}

$(document).ready(() => {

  $('a').on('click', function() {
    app.linkclicked = true;
  })

});

var checkMathJax = setInterval(function() {
  var previews = document.getElementsByClassName('MathJax_Preview');
  for(var i =0; i < previews.length; i++) {
    previews[i].style.display = 'none';
  }
  clearInterval(checkMathJax);
}, 3000);
