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
    <link href='homepage-styles.css' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans|Open+Sans" rel="stylesheet">
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

    <div style="background-color: #343233;">
    <div style="
    max-width: 920px;
    padding: 30px 10px;
    margin: 0 auto;
    color: #efeae1;
    font-family: 'Noto Sans', sans-serif;
    font-size: 18px;
    word-break: break-word;
    text-align: center;
    min-height: 90vh;">

<h1>&mdash; Our Mission &mdash;</h1>

<p style="text-align: left;">
  To compile educational content into an accessible knowledge base of learning modules and offer high quality lessons at no charge to anyone in the world.
</p>

<br>

<h1>About the Project</h1>

<p style="text-align: left;">
  Chimera Video Annotation Software is founded on a core belief in the value of open-access educational content and its transformative impact on education systems. Resources such as Khan Academy, MIT OpenCourseware and EdX as well as a plethora of smaller organizations now provide courses and short lessons to anyone that wants to access them. The next critical step is to scale this evolving network of resources into a searchable database. Chimera uses transcripts and crowdsourced annotations to index educational videos to facilitate timepoint-specific information retrieval. Essentially, we are coupling existing content with a wiki style collaborative annotation editor to support the needs of students. At the same time, Chimera observes how students learn and bridges the gap between concepts to provide individualized learning tracks. We are inspired by what students can accomplish when they are in a supporting environment and we are driven to develop a learning environment that anyone can be a part of.
</p>

<p style="text-align: left;">
  Find out more about the project and the features we are developing. We are always willing to talk. You can reach out on the Facebook page or by sending us an email.
</p>

<a href="https://www.facebook.com/chimeraonlinelearning/">Facebook Page</a>
<br>
<a href="mailto:info@chimeraeditor.com">info@chimeraeditor.com</a>
<p>
  <i>Chimera is developed by Joshua Finkelstein and Nikolas Baya.</i>
</p>
</div>
</div>

    <div class="footer">
        <span>Chimera Video Note Editor &copy 2019</span><div class="flex"></div><span>info@chimeraeditor.com</span>
    </div>

    <script
    src="https://code.jquery.com/jquery-3.2.1.min.js"
    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>

    <script src="main.js"></script>

  </body>
</html>
