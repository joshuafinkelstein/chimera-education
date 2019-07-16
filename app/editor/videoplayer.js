//IFRAME API PLAYER
//functions associated with calls to the YouTube iframe api

// 2. This code loads the IFrame Player API code asynchronously.
elapsedTime = 0; //global
linkclicked = false;
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoID,
    playerVars: {
          'autoplay' : 0,
          'rel' : 0,
          'showinfo' : 1,
          'egm' : 0,
          'showsearch' : 0,
          'controls' : 1,
          'modestbranding' : 1,
          'enablejsapi' : 1
        },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

  var video_data = player.getVideoData();
  // videoID = video_data['video_id'];
  if(app.videometa.title =='Untitled Video') {
    app.videometa.title = video_data['title'];
  }
  app.videometa.videoId = videoID;
  // console.log(video_data);

}

//position on document
function offset(el) {
    var rect = el.getBoundingClientRect();
    // scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    // scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top, left: rect.left, height: rect.height}
}

// console.log('javascript loaded');
//track time
var current_highlight = null;
var track_video = true;
setInterval(function() {
  try { //won't work before player loads
    elapsedTime = Math.floor(player.getCurrentTime());
    if (Math.floor(elapsedTime/60) >= 10) {
      if (elapsedTime % 60 >= 10) {
        prettyPrintTime = Math.floor(elapsedTime/60)+':'+elapsedTime%60;
      }
      else {
        prettyPrintTime = Math.floor(elapsedTime/60)+':0'+elapsedTime%60;
      }
    }
    else {
      if (elapsedTime % 60 >= 10) {
        prettyPrintTime = '0'+Math.floor(elapsedTime/60)+':'+elapsedTime%60;
      }
      else {
        prettyPrintTime = '0'+Math.floor(elapsedTime/60)+':0'+elapsedTime%60;
      }
    }

    // var array_of_elements = document.getElementsByClassName('note');
    // var element = '';
    // for(var i = 0; i < array_of_elements.length; i++) {
    //   element = array_of_elements[i];
    //   if(element.id == elapsedTime && track_video == true) {
    //     current_highlight = element;
    //     track_video = false;
    //     var paper_offset = offset(document.getElementById('whole-paper'));
    //     var paper_scroll = document.getElementById('whole-paper').scrollTop;
    //     var highlight_offset = offset(current_highlight);
    //     // console.log('note is at '+highlight_offset.top);
    //     // console.log('paper is at '+paper_offset.top);
    //     // console.log('scroll at '+paper_scroll);
    //     $('#whole-paper').scrollTop(paper_scroll+highlight_offset.top - paper_offset.top, 'slow');
    //   }
    //
    //   element.style.boxShadow = 'none';
    //   element.style.padding = '3px';
    // }
    //
    // if(track_video == false && current_highlight.id != elapsedTime) {
    //   track_video = true;
    // }
    //
    // current_highlight.style.boxShadow = '0 0 10px black';
    // current_highlight.style.padding = '5px';
  }
  catch(err) {
    // console.log(err.message);
  }
  }, 1000);

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1)
function onPlayerStateChange(event) {
  // if (event.data == YT.PlayerState.PLAYING) {
  //   ajaxRequest('php_functions/SQL/INSERT.php', {table: 'userbehavior', videoID: videoID, userID: userID, type: 'play', description: elapsedTime});
  // } else if (event.data == YT.PlayerState.ENDED) {
  //   ajaxRequest('php_functions/SQL/INSERT.php', {table: 'userbehavior', videoID: videoID, userID: userID, type: 'ended', description: null});
  // } else if (event.data == YT.PlayerState.PAUSED) {
  //   ajaxRequest('php_functions/SQL/INSERT.php', {table: 'userbehavior', videoID: videoID, userID: userID, type: 'paused', description: elapsedTime});
  //
  // }
}

function stopVideo() {
  player.stopVideo();
}

//jump to time
function timeJump(timepoint) {
   // ajaxRequest('php_functions/SQL/INSERT.php', {table: 'userbehavior', videoID: videoID, userID: userID, type: 'timejump', description: elapsedTime});
   if(timepoint != null) {
      player.seekTo(timepoint,true);
   }
   // console.log(app.linkclicked);
   if(app.linkclicked == true) {
     player.pauseVideo();
     app.linkclicked = false;
   } else {
     player.playVideo();
   }
   return true;
};

function getvideoID() {
  return player.getVideoData()['video_id'];
};

function setVideo(videoID) {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  $('.loading-background').show();
  $('#main').show();
  $('#library').hide();

  //cue video but do not autostart
  player.cueVideoById(videoID);


  //create/view annotations for new video
  window.location.href = 'https://chimeraeditor.com/test?videoID='+videoID;
};

function retrieveCurrenttime() {
  try {
    return player.getCurrentTime();
  } catch(err) {
    return 0;
  }
};
