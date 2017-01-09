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
  var proposalMessage = proposal.value;
  //var proposalMessage = JSON.stringify(proposal.value);

  console.log('\n\n');
  //console.log('rawProposalMessage = ' + rawProposalMessage);
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
  var acceptedProposal = {
    decision: {
      accepted: true,
      timeSlot: {
        date: "2017-11-06",
        time: "10:00"
      }
    },
    proposal: proposalMessage
  };

  var acceptedProposalMessage = JSON.stringify(acceptedProposal);
  console.log('Accepted Proposal = ' + acceptedProposalMessage);
  publishMessage(acceptedProposalMessage);
}


function rejectProposal(proposalMessage) {
  var rejectedProposal = {
    decision: {
      accepted: false
    },
    proposal: proposalMessage
  };

  var rejectedProposalMessage = JSON.stringify(rejectedProposal);
  console.log('Rejected Proposal = ' + rejectedProposalMessage);
  publishMessage(rejectedProposalMessage);
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

consumer.on('error', function(err) {
  console.log(err);
});

producer.on('error', function(err) {
  console.log(err);
});
