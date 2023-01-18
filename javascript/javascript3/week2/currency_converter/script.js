"use strict";
// initials
const BASE_URL = "https://open.er-api.com";

// elements
const baseEl = document.getElementById("base");
const targetEl = document.getElementById("target");
const amountEl = document.getElementById("amount");
const resultEl = document.getElementById("result");

getRates(baseEl.value);

/**
 * Fetches currency rates for base currency, checks for errors and if status is ok,
 * calls populateOptions - to display all the currencies in dropdowns and
 * handleConvertion - to actually convert input value
 * @param {string} base - currency code according to https://www.exchangerate-api.com/docs/supported-currencies
 * @returns {object} of pairs [currency code]: [exchange rate to base currency]
 */
async function getRates(base) {
  try {
    const result = await fetch(`${BASE_URL}/v6/latest/${base}`);
    if (result.status < 200 || result.status > 299) {
      throw new Error(
        `The request for currency rates was rejected with the code ${result.status}`
      );
    }
    const currency = await result.json();

    populateOptions(currency.rates, currency.base_code);

    handleConvertion();
    return currency.rates;
  } catch (error) {
    resultEl.innerText = `There was an error while fetching currencies... ${error.message}`;
  }
}

/**
 * Creates options for base currency select element, appends them,
 * also clones the options and appennds them to target select element,
 * while setting cloned option's "data-rate" atribute to store the exchange rate
 * for each currency as the attribute's value.
 * @param {object} rates - pairs [currency code]: [exchange rate to base currency]
 * @param {string} base - currency code according to https://www.exchangerate-api.com/docs/supported-currencies
 */
function populateOptions(rates, base) {
  baseEl.innerHTML = "";
  targetEl.innerHTML = "";

  Object.keys(rates).forEach((key) => {
    const baseOptionEl = document.createElement("option");
    baseOptionEl.setAttribute("value", key);
    baseOptionEl.setAttribute("data-rate", rates[key]);
    baseOptionEl.innerText = key;
    baseEl.append(baseOptionEl);
    targetEl.append(baseOptionEl.cloneNode());
    targetEl.lastChild.innerText = key;

    //depending on user/ux designer preferences could modify target currency default reset here:
    if (key === "DKK") {
      targetEl.lastChild.setAttribute("selected", true);
    }
    if (key === base) {
      baseOptionEl.setAttribute("selected", true);
    }
  });
}

baseEl.addEventListener("change", () => getRates(baseEl.value));
targetEl.addEventListener("change", handleConvertion);

amountEl.addEventListener("change", handleConvertion);
/**
 * Converts the value in user input from the base currency to target currency.
 * Displays the result as the inner text of p element.
 */
function handleConvertion() {
  resultEl.innerText = `${amountEl.value} ${baseEl.value} is ${
    amountEl.value *
    document.querySelector(`option[value="${targetEl.value}"]`).dataset.rate
  } ${targetEl.value}`;
}
