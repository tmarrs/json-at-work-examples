package org.jsonatwork.ch4;

import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;

import org.apache.http.HttpStatus;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.GetRequest;
import com.mashape.unirest.http.HttpResponse;

import static net.javacrumbs.jsonunit.fluent.JsonFluentAssert.assertThatJson;

public class SpeakersApiJsonTest {
	private static final String SPEAKERS_BASE_URI = "http://localhost:5000/speakers";
	private static final String SPEAKER_3_URI = SPEAKERS_BASE_URI + "/3";

	@Test
	public void testApiAllSpeakersJson() {
		
		try {
			String json = null;
			HttpResponse <String> resp = Unirest.get(SpeakersApiJsonTest.SPEAKERS_BASE_URI)
			       .asString();
			
			assertEquals(HttpStatus.SC_OK, resp.getStatus());
			json = resp.getBody();
			System.out.println(json);
			assertThatJson(json).node("").isArray();
			assertThatJson(json).node("").isArray().ofLength(3);
			assertThatJson(json).node("[0]").isObject();
			assertThatJson(json).node("[0].fullName").isStringEqualTo("Larson Richard");
			assertThatJson(json).node("[0].tags").isArray();
			assertThatJson(json).node("[0].tags").isArray().ofLength(3);
			assertThatJson(json).node("[0].tags[1]").isStringEqualTo("AngularJS");
			assertThatJson(json).node("[0].registered").isEqualTo(true);
			assertTrue(true);
		} catch (UnirestException ue) {
			ue.printStackTrace();
		}
	}

	@Test
	public void testApiSpeaker3Json() {
		
		try {
			String json = null;
			HttpResponse <String> resp = Unirest.get(SpeakersApiJsonTest.SPEAKER_3_URI)
			                                    .asString();
			
			assertEquals(HttpStatus.SC_OK, resp.getStatus());
			json = resp.getBody();
			System.out.println(json);
			assertThatJson(json).node("").isObject();
			assertThatJson(json).node("fullName").isStringEqualTo("Christensen Fisher");
			assertThatJson(json).node("tags").isArray();
			assertThatJson(json).node("tags").isArray().ofLength(4);
			assertThatJson(json).node("tags[2]").isStringEqualTo("Maven");
			assertTrue(true);
		} catch (UnirestException ue) {
			ue.printStackTrace();
		}
	}
}
