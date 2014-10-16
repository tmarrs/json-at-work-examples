'use strict';

function Speaker(firstName, lastName, email, company, about, registered) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.company = company;
  this.about = about;
  this.registered = registered || false;
  this.tags = [];
}

Speaker.prototype = {
    fullName: function () {
        return (this.firstName + ' ' + this.lastName);
    },

    printFullName: function() {
      console.log('My name is ' + this.fullName());
    }
};


var speaker1 = new Speaker('Larson', 'Richard', 'larsonrichard@ecratic.com',
                          'Ecratic');

speaker1.tags = ['json', 'rest', 'api', 'oauth'];
speaker1.about = 'Incididunt mollit cupidatat magna excepteur do tempor ex non ...';


var speaker2 = new Speaker('Ester', 'Clements', 'sterclements@acusage.com"',
                          'Acusage');

speaker2.tags = ['ruby', 'gems', 'api', 'web'];
speaker2.about = 'Labore tempor irure adipisicing consectetur velit. Ipsum ...';

console.log(speaker1 instanceof Speaker); // true
console.log(speaker2 instanceof Speaker); // true