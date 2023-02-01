const byName = (gamesList) => {
    let videogamesApi = [];
    gamesList.map(element => {
          videogamesApi.push({
            id: element.id,
            name: element.name,
            image: element.background_image,
            genres: element.genres?.map((g) => g.name),
            description: element.description_raw,
            released: element.released,
            rating: element.rating,
            platforms: element.platforms?.map((el) => el.platform.name),
            created: false
        })
    });
    return videogamesApi;
  };
  
const apiInfo = (gamesList) => {
  let videogamesApi = [];
  videogamesApi.push({
    id: gamesList.id,
    name: gamesList.name,
    image: gamesList.background_image,
    genres: gamesList.genres?.map((g) => g.name),
    description: gamesList.description_raw,
    released: gamesList.released,
    rating: gamesList.rating,
    platforms: gamesList.platforms?.map((el) => el.platform.name),
  });
  return videogamesApi;
};

  const bdGames = (bddGames) => {
    let videogamesBd = []
    bddGames.map(element => {
      videogamesBd.push({
        id: element.id,
        name: element.name,
        image: element.image,
        description: element.description,
        genres: element.genres?.map((g) => g.name),
        rating: element.rating,
        created: element.created
      })
    })
    return videogamesBd
  }
   
  module.exports = { byName, bdGames, apiInfo};