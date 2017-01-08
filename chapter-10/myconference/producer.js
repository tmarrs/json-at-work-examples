'use strict'

var kafka = require('kafka-node'),
  Producer = kafka.Producer,
  KeyedMessage = kafka.KeyedMessage,
  client = new kafka.Client(),
  producer = new Producer(client),
  km = new KeyedMessage('key', 'message'),
  payloads = [{
    topic: 'new-proposals-recvd',
    messages: '"message": "Next message - From Node - Really Works!!"}'
  }];

producer.on('ready', function() {
  producer.send(payloads, function(err, data) {
    console.log(data);
  });
});

producer.on('error', function(err) {
  console.log(err);
});
