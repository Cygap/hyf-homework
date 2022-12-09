const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

class Product {
  constructor(name, price, id) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ShoppingCart {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    if (!product.quantity) {
      product.quantity = 1;
    } else {
      product.quantity++;
    }
    this.products.push(product);
  }
  /**
   * Reduces the quantity of a given product or removes the product object from an array if the quantity equals 1.
   * @param {object} product object, wich user needs to remove.
   * @returns {number} - number of products, remaining in cart or -1 if the product is not found.
   */
  removeProduct(product) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      // only splice array when item is found and quantity is one item
      if (product.quantity > 1) {
        product.quantity--;
        return product.quantity;
      } else {
        this.products.splice(index, 1);
        return 0;
      }
    } else {
      return index;
    }
  }

  searchProduct(productName) {
    return this.products.filter((product) => product.name === productName);
  }

  getTotal() {
    return this.products.reduce(
      (total, product) => (total += product.price * product.quantity),
      0
    );
  }
  handleListClick({ target }) {
    switch (target.className) {
      case "plus":
        shoppingCart.products.find(
          (product) => product.id === +target.closest("li").id
        ).quantity++;
        shoppingCart.renderProducts();
        break;
      case "minus":
        shoppingCart.removeProduct(
          shoppingCart.products.find(
            (product) => product.id === +target.closest("li").id
          )
        );
        shoppingCart.renderProducts();
        break;
      case "products":
        break;
      default:
        shoppingCart.showProduct(target.closest("li").id);
    }
  }
  renderProducts() {
    products.innerHTML = "";
    this.products.forEach((product) => {
      products.innerHTML += `<li id = "${
        product.id
      }" class = "flex-row"><span><button class="plus">+</button> ${
        product.quantity
      } <button class="minus">-</button></span> <span><b>${
        product.name
      }</b> for ${product.price} per item, totalling to: <b>${
        product.quantity * product.price
      }</b></span>`;
    });
    total.innerHTML = `The total price of all products is: <b>${shoppingCart.getTotal()}</b>`;
  }
  showProduct(productId) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    const product = this.products.find((product) => product.id === +productId);
    document.querySelector("#product-info").innerHTML = `<h2>${
      product.name
    }</h2>
    <p>You have ordered ${product.quantity} of ${product.name}</p>
    <p>The price of each item is ${product.price}</p>
    <p>The total cost is: <b>${product.quantity * product.price}</b></p>`;
    document.querySelector(".btn.close").addEventListener("click", () => {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    });
  }
  getUser(user) {
    return fetch(
      `https://jsonplaceholder.typicode.com/users?username=${user}`
    ).then((response) => response.json());
  }
}

const shoppingCart = new ShoppingCart();
const flatscreen = new Product("flat-screen", 5000);

async function getProducts() {
  let response = await fetch("https://dummyjson.com/products");
  response = await response.json();
  for (let product of response.products) {
    shoppingCart.addProduct({
      name: product.title,
      price: product.price,
      id: product.id
    });
  }
  shoppingCart.renderProducts();
}

products.addEventListener("click", shoppingCart.handleListClick);

shoppingCart
  .getUser("Antonette")
  .then(([user]) => {
    header.innerText += ` for ${user.username} contains:`;
  })
  .then((response) => getProducts());
