/**
 * 
 */
package org.jsonatwork.ch4;

import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Test;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author tmarrs
 *
 */
public class BasicJsonTypesTest {

	
	@Test
	public void testTypes() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			int age = 39;
			String fullName = new String("Larson Richard");
			String[] tags = new String[] { "json", "rest", "api", "oauth" };
			boolean registered = true;

			
			System.out.println("age = " + mapper.writeValueAsString(age));
			System.out.println("\nfullName = " +  mapper.writeValueAsString(fullName));
			System.out.println("\ntags = " +  mapper.writeValueAsString(tags));
			System.out.println("\nregistered = " +  mapper.writeValueAsString(registered));
			assertTrue(true);
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