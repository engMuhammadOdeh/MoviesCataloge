const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const catalogFilePath = "./movies.json";

const loadMovieCatalog = () => {
  try {
    const catalogData = fs.readFileSync(catalogFilePath, "utf8");
    return JSON.parse(catalogData);
  } catch (error) {
    console.error("Error loading movie catalog:", error);
    return [];
  }
};

const saveMovieCatalog = (catalog) => {
  try {
    const catalogData = JSON.stringify(catalog, null, 2);
    fs.writeFileSync(catalogFilePath, catalogData, "utf8");
    console.log("Movie catalog saved successfully.");
  } catch (error) {
    console.error("Error saving movie catalog:", error);
  }
};

const displayMovieCatalog = () => {
  const catalog = loadMovieCatalog();
  console.log("=== Movie Catalog ===");
  catalog.forEach((movie) => {
    console.log(`ID: ${movie.id}`);
    console.log(`Title: ${movie.title}`);
    console.log(`Director: ${movie.director}`);
    console.log(`Release Year: ${movie.releaseYear}`);
    console.log(`Genre: ${movie.genre}`);
    console.log("------------------------");
  });
};

const addMovie = (movieData) => {
  const catalog = loadMovieCatalog();
  const newMovie = {
    id: uuidv4(),
    ...movieData,
  };
  catalog.push(newMovie);
  saveMovieCatalog(catalog);
};

const updateMovie = (movieId, updatedMovieData) => {
  const catalog = loadMovieCatalog();
  const movieToUpdate = catalog.find((movie) => movie.id === movieId);
  if (movieToUpdate) {
    Object.assign(movieToUpdate, updatedMovieData);
    saveMovieCatalog(catalog);
    console.log("Movie details updated successfully.");
  } else {
    console.log("Movie not found.");
  }
};

const deleteMovie = (movieId) => {
  const catalog = loadMovieCatalog();
  const movieIndex = catalog.findIndex((movie) => movie.id === movieId);
  if (movieIndex !== -1) {
    catalog.splice(movieIndex, 1);
    saveMovieCatalog(catalog);
    console.log("Movie deleted successfully.");
  } else {
    console.log("Movie not found.");
  }
};

const searchMovies = (searchCriteria) => {
  const catalog = loadMovieCatalog();
  const filteredMovies = catalog.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchCriteria.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchCriteria.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchCriteria.toLowerCase())
  );
  if (filteredMovies.length > 0) {
    console.log("=== Search Results ===");
    filteredMovies.forEach((movie) => {
      console.log(`ID: ${movie.id}`);
      console.log(`Title: ${movie.title}`);
      console.log(`Director: ${movie.director}`);
      console.log(`Release Year: ${movie.releaseYear}`);
      console.log(`Genre: ${movie.genre}`);
      console.log("------------------------");
    });
  } else {
    console.log("No movies found matching the search criteria.");
  }
};

module.exports = {
  displayMovieCatalog,
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
};
