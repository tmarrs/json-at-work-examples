/**
 * 
 */
package org.jsonatwork.ch4;

import static org.junit.Assert.*;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import org.junit.Test;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;

/**
 * @author tmarrs
 *
 */
public class BasicJsonTypesTest {

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
}

/*
 * import com.fasterxml.jackson.databind.ObjectMapper; ObjectMapper mapper = new
 * ObjectMapper();
 * 
 * try { mapper.writeValue(writer, age); System.out.println(writer.toString());
 * } catch (IOException e) { // TODO Auto-generated catch block
 * e.printStackTrace(); fail(e.getMessage()); }
 */
