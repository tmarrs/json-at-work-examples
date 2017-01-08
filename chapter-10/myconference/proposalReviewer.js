'use strict';

var kafka = require('kafka-node');

// FIXME: Add constant for Consumer Topic name.
var consumerClient = new kafka.Client(),
  consumer = new kafka.Consumer(
    consumerClient, [{
      topic: 'new-proposals-recvd'
    }], {
      autoCommit: true
    }
  );

var producerClient = new kafka.Client(),
  producer = new kafka.Producer(producerClient);

// Use incoming JSON message.
// Use JSON.parse() and JSON.stringify() to process JSON.
consumer.on('message', function(message) {
  console.log('received message', message);
  publishMessage();
  commitTopic();
});

// FIXME: processProposal() calls the methods below.
// FIXME: Need higher-level methods called sendApproval() and sendRejection()
// FIXME: Choose to accept/reject randomly: http://stackoverflow.com/questions/36756331/js-generate-random-boolean
//  var acceptProposal = Math.random() >= 0.5; // Wrap with a function.

// FIXME: Remove hardcoding.
//    Message should be a parameter.
// FIXME: Add constant for Producer Topic name. 
function publishMessage() {
  var payloads = [{
    topic: 'proposals-reviewed',
    messages: '"message": "Proposal has been reviewed"}'
  }];

  producer.send(payloads, function(err, data) {
    console.log(data);
  });
}

// FIXME: Do we still need this if we set autoCommit to true?
function commitTopic() {
  consumer.commit(function(err, data) {
    if (err) {
      console.log('error committing message', err);
    } else {
      console.log('committed message', data);
    }
  });
}

consumer.on('error', function(err) {
  console.log(err);
});

producer.on('error', function(err) {
  console.log(err);
});
