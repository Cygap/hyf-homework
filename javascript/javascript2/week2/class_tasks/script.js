const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let i = 0; i < numbersArray.length; i++) {
  console.log(numbersArray[i]);
}
numbersArray.forEach((element) => console.log(element));

numbersArray.map((el) => {
  el *= 2;
  console.log(el);
});

console.dir(numbersArray.filter((el) => el > 5));

/**
 * Get random integer between two numbers, found here: https://stackoverflow.com/a/7228322
 * @param {integer} min - The min number
 * @param {integer} max - The max number
 * @returns {Number} Random number between min and max
 */
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get an array with listing objects with random color and speed
 * @param {integer} numberOfListings - The number of listings
 * @returns {array} Array containing the listing objects
 */
function generateListings(numberOfListings) {
  const listings = [];

  const listingType = ["House", "Apartment", "Shed", "Dorm", "Farm"];
  const listingFacilities = [
    "Parkering",
    "Elevator",
    "Altan",
    "Have",
    "Husdyr"
  ];
  const selectType = document.getElementById("type");
  const selectFacilities = document.getElementById("facilities");

  listingType.forEach((element) => {
    const option = document.createElement("option");
    option.innerText = element;
    selectType.append(option);
  });
  listingFacilities.forEach((element) => {
    const option = document.createElement("option");
    option.innerText = element;
    selectFacilities.append(option);
  });
  for (let i = 0; i < numberOfListings; i++) {
    const listing = {};
    const randomTypeIndex = randomIntFromInterval(0, listingType.length - 1);
    const numberOfFacilities = randomIntFromInterval(
      1,
      listingFacilities.length - 1
    );
    const facilities = [];
    for (let i = 0; i < numberOfFacilities; i++) {
      const randomIndexFacilities = randomIntFromInterval(
        0,
        listingFacilities.length - 1
      );
      const randomFacility = listingFacilities[randomIndexFacilities];

      if (!facilities.includes(randomFacility)) {
        facilities.push(randomFacility);
      }
    }

    listing.type = listingType[randomTypeIndex];
    listing.facilities = facilities;
    listing.price = randomIntFromInterval(1, 10000);
    listing.hasGarden = Boolean(randomIntFromInterval(0, 1));
    listing.size = randomIntFromInterval(12, 1000);
    listing.img = `https://loremflickr.com/200/200/${listing.type}`;

    listings.push(listing);
  }

  return listings;
}

const list = generateListings(37);
/*list.forEach((el) => console.log(el.size));
const prices = list.map((el) => el.price);
const lowPricedItems = list.filter((el) => el.price < 100);
const veryExpensivePrices = list
  .filter((el) => el.price > 500)
  .map((el) => el.price);
const hasParking = list.filter((el) => el.facilities.includes("Parkering"));*/
console.dir(list);

const filter = {
  type: "farm",
  hasGarden: true
};
const filter2 = {
  type: "farm",
  minPrice: 4000,
  maxSize: 400
};
/**
 * Looks for the specific key of the filterObject in listing. If the exact same key is found, then calls the function to compare their values "as is".
 * If there is no such key in listing object, then calls the function to check for modified keys in filter object (like min or max) and, if found
 * to apply the relevant logical check.
 * @param {object} listing with the details of property being sold
 * @param {object} filterObject object with the parameters to filter the listing
 * @returns {boolean} result of the performed checks of filterObject values on the listing object
 */
function compareObjects(listing, filterObject) {
  let result = true;
  for (let key of Object.keys(filterObject)) {
    if (key in listing) {
      result = compareKeys(listing[key], filterObject[key]);
    } else {
      result = compareModifiedKeys(listing, key, filterObject[key]);
    }
    if (!result) {
      return result;
    }
  }
  return result;
}
/**
 * Compares the falue in listing object and the falue in filter object found by the same keys.
 * types of values can be arbitrary, so need to comapre them as the lowercase strings. If the types are arrays, then we need to sort them first.
 *
 * @param {*} listingValue
 * @param {*} filterValue
 * @returns {boolean} if the value found in listing includes the value of filter, then true. Otherwise - false.
 */
function compareKeys(listingValue, filterValue) {
  if (Array.isArray(filterValue)) {
    listingValue.sort();
    filterValue.sort();
  }
  return listingValue
    .toString()
    .toLowerCase()
    .includes(filterValue.toString().toLowerCase());
}
/**
 * Checks, whether the key in filter, that is absent from the listing is modified listing key like, e.g. "minPrice" or "maxSize".
 * If filter key includes one of the listing object keys inside, then checks for known moifiers (e.g. "min" or "max").
 * For additional modifiers need to change logic of this very function.
 * If the known modifier is found, then checks the key in listing according to modifier's logic.
 * @param {object} listing property sold
 * @param {object} filterKey parameters to look for and check in listing
 * @param {*} filterValue the value of filter which is not contained in listing object as is. Checked for being one of the lixting keys with given modification
 * @returns {boolean} the result of check. If the known modifier is not found, then returns "false".
 */
function compareModifiedKeys(listing, filterKey, filterValue) {
  let result = false;
  for (let listingKey of Object.keys(listing)) {
    if (filterKey.toLowerCase().includes(listingKey.toLocaleLowerCase())) {
      result = true;
      const compareAs = filterKey.match(/((min)|(max))/i)[1];
      if (compareAs === null) {
        console.log("Unknown filter modifier");
        return (result = false);
      }
      switch (compareAs.toLowerCase()) {
        case "min":
          if (listing[listingKey] < filterValue) {
            return (result = false);
          }
          break;
        case "max":
          if (listing[listingKey] > filterValue) {
            return (result = false);
          }
          break;
      }
    }
  }
  return result;
}
/**
 * Checks, whether each element of listing array conforms to the condition of filterObject
 * @param {array} arrayOfListings array of objects with the description of each item
 * @param {*} filterObject collection of parameters to check in each item of array
 * @returns {array} filtered array of items
 */
function filterListings(arrayOfListings, filterObject) {
  // type, facilities, price , hasGarden and size
  return arrayOfListings.filter((listing) =>
    compareObjects(listing, filterObject)
  );
}
const filter3 = {};

const form = document.querySelector("form");
/**
 * lsitens to the changes in any element of the form and adds parameters to the filter object according to selected/entered values.
 */
form.addEventListener("change", (e) => {
  if (e.target.multiple) {
    filter3[e.target.name] = [];
    for (let option of e.target) {
      if (option.selected) {
        filter3[e.target.name].push(option.value);
      }
    }
  } else {
    filter3[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
  }
  console.dir(filter3);
  if (!filter3[e.target.name]) {
    delete filter3[e.target.name];
  }
  renderListings(filterListings(list, filter3));
});

const listContainer = document.createElement("ul");
document.body.append(listContainer);
renderListings(filterListings(list, filter3));

/**
 * Clears list and then displays an array of properties on the web-page.
 * @param {array} listToRender
 */

function renderListings(listToRender) {
  listContainer.innerHTML = "";
  listToRender.forEach((element) => {
    const item = document.createElement("li");
    item.innerHTML = `<h2>${element.type}</h2>
    <p>facilities: ${element.facilities}</p>
    <p>price: ${element.price}</p>
    <p>Has ${element.hasGarden ? "" : "no"} garden </p>
    <p>Property size ${element.size}</p>
    <img src="${element.img}" alt="${element.type} with ${
      element.facilities
    }">`;
    listContainer.append(item);
  });
}
