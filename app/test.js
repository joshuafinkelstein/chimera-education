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

//get properties from url
function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

// ------------- AJAX request ----------------
//transfer data from javascript object to php
function ajaxRequest(path, data, eventID = null) {
  path += '?';
  var i = 0;
  for (var property in data) {
    if (i == 0) {
      path += property + '=' + data[property];
    } else {
      path += '&' + property + '=' + data[property];
    }
    i += 1;
  }

  var output;
  if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
  } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // console.log("processing AJAX request: GET " + path);
  //send POST request
  xmlhttp.open("GET", path, true);
  // xmlhttp.setRequestHeader("Origin", "https://chimeraeditor.com");
  xmlhttp.send();
  //update history
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(eventID != null) {
          document.dispatchEvent(new CustomEvent(eventID, {detail: this.response}));
        }
        return this.response;
      } else {
          return false;
      }
  };
};

//time delay on open tab
var delay_open = 600;
var interval = null;

//handle links
var seconds = 0;
var list_of_links = document.querySelectorAll("div[data-type='link']");
console.log(list_of_links);
for(var i = 0; i < list_of_links.length; i++) {
  var element = list_of_links[i]; //an element of this type

  //timepoint
  seconds = element.id;
  var time = prettyprinttime(seconds);
  var div_time = "<div class='time'>" + time + "</div>";

  //construct element
  var url = element.innerHTML;
  var resource = element.dataset.source;
  var html;
  element.classList.add('tab-container'); //subclass of tab-container

  element.addEventListener('click', function(event) {
    timeJump(event.currentTarget.id);
  });

  if(resource == "Wikipedia") {

    //event listeners for this class of notes
    element.addEventListener('mouseenter', function(event) {
      var infoboxes = document.getElementsByClassName('tab-more-info');
      for(var i = 0; i < infoboxes.length; i++) {
        infoboxes[i].style.display = 'none';
      }

      delay_open = 0;
      if(interval != null) {
        clearInterval(interval);
      }
      interval = setInterval(function() {
        delay_open += 100;
        if(delay_open == 500) {
          event.target.getElementsByClassName('tab-more-info')[0].style.display = 'block';
          clearInterval(interval);
          delay_open = 600;
        }
      }, 100);

    });
    element.addEventListener('mouseleave', function(event) {
      delay_open = 600;
      try {
        event.target.getElementsByClassName('tab-more-info')[0].style.display = 'none';
      } catch(err) {
        //do nothing
      }
    });


    html = div_time;
    html += "<div class='contents'>";
    html += "<div class='tab-handle'>";
    if(element.dataset.image == null) {
      html += "<img src='images/225px-Wikipedia-logo-v2.png'>";
    } else {
      html += "<img src='"+element.dataset.image+"'>";
    }
    html += "<div class='note-header'><b>" + element.dataset.title + "</b></div>";
    html += "<br><a href='"+url+"' target='_blank'>"+"Wikipedia Page"+"</a>";
    html += "</div>";
    html += "<div class='tab-more-info'>";// + element.dataset.description;
    html += "</div>";
    html += "</div>";
  } else {
    //other than Wikipedia
    html = div_time;
    html += "<div class='contents'>";
    html += "<div class='tab-handle'>";
    if(element.dataset.image != null) {
      html += "<img src='"+element.dataset.image+"'>";
    }
    html += "<div class='note-header'><b>" + element.dataset.title + "</b></div>";
    html += "<br><a href='"+url+"' target='_blank'>"+"External Link"+"</a>";
    html += "</div>";
    if(element.dataset.description != null) {
      html += "<div class='tab-more-info'>" + element.dataset.description;
      html += "</div>";
    }
    html += "</div>";
  }

  element.innerHTML = html;

  // ---------- Wikipedia API ---------------
  if(resource == "Wikipedia") {

    document.addEventListener('retrieveExtract_'+element.id, function(event) {
        var extract = JSON.parse(event.detail).query.pages;
        for (var prop in extract) {
          extract = extract[prop].extract.substring(0,400) + '...';
          break;
        }
        document.getElementById(event.type.split('_')[1]).getElementsByClassName('contents')[0].getElementsByClassName('tab-more-info')[0].innerHTML = extract;
    });

    var searchTerm = element.getElementsByClassName('contents')[0].getElementsByTagName('a')[0].pathname.split('/')[2].replace('_', '%20');
    ajaxRequest('https://en.wikipedia.org/w/api.php', {action:"query", prop:"extracts", exintro:"", explaintext:"", redirects:1, titles: searchTerm, format:"json", origin: '*'}, eventID = "retrieveExtract_"+element.id);
  }
}

