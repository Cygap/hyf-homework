YESNO_URL = "https://yesno.wtf/api";
async function fetchYesNo() {
  let res = await fetch(YESNO_URL);
  res = await res.json();
  console.log(res);
}
const BASE_URL = "http://api.open-notify.org/astros.json";

async function fetchAstros() {
  const resp = await fetch(BASE_URL).then((data) => {
    console.log(data);
    return data.json();
  });
  console.log(resp);
}
fetchYesNo();
// fetchAstros;

JOKE_URL = "https://v2.jokeapi.dev/joke/Any?safe-mode";
async function awaitJoke() {
  const resp = await fetch(JOKE_URL);
  const joke = await resp.json();
  return joke;
}

function thenJoke() {
  return fetch(JOKE_URL).then((res) => res.json());
}

async function logPromise(cb) {
  const result = await cb();
  console.log(result);
}

logPromise(awaitJoke);
logPromise(thenJoke);

async function getRecipes(dish) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "af35d9bda9msh1d5d601753355fcp1d5ca1jsnc37e78a50099",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com"
    }
  };
  try {
    const response = await fetch(
      `https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${dish}`,
      options
    );
    if (response.status !== 200) {
      throw new Error(`error: the response status is ${response.status}`);
    }
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.log(error);
  }
}

async function agify(name) {
  try {
    const response = await fetch(`https://api.agify.io/?name=${name}`);
    if (response.status < 200 || response.status > 299) {
      throw new Error(`response status is ${response.status}`);
    }
    const age = await response.json();
    return age;
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener("click", async () =>
  console.log(await agify(recipe.value))
);
