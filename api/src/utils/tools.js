const byName = (gamesList) => {
    let videogamesApi = [];
    gamesList.map(element => {
          videogamesApi.push({
            id: element.id,
            name: element.name,
            image: element.background_image,
            genres: element.genres?.map((g) => g.name),
            description: element.description,
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
      description: gamesList.description,
      released: gamesList.released,
      rating: gamesList.rating,
      platforms: gamesList.platforms?.map((el) => el.platform.name),
    });
    return videogamesApi;
  };
   
  module.exports = {apiInfo, byName};