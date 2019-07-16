<?php
  $json = $_GET['jsonTxt'];

  $fp = fopen('playlists.json', 'w');

  fwrite($fp, $json);
  fclose($fp);
