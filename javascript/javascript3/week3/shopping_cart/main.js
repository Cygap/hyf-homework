"use strict";
import { Product, ShoppingCart } from "./script.js";
console.log("Script loaded");

const products = getAvailableProducts();
const list = document.querySelector("#hyf-products");
const shoppingCart = new ShoppingCart();

/**
 * Listens to the submit event of form with controls and inputs, then shows a cart with the selected products
 * for the placeholder's user "Antonette" - user should be replaced depending on deployment reqs
 */
document.querySelector("#list-controls").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".cart-wrapper").classList.toggle("hidden");

  document
    .querySelector("#products")
    .addEventListener("click", shoppingCart.handleListClick.bind(shoppingCart));
  currencies.addEventListener(
    "change",
    shoppingCart.handleCurrency.bind(shoppingCart)
  );

  shoppingCart
    .getUser("Antonette")
    .then(([user]) => {
      header.innerText = `${user.username}'s sopping cart:`;
    })
    .then((response) => shoppingCart.renderProducts());
});

/** Function to show the product list on the page.
 * additionally sets some properties to each item to allow for selection, tab focusing and price calculation.
 * @param {array} products Array of products, created with hyfBayHelpers.js
 * clears all previous contents from the list.
 */
function renderProducts(products) {
  list.innerHTML = "";
  for (const product of products) {
    let item = document.createElement("li");
    item.innerHTML = `<h3>${product.name}</h3>
    <div>price: ${product.price}</div>
    <div>Rating ${product.rating}</div>`;
    item.classList.add("item");
    item.tabIndex = 10 + products.indexOf(product);
    item.price = product.price;
    item.id = product.id;
    list.append(item);
  }
}

renderProducts(products);

const totalSum = document.querySelector("#total-sum");
let totalSumValue = 0;
/**
 * Changes the styles of a product and adds/substract its price from total depending on previous styles class.
 * @param {event} e
 */
function selectProduct(e) {
  const productElement = e.path.find((element) =>
    element.classList.contains("item")
  );
  if (productElement && (e.type === "click" || e.code === "Space")) {
    const product = products.find(
      (product) => product.id === productElement.id
    );
    totalSumValue += productElement.classList.contains("selected")
      ? -productElement.price
      : productElement.price;
    productElement.classList.contains("selected")
      ? shoppingCart.removeProduct(
          shoppingCart.searchProduct(productElement.id)
        )
      : shoppingCart.addProduct(
          new Product(product.name, product.price, product.id)
        );
    console.dir(shoppingCart);
    productElement.classList.toggle("selected");
    totalSum.innerText = totalSumValue;
  }
}

list.addEventListener("click", selectProduct);
list.addEventListener("keypress", selectProduct);

const filter = document.querySelector("#filter");
filter.addEventListener("input", filterProducts);
/**
 * filters the array of products, but works only when user has more than 2 characters in input
 * also checks if the user deleted the input contents some how. If so, then it refreshes the list of products to initial state.
 * @param {event} e
 */
function filterProducts(e) {
  if (e.target.value.length > 2) {
    renderProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  } else if (e.inputType.includes("delete")) {
    renderProducts(products);
  }
}

const priceFilter = document.getElementById("price-filter");
priceFilter.addEventListener("input", filterByPrice);

/**
 * filters the array of products. allows only those products, which cost less then maximal price in user input.
 * also checks if the user deleted the values from input. In that case refreshes the list of products to initial state.
 * @param {event} e
 */
function filterByPrice(e) {
  if (e.target.value) {
    renderProducts(
      products.filter((product) => product.price <= e.target.value)
    );
  } else if (e.inputType.includes("delete")) {
    renderProducts(products);
  }
}

const sorter = document.getElementById("sorter");
/**
 * sorting Map - the map is used in order to iterate the object properties. If we have more sort options in future, their addition will be easier.
 * the value defines the ascending (true) or descending (false) sorting order.
 * "additional feature"
 */
const sortOptions = new Map([
  ["name", true],
  ["rating", true],
  ["price", true]
]);
/**
 * populating select element with options.
 */
sortOptions.forEach((value, key) => {
  sorter.append(document.createElement("option"));
  sorter.lastChild.innerText = key;
});

sorter.addEventListener("change", sortProducts);

/**
 * sorts products according to the options selected in sorter select element.
 * takes into account sorting order.
 * @param {event} e
 */
function sortProducts(e) {
  const sortOrder = sortOptions.get(e.target.value) ? 1 : -1;

  renderProducts(
    products.sort((prev, next) =>
      prev[e.target.value] > next[e.target.value] ? sortOrder : -sortOrder
    )
  );
}
document
  .getElementById("sort-order")
  .addEventListener("change", changeSortOrder);

/**
 * Listens to the sort order switch and inverts the value of the sorter Map.
 * Then initiates sorting procedure by dispatching an event on the "select" element.
 * @param {event} e
 */

function changeSortOrder(e) {
  sortOptions.set(sorter.value, !sortOptions.get(sorter.value));
  console.dir(sortOptions);

  sorter.dispatchEvent(new Event("change"));
}
