[
  '{{repeat(3)}}',
  {
    id: '{{index()}}',
    firstName: '{{firstName()}}',
    lastName: '{{surname()}}',
    picture: 'http://placehold.it/32x32',
    company: '{{company().toUpperCase()}}',
    email: '{{email()}}',
    about: '{{lorem(1, "paragraphs")}}',
    presentation: [
      '{{repeat(3)}}',
      '{{lorem(1, "sentences")}}'
    ]
  }
]