#!/usr/bin/node
/* Star Wars Characters */
const request = require('request');

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

const fetchCharacter = (url) => {
  return fetch(url).then(data => data.name);
};

const fetchFilmCharacters = (id) => {
  const url = `https://swapi-api.alx-tools.com/api/films/${id}`;

  fetch(url).then(data => {
    const CharactersPromises = data.characters.map(url => fetchCharacter(url));
    return Promise.all(CharactersPromises);
  }).then(names => {
    names.forEach(name => console.log(name));
  }).catch(error => console.error(error));
};

const args = process.argv.slice(2);
const id = args[0];

fetchFilmCharacters(id);
