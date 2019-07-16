<?
  require_once __DIR__.'/vendor/autoload.php';

  $client = new Google_Client();
  $client->setApplicationName('API code samples');
  $client->setScopes([
      'https://www.googleapis.com/auth/youtube.force-ssl',
  ]);

  // TODO: For this request to work, you must replace
  //       "YOUR_CLIENT_SECRET_FILE.json" with a pointer to your
  //       client_secret.json file. For more information, see
  //       https://cloud.google.com/iam/docs/creating-managing-service-account-keys
  $client->setAuthConfig('client_secret.json');
  $client->setAccessType('offline');

  // Request authorization from the user.
  $authUrl = $client->createAuthUrl();
  printf("Open this link in your browser:\n%s\n", $authUrl);
  print('Enter verification code: ');
  $authCode = trim(fgets(STDIN));

  // Exchange authorization code for an access token.
  $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
  $client->setAccessToken($accessToken);

  // Get the authorized Guzzle HTTP client.
  $http = $client->authorize();
  $captionId = $_GET['captionId'];

  $fp = fopen($captionId . '.txt', 'w');


  $response = $http->request(
    'GET',
    '/youtube/v3/captions/'.$captionId
  );

  fwrite($fp, $response->getBody()->getContents());
  fclose($fp);

  return true;
