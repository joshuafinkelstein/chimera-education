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
    <title>Chimera | online learning</title>
    <link href='homepage-styles.css' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:400,700" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="57x57" href="/app/logos/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/app/logos/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/app/logos/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/app/logos/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/app/logos/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/app/logos/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/app/logos/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/app/logos/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/app/logos/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/app/logos/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/app/logos/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/app/logos/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/app/logos/favicon-16x16.png">
    <link rel="manifest" href="/app/logos/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/app/logos/ms-icon-144x144.png">
    <meta name="theme-color" content="#584b4f">
  </head>
  <body>
    <header>
      <a href="https://chimeraeditor.com">
        <img src="app/logos/star.png" style="height: 40px; width: 40px; padding: 10px;">
        <h3>Chimera</h3>
      </a>
      <div class="flex"></div>
      <nav>
        <a id="about" href="https://chimeraeditor.com/vision.php">
          About
        </a>

        <a id="contact" href="/contact.php">
          Contact
        </a>

        <a id="demo" href="https://chimeraeditor.com/app/editor/?v=5utybhhmpFk">
          Demo
        </a>

      </nav>
    </header>

    <div class="jumbotron">
      <div class="line-graphics">
        <div class="line red"></div>
        <div class="line yellow" style="width: 40%;"></div>
      </div>
      <div class="content">
        <h1>Chimera</h1>
        <h3>A learning platform that learns from you</h3>
        <br />
        <div class="content-subtitles">
          <p class="subtitle">
            <img src='homepage-images/baseline-art_track-24px.svg'> Timestamped Notes
          </p>
          <p class="subtitle">
            <img src="homepage-images/baseline-school-24px.svg"> Online Courses
          </p>
          <p class="subtitle">
            <img src="homepage-images/baseline-forum-24px.svg"> Community Forums
          </p>
          <p class="subtitle">
            <img src="homepage-images/baseline-assistant-24px.svg"> Integrated AI
          </p>
        </div>
        <br />
        <br />
        <h3 id="timestamped-notes">Make it easy to review material with timestamped notes</h3>
        <h3 id="online-courses">Access any video on YouTube including online courses</h3>
        <h3 id="community">Interact with other students</h3>
        <h3 id="integrated-ai">Recieve individualized assistance as you learn</h3>
      </div>
      <div class="line-graphics">
        <div class="line blue" style="bottom: 30px;"></div>
        <div class="line orange" style="width: 70%; float: right; bottom: 30px;"></div>
      </div>
    </div>

    <div>

    <div style="
    display: flex;
    /* margin: 10px auto; */
    /* min-width: 100vw; */
    /* width: 40%; */
"><a href="https://github.com/joshuafinkelstein/chimera-education" style="
    display: flex;
    margin: 10px auto;
    max-width: 100vw;
    width: 450px;
    min-width: 320px;
">
	<img src="https://cdn.pixabay.com/photo/2017/08/05/11/24/logo-2582757_960_720.png" style="
    width: 100px;
    height: 100px;
    padding: 10px;
">

<div style="
    margin: auto 0;
">
    <h3>For the people by the people</h3><h5 style="
    color: antiquewhite;
">Join our community on GitHub</h5><br>
<h5>Students | Educators | Software Developers</h5>
</div>
        </a>
</div>
</div>

    <div class="flex-container">
      <div class="flex-drawers">
        <div class="drawer notes">
          <a>Video Annotations</a>
        </div>
        <div class="drawer embed">
          <a>Search Inside Videos</a>
        </div>
        <div class="drawer search">
          <a>Inline Semantic Search</a>
        </div>
        <div class="drawer recommend">
          <a>Recommendation Engine</a>
        </div>
      </div>
      <div class="flex-main">
        <div class="main-content" id="note-taking">
          <h2>Video Annotations</h2>
          <p>
            We think by association. Our insights do not simply arise in isolation. There is always an underlying context. That is why when you take notes through Chimera, they are each timestamped to the video you’re watching.
            To review just click a note to jump directly to that timepoint in the video. As you view videos, Chimera keeps you focused on the bigger picture concepts with tools that allow you to delve deeper whenever something peaks your interest.
          </p>
          <p>
            Try out how it works with one of our demos!
          </p>
          <br>
          <a href="https://chimeraeditor.com/app/editor/?v=5utybhhmpFk">
            <button class="primary-button">DEMO</button>
          </a>
        </div>
        <div class="main-content" id="multimedia">
          <h2>Search Inside Videos</h2>
          <p>
            When you are searching for something, you want to find it quickly. Chimera leverages video annotations to search inside videos for the exact content that you want.  There is a ton of information out there and a lot of that information is locked inside videos. Crowdsourced video annotations provide a scalable method of indexing videos and binding descriptions to specific timepoints. There are plenty of videos to choose from. Chimera helps you find content that is relevant and concise.
          </p>
          <p>
            Think of it like Wikipedia for videos. Everyone can contribute to a set of annotations and ultimately, you will have access to a user-curated database of educational resources.
          </p>
          <p>
            This feature is in development and a beta version will be available September 2019.
          </p>
        </div>
        <div class="main-content" id="video-indexing">
          <h2>Inline Semantic Search</h2>
          <p>
            Chimera takes the concept of annotations a step further. Each annotation automatically becomes a search term and pulls in related content from other videos as well as additional resources. Search is powered by AI, but the key to the algorithm is you. Students are presented with a short list of possibly relevant resources and they choose what gets linked to the annotation. That choice helps improve future search results and, in this way, search gets iteratively better.
          </p>
          <p>
            Stay tuned for updates on the development of this feature.
          </p>
        </div>
        <div class="main-content" id="recommendation-engine">
          <h2>Recommendation Engine</h2>
          <p>
            Ultimately, Chimera will become your personal AI tutor. Suggested content will be presented based on your prior interaction with the platform and its understanding of what you are trying to learn. The tutor will decide when you might need to go more in-depth into a concept and when its ok to move quickly. As you progress, the tutor provides multiple routes keeping in mind your end goal.
          </p>
          <p>
            Chimera is using machine learning to map learning paths to provide customized curricula to each student. We understand that people rarely find themselves in an ideal position, so Chimera will be your guide that gets you from where you are to where you want to be.
          </p>
          <p>
            This feature is in development and requires a threshold of users to get it up and running.
          </p>
        </div>

        <div class="toggle-dots">
          <div class="dot notes" style="background-color: #78b0a0;"></div>
          <div class="dot embed"></div>
          <div class="dot search"></div>
          <div class="dot recommend"></div>
        </div>

      </div>
      <div class="flex-additional">
        <h3>About</h3>
        <hr>
        <h5>
          <a href="https://chimeraeditor.com/vision.php">
            Our Vision
          </a>
        </h5>
        <h5>Contact: <a href="mailto:info@chimeraeditor.com">info@chimeraeditor.com</a></h5>
        <h5><a href="https://chimeraeditor.com/privacy/Privacy%20Notice.pdf">Privacy Policy</a></h5>
        <p>
          <i>Chimera Video Annotation Software is developed by Joshua Finkelstein and Nikolas Baya in Cambridge, MA. If you are interested in contributing to the project, please do not hesitate to reach out.</i>
        </p>
      </div>
    </div>

    <div class="footer">
      <span>Chimera Video Annotation Software &copy 2019</span><div class="flex"></div><span>info@chimeraeditor.com</span>
    </div>

    <script
    src="https://code.jquery.com/jquery-3.2.1.min.js"
    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>

    <script src="main.js"></script>

  </body>
</html>
