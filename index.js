const {
  displayMovieCatalog,
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
} = require("./movieCatalog");
const {
  promptUser,
  getUserChoice,
  getUserInput,
} = require("./userInteraction");

async function main() {
  while (true) {
    console.log("=== Movie Catalog CLI ===");
    console.log("1. Display Movie Catalog");
    console.log("2. Add New Movie");
    console.log("3. Update Movie Details");
    console.log("4. Delete Movie");
    console.log("5. Search Movies");
    console.log("6. Exit");

    const choice = await getUserChoice();

    switch (choice) {
      case "1":
        displayMovieCatalog();
        break;
      case "2":
        const movieData = await promptUser();
        addMovie(movieData);
        break;
      case "3":
        const movieId = await getUserInput(
          "Enter the ID of the movie you want to update: "
        );
        const updatedMovieData = await promptUser();
        updateMovie(movieId, updatedMovieData);
        break;
      case "4":
        const movieIdToDelete = await getUserInput(
          "Enter the ID of the movie you want to delete: "
        );
        deleteMovie(movieIdToDelete);
        break;
      case "5":
        const searchCriteria = await getUserInput("Enter search criteria: ");
        searchMovies(searchCriteria);
        break;
      case "6":
        console.log("Exiting...");
        process.exit(0);
      default:
        console.log("Invalid choice. Please try again.");
        break;
    }
  }
}

main();
