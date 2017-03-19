'use strict';

console.log('Hello JSON at Work!');

$(document).ready(function() {

  function addSpeakersjQuery(speakers) {
    $.each(speakers, function(index, speaker) {
      var tbody = $('#speakers-tbody');
      var tr = $('<tr></tr>');
      var nameCol = $('<td></td>');
      var aboutCol = $('<td></td>');
      var topicsCol = $('<td></td>');

      nameCol.text(speaker.firstName + ' ' + speaker.lastName);
      aboutCol.text(speaker.about);
      topicsCol.text(speaker.tags.join(', '));

      tr.append(nameCol);
      tr.append(aboutCol);
      tr.append(topicsCol);
      tbody.append(tr);
    });
  }

  $.getJSON('data/speakers.json',
    function(data) {
      addSpeakersjQuery(data.speakers);
    }
  );

});
