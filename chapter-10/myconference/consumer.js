var kafka = require('kafka-node');


var client = new kafka.Client(),
  consumer = new kafka.Consumer(
    client, [{
      topic: 'new-topics-recvd'
    }], {
      autoCommit: false
    }
  );

consumer.on('message', function(message) {
  console.log("received message", message);
});
