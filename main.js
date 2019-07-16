$(document).ready(() => {
  $('#note-taking').show();
  $('#multimedia').hide();
  $('#video-indexing').hide();
  $('#recommendation-engine').hide();
  $('#online-courses').hide();
  $('#community').hide();
  $('#integrated-ai').hide();

  var counter = 0;
  setInterval(function() {
      counter++;
      if (counter == 1) {
        $('#timestamped-notes').show(500);
        $('#integrated-ai').hide(500);
      }  else if (counter == 2) {
        $('#timestamped-notes').hide(500);
        $('#online-courses').show(500);
      }  else if (counter == 3) {
        $('#online-courses').hide(500);
        $('#community').show(500);
      }  else if (counter == 4) {
        $('#community').hide(500);
        $('#integrated-ai').show(500);
        counter = 0;
      }
  }, 4000);

  width = $(this).width();
  if (width < 900) {
    document.getElementById('about').style.display='none';
    document.getElementById('contact').style.display='none';
  }
  else {
    document.getElementById('about').style.display='block';
    document.getElementById('contact').style.display='block';
  }

  $('.dot').on('click', function(event){
    $('.dot').css('background-color', '#ffd152');
    event.currentTarget.style.backgroundColor = '#78b0a0';
  });


  $('.notes').on('click', function(){
    $('.dot').css('background-color', '#ffd152');
    $('.dot.notes').css('background-color', '#78b0a0');
    $('#note-taking').show();
    $('#multimedia').hide();
    $('#video-indexing').hide();
    $('#recommendation-engine').hide();
  });
  $('.embed').on('click', function(){
    $('.dot').css('background-color', '#ffd152');
    $('.dot.embed').css('background-color', '#78b0a0');
    $('#note-taking').hide();
    $('#multimedia').show();
    $('#video-indexing').hide();
    $('#recommendation-engine').hide();
  });
  $('.search').on('click', function(){
    $('.dot').css('background-color', '#ffd152');
    $('.dot.search').css('background-color', '#78b0a0');
    $('#note-taking').hide();
    $('#multimedia').hide();
    $('#video-indexing').show();
    $('#recommendation-engine').hide();
  });
  $('.recommend').on('click', function(){
    $('.dot').css('background-color', '#ffd152');
    $('.dot.recommend').css('background-color', '#78b0a0');
    $('#note-taking').hide();
    $('#multimedia').hide();
    $('#video-indexing').hide();
    $('#recommendation-engine').show();
  });
});

$(window).on("resize", function(event){
  width = $(this).width();
  if (width < 900) {
    document.getElementById('about').style.display='none';
    document.getElementById('contact').style.display='none';
  }
  else {
    document.getElementById('about').style.display='block';
    document.getElementById('contact').style.display='block';
  }
});
