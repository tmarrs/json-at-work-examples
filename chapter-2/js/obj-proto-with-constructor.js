'use strict';

function Speaker(firstName, lastName, email, about, company, registered) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.about = about;
  this.company = company;
  this.registered = registered;
  this.tags = [];
}

Speaker.prototype = {
  name: function () {
    return (this.firstName + ' ' + this.lastName);
  }
};