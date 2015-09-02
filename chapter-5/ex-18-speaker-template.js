// Template for http://www.json-generator.com/

[
	'{{repeat(3)}}', {
		id: '{{integer()}}',
		picture: 'http://placehold.it/32x32',
		name: '{{firstName()}}',
		lastName: '{{surname()}}',
		company: '{{company()}}',
		email: '{{email()}}',
		about: '{{lorem(1, "paragraphs")}}'
	}
]