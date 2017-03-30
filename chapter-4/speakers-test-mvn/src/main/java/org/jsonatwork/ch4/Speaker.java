package org.jsonatwork.ch4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Speaker {
	private int id;
	private int age;
	private String fullName;
	private List<String> tags = new ArrayList<String>(); 
	private boolean registered;
	
	public Speaker() {
		super();
	}

	public Speaker(int id, int age, String fullName, List<String> tags, boolean registered) {
		super();
		this.id = id;
		this.age = age;
		this.fullName = fullName;
		this.tags = tags;
		this.registered = registered;
	}
	
	public Speaker(int id, int age, String fullName, String[] tags, boolean registered) {
		this(id, age, fullName, Arrays.asList(tags), registered);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public boolean isRegistered() {
		return registered;
	}

	public void setRegistered(boolean registered) {
		this.registered = registered;
	}

	@Override
	public String toString() {
		return String.format("Speaker [id=%s, age=%s, fullName=%s, tags=%s, registered=%s]", id, age, fullName, tags,
				registered);
	}

}
