const webpush = require('web-push');

let vapidKeys = {
  publicKey:
    'BPB-OyPNaWUA2mNTPNnyfFPjKTH63hfq29Pq3_Sy1ecNCCxnw90DrvII0c2SVqbgNG3kv_p5IA3SPTryjQrNDWg',
  privateKey: 'FRpFBTIJFTgy2E0e93PjY1uRTttTa7fYuM-iiJNnnTA'
};

webpush.setVapidDetails('mailto: test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey);

let sub = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/dRwkKSNh53c:APA91bFVAM0rRZIt_aJLb3ULrZNTw52pFH4sx1Y_VC4ha3SJxYtgXxFzc3P3D4V46O5V18IDSK7B0w5i7e5wiZnrte6EpxBqYROxVWS09-ojMaDlc-s8rrARLkDf7_3_kfpDrInv2PGK",
  "expirationTime": null,
  "keys": {
    "p256dh": "BDKpIbSF9vxESanIhqGSYv87oDMf4CrS6T7b6RKjgIj9eL6fN6PAVOhpCb76f6LcX8Ui_GZhf7txnbUS46eqfOY",
    "auth": "mOK7cr0wPFFR64Rcyzy_iw"
  }
};

webpush.sendNotification(sub, 'Test message');

