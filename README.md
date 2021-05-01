# RC-Upload-Metrics

Rocket.Chat App to get the metrics (using a provider) for Attachments

## Targetting

- slash command to get the statistics of an attachment
- short link for the add attachment (using yourls and bitly)
- "**add stats**" (or similar) which will execute after message is sent
- stats will be shown in a ui modal

**Make the app as much more useful it can be**

There is no need for supporting **_any_** kind of provider. Primarily support `yourls` and then `bitly`.

When **add stats** command will execute after in `postMessageSent`. It will take the url(s) of the attachment(s) and produce short link(s) for all of them.

Slash command will take in the entire url and get the stats for it.
