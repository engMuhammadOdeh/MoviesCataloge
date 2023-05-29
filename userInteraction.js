const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = () => {
  return new Promise((resolve) => {
    rl.question("Enter movie details:\nTitle: ", (title) => {
      rl.question("Director: ", (director) => {
        rl.question("Release Year: ", (releaseYear) => {
          rl.question("Genre: ", (genre) => {
            rl.close();
            resolve({ title, director, releaseYear, genre });
          });
        });
      });
    });
  });
};

const getUserChoice = () => {
  return new Promise((resolve) => {
    rl.question("Enter your choice: ", (choice) => {
      resolve(choice);
    });
  });
};

const getUserInput = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
};

module.exports = {
  promptUser,
  getUserChoice,
  getUserInput,
};
