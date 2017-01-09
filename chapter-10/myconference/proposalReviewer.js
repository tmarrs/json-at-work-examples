'use strict';

var kafka = require('kafka-node');

const NEW_PROPOSALS_RECEIVED_TOPIC = 'new-proposals-recvd';
const PROPOSALS_REVIEWED_TOPIC = 'proposals-reviewed';

var consumerClient = new kafka.Client(),
  consumer = new kafka.Consumer(
    consumerClient, [{
      topic: NEW_PROPOSALS_RECEIVED_TOPIC
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
  processProposal(message);
});

function processProposal(proposal) {
  var proposalAccepted = decideOnProposal();
  var proposalMessage = JSON.stringify(proposal.value);

  console.log('proposalMessage = ' + proposalMessage);
  console.log('Decision - proposal has been [' +
    (proposalAccepted ? 'Accepted' : 'Rejected') + ']');

  if (proposalAccepted) {
    acceptProposal(proposalMessage);
  } else {
    rejectProposal(proposalMessage);
  }
}

function decideOnProposal() {
  return Math.random() >= 0.5;
}

function acceptProposal(proposalMessage) {
  // FIXME: Add JSON data for approval.
  publishMessage(proposalMessage);
  commitTopic(); // FIXME: Still needed?
}


function rejectProposal(proposalMessage) {
  // FIXME: Add JSON data for approval.
  publishMessage(proposalMessage);
  commitTopic(); // FIXME: Still needed?
}

function publishMessage(message) {
  var payloads = [{
    topic: PROPOSALS_REVIEWED_TOPIC,
    messages: message
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
