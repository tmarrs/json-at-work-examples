'use strict';

var kafka = require('kafka-node');
var fs = require('fs');
var Ajv = require('ajv');

const NEW_PROPOSALS_RECEIVED_TOPIC = 'new-proposals-recvd';
const PROPOSALS_REVIEWED_TOPIC = 'proposals-reviewed';
const SPEAKER_PROPOSAL_SCHEMA_FILE_NAME =
  './schemas/speakerProposalSchema.json';

var consumer = new kafka.ConsumerGroup({
  fromOffset: 'latest',
  autoCommit: true
}, NEW_PROPOSALS_RECEIVED_TOPIC);

var producerClient = new kafka.Client(),
  producer = new kafka.HighLevelProducer(producerClient);

// Use incoming JSON message.
// Use JSON.parse() and JSON.stringify() to process JSON.
consumer.on('message', function(message) {
  console.log('received kafka message', message);
  processProposal(message);
});

process.on('SIGINT', function() {
  console.log(
    'SIGINT received - Proposal Reviewer closing. Committing current offset on Topic: ' +
    NEW_PROPOSALS_RECEIVED_TOPIC + ' ...'
  );

  consumer.close(true, function() {
    console.log(
      'Finished committing current offset. Exiting with graceful shutdown ...'
    );

    process.exit();
  });
});

function processProposal(proposal) {
  var proposalAccepted = decideOnProposal();
  var proposalMessage = proposal.value;
  var proposalMessageObj = JSON.parse(proposalMessage);

  console.log('\n\n');
  console.log('proposalMessage = ' + proposalMessage);
  console.log('proposalMessageObj = ' + proposalMessageObj);
  console.log('Decision - proposal has been [' +
    (proposalAccepted ? 'Accepted' : 'Rejected') + ']');

  if (isSpeakerProposalValid(proposalMessageObj) && proposalAccepted) {
    acceptProposal(proposalMessageObj);
  } else {
    rejectProposal(proposalMessageObj);
  }
}

function isSpeakerProposalValid(proposalMessage) {
  var ajv = Ajv({
    allErrors: true
  });

  var speakerProposalSchemaContent = fs.readFileSync(
    SPEAKER_PROPOSAL_SCHEMA_FILE_NAME);

  var valid = ajv.validate(speakerProposalSchemaContent, proposalMessage);

  if (valid) {
    console.log('\n\nJSON Validation: Speaker proposal is valid');
  } else {
    console.log('\n\nJSON Validation: Error - Speaker proposal is invalid');
    console.log(ajv.errors + '\n');
  }

  return valid;
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
