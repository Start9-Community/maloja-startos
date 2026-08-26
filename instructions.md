# Maloja

## Documentation

- [Maloja README](https://github.com/krateng/maloja#readme) — the upstream project overview, the list of supported scrobble clients, and the settings reference.

## What you get on StartOS

A web interface serving your listening charts, statistics, and admin panel, plus the API
that scrobble clients post plays to. Everything Maloja records — scrobbles, artist
associations, custom artwork, scrobble rules — lives on your server's storage and is
included in StartOS backups.

Your admin password is generated for you rather than chosen during Maloja's own setup
wizard, and is re-applied every time the service starts.

## Getting set up

1. Run the **Set Admin Password** action. You will be prompted for this as a required task
   before the service will start. Copy the password it shows you — it is displayed once.
2. Open the web interface and sign in with the username `admin` and that password.
3. Point a scrobble client at your Maloja address to start recording plays. In the web
   interface, turn on admin mode and open the **API Keys** page to create a key for the
   client; the upstream README lists which clients are supported and how each is configured.

## Using Maloja

### Web interface

Your charts, statistics, and admin settings all live here. Turning on admin mode adds the
pages for editing artist associations, uploading custom images, managing scrobble rules,
and exporting your data.

### Actions

- **Set Admin Password** — generates a new random password and displays it. Run it any time
  to rotate. Your API keys are not affected.
- **Import Scrobbles** — brings your history over from another Maloja instance. On that
  other instance, use its admin panel's **Export** button, open the downloaded
  `maloja_export_*.json` in a text editor, and copy all of it. Then stop this service, run
  the action, paste the contents in, and start the service again. Existing scrobbles are not
  duplicated, so it is safe to run twice.
- **Wipe Scrobble Database** — permanently deletes every scrobble, track, artist, and album.
  This cannot be undone. Your admin password, API keys, scrobble rules, and custom images
  are left alone. Export your data from Maloja's admin panel first if you might want it
  back.

### Connecting a scrobble client that runs elsewhere

A client running on another machine — a script, a phone app, a scrobbler in its own Docker
container — may refuse to connect even with the right address and a valid API key, because
it does not recognise the certificate your server presents. Browsers ask you whether to
trust it; most other HTTP clients simply give up.

To fix it, give that client your server's certificate:

1. Download it: `curl -k -o startos-ca.crt "https://<your-server-address>/static/local-root-ca.crt"`
2. Add it to the client's own trust store. If the client runs in a container, the
   certificate has to go **inside** that container — trusting it on the host does not reach
   in. A Node-based client, for example, needs the file mounted in and
   `NODE_EXTRA_CA_CERTS` pointed at it.
3. Use the `https://` address.

A scrobble client installed as a StartOS service needs none of this — it reaches Maloja
directly, with no certificate in the way.
