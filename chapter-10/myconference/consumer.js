var kafka = require('kafka-node');


var client = new kafka.Client(),
  consumer = new kafka.Consumer(
    client, [{
      topic: 'new-proposals-recvd'
    }], {
      autoCommit: false
    }
  );

consumer.on('message', function(message) {
  console.log("received message", message);
});


consumer.on('error', function(err) {
  console.log(err);
});
