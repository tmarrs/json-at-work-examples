'use strict';

var kafka = require('kafka-node');
var nodeMailer = require('nodemailer');
var handlebars = require('handlebars');

const PROPOSALS_REVIEWED_TOPIC = 'proposals-reviewed';
const MAILCATCHER_SMTP_HOST = 'localhost';
const MAILCATCHER_SMTP_PORT = 1025;
const EMAIL_FROM = '"My Conference" <proposals@myconference.com>';


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

  notifySpeaker(message.value);
});

function notifySpeaker(message) {
  var notificationMessage = createNotificationMessage(message);

  sendEmail(notificationMessage);
}

// FIXME: Remove hardcoding.
// Pull the "to" from the incoming JSON message from the topic.
// Generate the "subject" from the incoming JSON message from the topic. Accepted/Rejected.
// Generate email body from incoming JSON message. Use handlebars. Fix up HTML message. Use core HTML 
// template: http://www.w3schools.com/html/html5_intro.asp
// Use JSON.parse() and JSON.stringify() to process JSON.
function createNotificationMessage(message) {
  console.log('Notification Message: ' + message);
  return createMailOptions(message);
}

function createMailOptions(message) {
  var messageAsObj = JSON.parse(message);
  var mailOptions = {
    from: EMAIL_FROM, // sender address 
    to: 'fred.smith@acme.com', // list of receivers 
    subject: 'Hello', // Subject line 
    html: '<b>' + message + '</b>' // html body 
  };

  return mailOptions;
}

function sendEmail(mailOptions) {
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