//handle links
var seconds = 0;
var list_of_videos = document.querySelectorAll("div[data-type='youtube']");
console.log(list_of_videos);
for(var i = 0; i < list_of_videos.length; i++) {
  var element = list_of_videos[i]; //an element of this type

  //timepoint
  seconds = element.id;
  var time = prettyprinttime(seconds);
  var div_time = "<div class='time'>" + time + "</div>";

  //construct element
  var url = element.innerHTML;
  var resource = element.dataset.source;
  var html;
  element.classList.add('tab-container'); //subclass of tab-container

  element.addEventListener('click', function(event) {
    timeJump(event.currentTarget.id);
  });

  if(resource == "YouTube") {

    //event listeners for this class of notes
    element.addEventListener('mouseenter', function(event) {
      var infoboxes = document.getElementsByClassName('tab-more-info');
      for(var i = 0; i < infoboxes.length; i++) {
        infoboxes[i].style.display = 'none';
      }

      delay_open = 0;
      if(interval != null) {
        clearInterval(interval);
      }
      interval = setInterval(function() {
        delay_open += 100;
        if(delay_open == 500) {
          try {
            event.target.getElementsByClassName('tab-more-info')[0].style.display = 'block';
          } catch(err) {
            //do nothing
          }
          clearInterval(interval);
          delay_open = 600;
        }
      }, 100);

    });
    element.addEventListener('mouseleave', function(event) {
      delay_open = 600;
      try {
        event.target.getElementsByClassName('tab-more-info')[0].style.display = 'none';
      } catch(err) {
        //do nothing
      }
    });


    html = div_time;
    html += "<div class='contents'>";
    html += "<div class='tab-handle'>";
    html += "<a href='"+url+"' target='_blank'><img src='"+element.dataset.image+"'>";
    html += "<img class='playVideo' src='images/baseline_play_circle_outline_black_18dp.png'></a>";
    html += "<div class='note-header'><b>" + element.dataset.title + "</b><br></div>";
    // html += "<br><a href='"+url+"' target='_blank'>"+"YouTube Video"+"</a><br><br>";
    html += "</div>";
    if(element.dataset.description != null) {
      html += "<div class='tab-more-info'>" + element.dataset.description;
      html += "</div>";
    }
    html += "</div>";
  }

  element.innerHTML = html;
}

// ----------- blank lines -------------------
var seconds = 0;
var blank_lines = document.querySelectorAll("div[data-type='blank']");
for(var i = 0; i < blank_lines.length; i++) {
  var element = blank_lines[i]; //an element of this type

  //timepoint
  var div_time = "<div class='time'>" + "</div>";

  //construct element
  var html;

  html = div_time;
  html += "<div class='contents'>";
  html += "</div>";

  element.innerHTML = html;
}

// ---------- text notes (w/ headers) -----------------------
var seconds = 0;
var text_notes = document.querySelectorAll("div[data-type='text']");
for(var i = 0; i < text_notes.length; i++) {
  var element = text_notes[i]; //an element of this type

  element.addEventListener('click', function(event) {
    timeJump(event.currentTarget.id);
  });

  //timepoint
  seconds = element.id;
  var time = prettyprinttime(seconds);
  var div_time = "<div class='time'>" + time + "</div>";

  //construct element
  var html;

  html = div_time;
  html += "<div class='contents'>";
  if(element.dataset.title != null) {
    html += "<div class='note-header'><b>"+element.dataset.title+"</b><br></div>";
  }
  html += element.innerHTML;
  html += "</div>";

  element.innerHTML = html;
}


// // ------------ search Wikipedia ------------------
// document.addEventListener('searchWiki', function(event) {
//   var searchTerm = JSON.parse(event.detail).query.search[0].title;
//   ajaxRequest('https://en.wikipedia.org/w/api.php', {action:"query", prop:"extracts", exintro:"", explaintext:"", redirects:1, titles: searchTerm.replace(' ', '%20'), format:"json", origin: '*'}, eventID = "displayAdditionalInfo");
// });
//
// // ------------ retrieve extract from Wikipedia article -------------
// document.addEventListener('displayAdditionalInfo', function(event) {
//   var extract = JSON.parse(event.detail).query.pages;
//   for (var prop in extract) {
//     extract = extract[prop].extract.substring(0,400) + '...';
//     break;
//   }
//   console.log(extract);
//   $('#wiki').html(extract);
// });



$(document).ready(() => {



  $('a').on('click', function() {
    linkclicked = true;
  })

});

var checkMathJax = setInterval(function() {
  var previews = document.getElementsByClassName('MathJax_Preview');
  for(var i =0; i < previews.length; i++) {
    previews[i].style.display = 'none';
  }
  clearInterval(checkMathJax);
}, 2000);
