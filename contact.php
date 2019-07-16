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

    <div class="jumbotron" style="min-height: 90vh;">
      <div class="line-graphics">
        <div class="line red"></div>
        <div class="line yellow" style="width: 40%;"></div>
      </div>
      <div class="content" style="width: 50%; margin: auto;">
        <h1>Reach Out</h1>
        <h3>We'd love to hear from you!</h3>
        <br />
        <div class="content-subtitles">
          <p class="subtitle">
            <a href="mailto:info@chimeraeditor.com">
             info@chimeraeditor.com
           </a>
          </p>
          <p class="subtitle">
            <a href="https://www.facebook.com/chimeraonlinelearning/" target="_blank">
             Facebook
           </a>
          </p>
        </div>
        <br />
        <br />

      </div>
      <div class="line-graphics">
        <div class="line blue" style="bottom: 30px;"></div>
        <div class="line orange" style="width: 70%; float: right; bottom: 30px;"></div>
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
