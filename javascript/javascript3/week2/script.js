fetch(
  "https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json"
)
  .then((response) => response.json())
  .then((movies) => {
    console.dir(movies.filter((movie) => movie.rating < 5));
    console.dir(
      movies.filter((movie) => movie.rating < 5 && movie.year >= 2000)
    );
  });

function delayedResolve(resolveAfter) {
  return new Promise((resolve, reject) =>
    setTimeout(
      () => resolve(`The promise resolved after ${resolveAfter} seconds`),
      resolveAfter * 1000
    )
  );
}

delayedResolve(3).then((result) => console.log(result));

async function awiatForPromiseResolution() {
  const result = await delayedResolve(5);
  console.log(result);
}

awiatForPromiseResolution();

function setTimeoutPromise(milliseconds) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(), milliseconds)
  );
}

setTimeoutPromise(3000).then(() => {
  console.log("Called after 3 seconds");
});

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

getCurrentLocation()
  .then((position) => {
    // called when the users position is found
    console.log(position);
  })
  .catch((error) => {
    // called if there was an error getting the users location
    console.log(error);
  });

setTimeout(
  () =>
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((response) => console.dir(response)),
  3000
);

setTimeout(async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/todos/2");
  const todos = await result.json();
  console.dir(todos);
}, 4000);
