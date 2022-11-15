console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);
const list = document.querySelector("ul");
/** Function to show the product list on the page.
 * @param {array} products Array of products, created with hyfBayHelpers.js
 */
function renderProducts(products) {
  for (const product of products) {
    let item = document.createElement("li");
    item.innerHTML = `<h3>${product.name}</h3>
    <div>price: ${product.price}</div>
    <div>Rating ${product.rating}</div>`;
    list.append(item);
  }
}
renderProducts(products);
const filter = document.querySelector("#filter");
filter.addEventListener("input", filterProducts);

function filterProducts(e) {
  if (e.target.value.length > 2) {
    list.innerHTML = "";
    renderProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  } else if (e.inputType.includes("delete")) {
    list.innerHTML = "";
    renderProducts(products);
  }
}

const priceFilter = document.getElementById("price-filter");
priceFilter.addEventListener("input", filterByPrice);

function filterByPrice(e) {
  if (e.target.value) {
    list.innerHTML = "";
    renderProducts(
      products.filter((product) => product.price <= e.target.value)
    );
  } else if (e.inputType.includes("delete")) {
    renderProducts(products);
  }
}

const sorter = document.getElementById("sorter");
const sortOptions = new Map([
  ["name", true],
  ["rating", true],
  ["price", true],
]);
sortOptions.forEach((value, key) => {
  sorter.append(document.createElement("option"));
  sorter.lastChild.innerText = key;
});

sorter.addEventListener("change", sortProducts);
function sortProducts(e) {
  const sortOrder = sortOptions.get(e.target.value) ? 1 : -1;
  list.innerHTML = "";
  renderProducts(
    products.sort((prev, next) =>
      prev[e.target.value] > next[e.target.value] ? sortOrder : -sortOrder
    )
  );
}
document
  .getElementById("sort-order")
  .addEventListener("change", changeSortOrder);

function changeSortOrder(e) {
  sortOptions.set(sorter.value, !sortOptions.get(sorter.value));
  console.dir(sortOptions);
}
