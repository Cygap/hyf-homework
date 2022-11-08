console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);
const list = document.querySelector("ul");
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
