//get properties from url
function gup( name, url ) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}

let approveButton = document.getElementById('approve-button');

var new_url = null;
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
  var url = tabs[0].url;
  var v = gup('v', url);
  var t = gup('t', url);

  // on YouTube
  if(v != null) {
    if(t != null) {
      new_url = 'https://chimeraeditor.com/app/editor?v=' + v + '&t=' + t.substring(0, t.length-1);
    } else {
      new_url = 'https://chimeraeditor.com/app/editor?v=' + v;
    }
    console.log(new_url);
    document.getElementById('chimera-link').innerHTML = "<a href='"+new_url+"'>"+new_url+'</a>';
    approveButton.classList.remove('disabled');
  } else {
    // check for iframe embed
    try {
      var iframeSrc = document.getElementsByTagName('iframe')[0].src;
      if(iframeSrc.substring(0, 30) == 'https://www.youtube.com/embed/') {
        v = iframeSrc.substring(30,41);
        new_url = 'https://chimeraeditor.com/app/editor?v=' + v;
        approveButton.classList.remove('disabled');
      }
    } catch(err) {
      // no iframe element on page
      console.log(err);
    }
  }
});

//open video in Chimera
approveButton.onclick = function() {
  window.open(new_url, '_blank');
}

let denyButton = document.getElementById('deny-button');
//close popup
denyButton.onclick = function() {
  window.close();
}
