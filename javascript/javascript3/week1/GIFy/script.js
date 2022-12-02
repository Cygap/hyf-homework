"use strict";
const term = document.querySelector("#search-term");

const gifList = document.querySelector("#gif-list");
const quantity = document.querySelector("#gifs-per-page");
const APIKey = "doDOh114nArWl8D0wlGOykJGs1N7qCNW";
/**
 * Setting-up listener and calling the function to get the gif-list on form submit.
 */
document.querySelector("form").onsubmit = (e) => {
  e.preventDefault();
  getGIFs(term.value, quantity.value);
};

/**
 * Checks whether user have entered both search phrase and number of gifs, then fetches the results from giphy.
 * if there is an error in API, then throws it to display ar console.
 * @param {string} phrase to send to GIFy apy at Search endpoint
 * @param {number} number of gifs per page
 * @returns in a case of the absense of either parameter.
 */
function getGIFs(phrase, number) {
  if (!phrase || !number) {
    alert(
      "Please, enter BOTH a search term and a max. number (from 0 to 50) of gifs to display results!"
    );
    return;
  }
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${phrase}&limit=${number}&offset=0&lang=en`;
  fetch(url)
    .then((result) => result.json())
    .then((result) => {
      if (result.meta.status !== 200) {
        throw new Error(
          `Cannot load API results: status: "${result.meta.status}", ${result.meta.msg}`
        );
      }
      renderGIFs(result.data);
    })
    .catch((error) => console.log(error));
}

/**
 * Clears the Ul, then populates it with a preview specimen of found gifs wrapped in a link to giphy website.
 * @param {array} GIFs - array of gif-objects from gipy.com
 */
function renderGIFs(GIFs) {
  gifList.innerHTML = "";
  for (let gif of GIFs) {
    const item = document.createElement("li");
    item.innerHTML = `<a href="${gif.url}"><img src="${gif.images.fixed_height_small.url}" alt="${gif.title}"></a>`;
    gifList.append(item);
  }
}
