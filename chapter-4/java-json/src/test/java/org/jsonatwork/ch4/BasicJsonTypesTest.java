/**
 * 
 */
package org.jsonatwork.ch4;

import static org.junit.Assert.*;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * @author tmarrs
 *
 */
public class BasicJsonTypesTest {

	
	@Test
	public void serializeBasicTypes() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			Writer writer = new StringWriter();
			int age = 39;
			String fullName = new String("Larson Richard");
			List<String> tags = new ArrayList<String>(
					                          Arrays.asList("json", "rest", "api", "oauth"));
			boolean registered = true;

			writer.write("age = ");
			mapper.writeValue(writer, age);
			writer.write("\nfullName = ");
			mapper.writeValue(writer, fullName);
			writer.write("\ntags = ");
			mapper.writeValue(writer, tags);
			writer.write("\nregistered = ");
			mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			mapper.writeValue(writer, registered);
			System.out.println(writer.toString());
			assertTrue(true);
		} catch (JsonGenerationException jge) {
			jge.printStackTrace();
			fail(jge.getMessage());
		} catch (JsonMappingException jme) {
			jme.printStackTrace();
			fail(jme.getMessage());
		} catch (IOException ioe) {
			ioe.printStackTrace();
			fail(ioe.getMessage());
		}		
	}
	
	
	@Test
	public void deSerializeBasicTypes() {	
		try {
			
			String ageJson = "{ \"age\": 39 }";
			ObjectMapper mapper = new ObjectMapper();
			
			Map<String, Integer> ageMap = mapper.readValue(ageJson, 
					                                new TypeReference<HashMap<String,Integer>>() {});
			
			System.out.println("age = " + ageMap.get("age") + "\n\n\n");
            assertTrue(true);
		} catch (JsonMappingException jme) {
			jme.printStackTrace();
			fail(jme.getMessage());
		} catch (IOException ioe) {
			ioe.printStackTrace();
			fail(ioe.getMessage());
		}
	}
}


/*
import java.io.StringWriter;
import java.io.Writer;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;

@Test
public void testBasicDataTypes() {
	try {
		int age = 39;
		String fullName = new String("Larson Richard");
		String[] tags = new String[] { "json", "rest", "api", "oauth" };
		Writer writer = new StringWriter();

		JsonFactory factory = new JsonFactory();
		JsonGenerator jsonGenerator = factory.createGenerator(writer);

		jsonGenerator.setPrettyPrinter(new DefaultPrettyPrinter());

		jsonGenerator.writeStartObject();
		jsonGenerator.writeNumberField("age", age);
		jsonGenerator.writeStringField("fullName", fullName);
		jsonGenerator.writeArrayFieldStart("tags");
		for (String tag : tags) {
			jsonGenerator.writeString(tag);
		}
		jsonGenerator.writeEndArray();
		jsonGenerator.writeEndObject();

		jsonGenerator.close();
		System.out.println(writer.toString());
		assertTrue(true);
	} catch (IOException ioe) {
		ioe.printStackTrace();
		fail(ioe.getMessage());
	}
}
*/