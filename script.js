// script.js

// Array of product objects
let ArrProducts = [
  { id: 1, name: "Rolex", image: "./rolex.jpg", price: "18,000", rating: 5 },
  { id: 2, name: "Casio", image: "./casio.jpg", price: "8,000", rating: 4 },
  { id: 3, name: "Apple", image: "google.jpg", price: "57,990", rating: 5 },
  { id: 4, name: "G-Shock", image: "gshock.jpg", price: "16,000", rating: 4.5 },
  { id: 5, name: "Timex", image: "timex.jpg", price: "4,000", rating: 3 },
  { id: 6, name: "Fastrack", image: "fastrack.jpg", price: "1,000", rating: 5 }
];

// Select elements from the DOM
const body = document.querySelector("body"),
  Products = document.querySelector(".Products"),
  basket = document.querySelector(".basket"),
  closeCart = document.querySelector(".close"),
  productList = document.querySelector(".productList"),
  quantity = document.querySelector(".quantity"),
  total = document.querySelector(".total"); // Ensure correct class is targeted

let checkOutList = [];

// Event handlers for opening and closing the cart
basket.onclick = () => body.classList.add("active");
closeCart.onclick = () => body.classList.remove("active");


// Initialize products on page load
function onInit() {
  ArrProducts.forEach((item, key) => {
      let div = document.createElement("div");
      div.classList.add("item");

      // Generate star ratings
      let star = '';
      for (let i = 1; i <= Math.floor(item.rating); i++) {
          star += '<i class="fa fa-star"></i>';
      }
      if (item.rating % 1 !== 0) {
          star += '<i class="fa fa-star-half"></i>';
      }

      div.innerHTML = `
          <img src="images/${item.image}" alt="${item.name}">
          <div class="name">${item.name}</div>
          <div>${star}</div>
          <div class="price"><small>₹</small>${item.price}</div>
          <button onclick="addToCart(${key})"><i class="fa fa-cart-plus"></i> Add to Cart</button>
      `;
      Products.appendChild(div);
  });
}

window.onload = onInit;

// Function to add a product to the cart
function addToCart(Id) {
  if (!checkOutList[Id]) {
      checkOutList[Id] = { ...ArrProducts[Id], quantity: 1 };
  } else {
      checkOutList[Id].quantity++;
  }
  reloadCart();
}

// Function to reload the cart and update the display
function reloadCart() {
  productList.innerHTML = '';
  let count = 0;
  let totalPrice = 0;

  checkOutList.forEach((item) => {
      if (item) { // Check if item exists
          totalPrice += parseInt(item.price.replace(/,/g, '')) * item.quantity;
          count += item.quantity;

          let li = document.createElement("li");
          li.innerHTML = `
              <img src="images/${item.image}">
              <div>${item.name}</div>
              <div>₹${item.price}</div>
              <div>
                  <button onclick="decreaseQuantity(${item.id - 1})">-</button>
                  <div class="count">${item.quantity}</div>
                  <button onclick="increaseQuantity(${item.id - 1})">+</button>
              </div>
          `;
          productList.appendChild(li);
      }
  });

  // Update UI with the new total and item count
  quantity.innerHTML = count;
  total.innerHTML = `<small>Subtotal (${count} items): </small> ₹${totalPrice.toLocaleString()}`;
}

// Increase quantity function
function increaseQuantity(Id) {
  if (checkOutList[Id]) {
      checkOutList[Id].quantity++;
      reloadCart();
  }
}

// Decrease quantity function
function decreaseQuantity(Id) {
  if (checkOutList[Id]) {
      if (checkOutList[Id].quantity > 1) {
          checkOutList[Id].quantity--;
      } else {
          checkOutList[Id] = null; // Remove item if quantity reaches zero
      }
      reloadCart();
  }
}

