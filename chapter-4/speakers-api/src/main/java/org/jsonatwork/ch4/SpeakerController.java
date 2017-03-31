package org.jsonatwork.ch4;

import java.util.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

@RestController
public class SpeakerController {

    private static Speaker speakers[] = {
      new Speaker(1, 39, "Larson Richard", new String[] {"JavaScript", "AngularJS", "Yeoman"}, true),
      new Speaker(2, 29, "Ester Clements", new String[] {"REST", "Ruby on Rails", "APIs"}, true),
      new Speaker(3, 45, "Christensen Fisher", new String[] {"Java", "Spring", "Maven", "REST"}, false)      
    };
    
    @RequestMapping(value = "/speakers", method = RequestMethod.GET)
    public List<Speaker> getAllSpeakers() {
      return Arrays.asList(speakers);
    }

    @RequestMapping(value = "/speakers/{id}", method = RequestMethod.GET)
    public ResponseEntity<?>  getSpeakerById(@PathVariable long id) {
      int tempId = ((new Long(id)).intValue() - 1);
      
      if (tempId >= 0 && tempId < speakers.length) {
        return new ResponseEntity<Speaker>(speakers[tempId], HttpStatus.OK);
      } else {
        return new ResponseEntity(HttpStatus.NOT_FOUND);
      }
    }
}