import axios from 'axios';

const getCharacterList = () => {
  return new Promise((resolve: any, reject: any) => {
    fetch('http https://swapi.dev/api/people/1/')
      .then(res => {
        console.log('RES>>', res);
        resolve(true);
      })
      .catch(err => {
        console.log('ER>>', err);
        reject(err);
      });
  });
};

const getAllStarwarsPeople = () => {
  let people: any[] = [];
  // first page
  return fetch('https://swapi.dev/api/people/')
    .then(response => {
      // collect people from first page
      people = response.data.results;
      return response.data.count;
    })
    .then(count => {
      // exclude the first request
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      let promises = [];
      // start at 2 as you already queried the first page
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then(response => {
      //get the rest records - pages 2 through n.
      people = response.reduce(
        (acc, data) => [...acc, ...data.data.results],
        people,
      );
      return people;
    })
    .catch(error => console.log('Properly handle your exception here', error));
};
export const starWarsService = {
  getCharacterList,
  getAllStarwarsPeople,
};
