'use strict';

var kafka = require('kafka-node');
var nodeMailer = require('nodemailer');

const PROPOSALS_REVIEWED_TOPIC = 'proposals-reviewed';
const MAILCATCHER_SMTP_HOST = 'localhost';
const MAILCATCHER_SMTP_PORT = 1025;

var consumerClient = new kafka.Client(),
  consumer = new kafka.Consumer(
    consumerClient, [{
      topic: PROPOSALS_REVIEWED_TOPIC
    }], {
      autoCommit: true
    }
  );

var mailCatcherSmtpConfig = {
  host: MAILCATCHER_SMTP_HOST,
  port: MAILCATCHER_SMTP_PORT,
};

var transporter = nodeMailer.createTransport(mailCatcherSmtpConfig);

consumer.on('message', function(message) {
  console.log('received message', message);
  sendEmail();
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

consumer.on('error', function(err) {
  console.log(err);
});
