package org.jsonatwork.ch4;

import org.springframework.web.bind.annotation.*;

@RestController
public class SpeakerController {

    @RequestMapping(value = "/speakers", method = RequestMethod.GET)
    @ResponseBody
    public Speaker speakers() {
      String[] tags = {"json", "rest", "api", "oauth"};
      return new Speaker(1, 39, "Larson Richard", tags, true);
    }
}