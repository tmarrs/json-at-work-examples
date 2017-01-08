'use strict';

var kafka = require('kafka-node');
var nodeMailer = require('nodemailer');

// FIXME: Add constant for Topic name.
var consumerClient = new kafka.Client(),
  consumer = new kafka.Consumer(
    consumerClient, [{
      topic: 'proposals-reviewed'
    }], {
      autoCommit: true
    }
  );

var producerClient = new kafka.Client(),
  producer = new kafka.Producer(producerClient);

// FIXME: Add constants for SMTP.
var smtpConfig = {
  host: 'localhost',
  port: 1025,
};

var transporter = nodeMailer.createTransport(smtpConfig);

consumer.on('message', function(message) {
  console.log('received message', message);
  sendEmail();
  commitTopic();
});

// FIXME: Remove hardcoding.
// Use constant for the "from".
// Pull the "to" from the incoming JSON message from the topic.
// Generate the "subject" from the incoming JSON message from the topic. Accepted/Rejected.
// Generate email body from incoming JSON message. Use handlebars. Fix up HTML message. Use core HTML 
// template: http://www.w3schools.com/html/html5_intro.asp
// Use JSON.parse() and JSON.stringify() to process JSON.
function sendEmail() {
  var mailOptions = {
    from: '"My Conference" <proposals@myconference.com>', // sender address 
    to: 'fred.smith@acme.com', // list of receivers 
    subject: 'Hello', // Subject line 
    html: '<b>Hello world</b>' // html body 
  };

  // send mail with defined transport object 
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email Message sent: ' + info.response);
    }
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
