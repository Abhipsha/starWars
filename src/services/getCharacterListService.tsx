import axios, {AxiosPromise} from 'axios';
import {forEach, map} from 'lodash';

const getAllStarwarsPeople = () => {
  let people: any[] = [];
  return axios('https://swapi.dev/api/people/')
    .then(response => {
      people = response.data.results;
      return response.data.count;
    })
    .then(count => {
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      let promises = [];
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then(response => {
      people = response.reduce(
        (acc, data) => [...acc, ...data.data.results],
        people,
      );
      return people;
    })
    .catch(error => console.log('Properly handle your exception here', error));
};

const getCharacterFilms = async (films: string[]) => {
  const promises: AxiosPromise[] = [];
  forEach(films, film => {
    promises.push(axios(film));
  });
  const data = await Promise.all(promises);
  const filmArray = map(data, film => film.data.title);
  return filmArray;
};

const getCharacterStartships = async (starships: string[]) => {
  const promises: AxiosPromise[] = [];
  forEach(starships, starship => {
    promises.push(axios(starship));
  });
  const data = await Promise.all(promises);
  const starshipArray = map(data, starship => starship.data.model);
  return starshipArray;
};

const getCharacterVehicles = async (vehicles: string[]) => {
  const promises: AxiosPromise[] = [];
  forEach(vehicles, vehicle => {
    promises.push(axios(vehicle));
  });
  const data = await Promise.all(promises);
  const vehicleArray = map(data, vehicle => vehicle.data.model);
  return vehicleArray;
};

const getCharacterSpecies = async (species: string[]) => {
  const promises: AxiosPromise[] = [];
  forEach(species, specie => {
    promises.push(axios(specie));
  });
  const data = await Promise.all(promises);
  const specieArray = map(data, specie => specie.data.name);
  return specieArray;
};
const getCharacterHomeworld = async (homeworld: string) => {
  return (await axios(homeworld)).data.name;
};

export const characterService = {
  getAllStarwarsPeople,
  getCharacterFilms,
  getCharacterStartships,
  getCharacterVehicles,
  getCharacterSpecies,
  getCharacterHomeworld,
};
