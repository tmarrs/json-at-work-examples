'use strict';

var kafka = require('kafka-node');
var nodeMailer = require('nodemailer');
var handlebars = require('handlebars');
var util = require('util');

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

function notifySpeaker(notification) {
  var notificationMessage = createNotificationMessage(notification);

  sendEmail(notificationMessage);
}

// FIXME:
// Generate email body from incoming JSON message. Use handlebars.
function createNotificationMessage(notification) {
  console.log('Notification Message = ' + notification);
  return createMailOptions(notification);
}

function createMailOptions(notification) {
  var notificationAsObj = JSON.parse(notification);
  var proposal = notificationAsObj.proposal;

  var mailOptions = {
    from: EMAIL_FROM, // sender address 
    to: proposal.speaker.email, // list of receivers 
    subject: proposal.conference.name + ' - ' + proposal.session.title, // Subject line 
    html: createEmailBody(notification)
  };

  return mailOptions;
}

function createEmailBody(notification) {
  return '<b>Hi There</b>';
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
