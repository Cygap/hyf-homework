"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const currencyAPI = "IXVj8Sn6j6kNAdP2kGx3ziiTCIz5xlWt9LYPNXiJ";
class Product {
  constructor(name, price, id) {
    this.name = name;
    this.price = price;
    this.id = id;
    this.currency = "USD";
  }
  convertToCurrency(currency) {
    return fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${currencyAPI}&base_currency=${this.currency}&currencies=${currency}`
    )
      .then((response) => response.json())
      .then((response) => {
        this.price = response.data[currency] * this.price;
        this.currency = currency;
      });
  }
}

class ShoppingCart {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    if (!this.searchProduct(product.id)) {
      product.quantity = 1;
      this.products.push(product);
    } else {
      this.searchProduct(product.id).quantity++;
    }
  }
  /**
   * Reduces the quantity of a given product or removes the product object from an array if the quantity equals 1.
   * @param {object} product object, wich user needs to remove.
   * @returns {number|string} - number of products, remaining in cart or -1 if the product is not found or product id if the quantity is 0.
   */
  removeProduct(product) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      // only splice array when item is found and quantity is one item
      if (product.quantity > 1) {
        product.quantity--;
        return product.quantity;
      } else {
        return this.products.splice(index, 1).id;
      }
    } else {
      return index;
    }
  }

  searchProduct(productId) {
    return this.products.find((product) => product.id === productId);
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
        this.products.find((product) => product.id === target.closest("li").id)
          .quantity++;

        this.renderProducts();
        break;
      case "minus":
        this.removeProduct(
          this.products.find(
            (product) => product.id === target.closest("li").id
          )
        );
        this.renderProducts();
        break;
      case "products":
        break;
      default:
        this.showProduct(target.closest("li").id);
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
    total.innerHTML = `The total price of all products is: <b>${this.getTotal()}</b>`;
  }
  showProduct(productId) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    const product = this.products.find((product) => product.id === productId);

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

  async handleCurrency({ target: { value: currency } }) {
    total.innerHTML += "... fetching currency data";
    await Promise.all(
      this.products.map((product) => product.convertToCurrency(currency))
    );
    this.renderProducts();
  }
}

/*
const flatscreen = new Product("flat-screen", 5000);*/

export { Product, ShoppingCart };
