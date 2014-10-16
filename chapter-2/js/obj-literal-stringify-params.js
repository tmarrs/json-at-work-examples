var speaker = {
  firstName: 'Larson',
  lastName: 'Richard',
  email: 'larsonrichard@ecratic.com',
  about: 'Incididunt mollit cupidatat magna excepteur do tempor ex non ...',
  company: 'Ecratic',
  tags: ['json', 'rest', 'api', 'oauth'],
  registered: true
};

function serializeSpeaker(key, value) {
  return (typeof value === 'string' || Array.isArray(value)) ? undefined : value;
}

// Pretty Print.
console.log('Speaker (pretty print):\n' + JSON.stringify(speaker, null, 2) + '\n');


// Pretty print and filter out Strings and Arrays.
console.log('Speaker without Strings and Arrays:\n' +
  JSON.stringify(speaker, serializeSpeaker, 2));