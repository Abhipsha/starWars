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
export const starWarsService = {
  getCharacterList,
};
