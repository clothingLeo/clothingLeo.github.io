'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElemArr = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}



/**
 * add active class on header when scrolled 200px from top
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 200 ? header.classList.add("active")
    : header.classList.remove("active");
})


// Get all the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.cart-btn');

// Add an event listener to each button
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the product details
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.card-title').textContent;
    const productPrice = productCard.querySelector('.card-price').textContent;
    const productImage = productCard.querySelector('img').src;

    // Add the product to the cart
    addProductToCart(productName, productPrice, productImage);
  });
});

// Function to add a product to the cart
function addProductToCart(name, price, image) {
  // Get the cart container
  const cartContainer = document.querySelector('.cart');

  // Create a new cart item
  const cartItem = document.createElement('div');
  cartItem.classList.add('row', 'main', 'align-items-center');

  // Create the cart item HTML
  cartItem.innerHTML = `
    <div class="col-2"><img class="img-fluid" src="${image}" alt="${name}"></div>
    <div class="col">
      <div class="row text-muted">${name}</div>
      <div class="row">${name}</div>
    </div>
    <div class="col">
      <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
    </div>
    <div class="col">${price} <span class="close">&#10005;</span></div>
  `;

  // Add the cart item to the cart
  cartContainer.appendChild(cartItem);

  // Update the cart summary
  updateCartSummary();
}

// Function to update the cart summary
function updateCartSummary() {
  // Get the cart summary container
  const cartSummaryContainer = document.querySelector('.summary');

  // Get the total price of all cart items
  const totalPrice = Array.from(document.querySelectorAll('.cart .col:last-child')).reduce((total, element) => {
    const price = parseFloat(element.textContent.replace(/[^0-9.]/g, ''));
    return total + price;
  }, 0);

  // Update the cart summary HTML
  cartSummaryContainer.innerHTML = `
    <div><h5><b>Summary</b></h5></div>
    <hr>
    <div class="row">
      <div class="col">ITEMS ${document.querySelectorAll('.cart .row.main').length}</div>
      <div class="col text-right">&euro; ${totalPrice.toFixed(2)}</div>
    </div>
    <form>
      <p>SHIPPING</p>
      <select class="form-select">
        <option class="text-muted">Standard-Delivery- &euro;5.00</option>
      </select>
      <p>GIVE CODE</p>
      <input id="code" class="form-control" placeholder="Enter your code">
    </form>
    <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
      <div class="col">TOTAL PRICE</div>
      <div class="col text-right">&euro; ${(totalPrice + 5).toFixed(2)}</div>
    </div>
    <button class="btn">CHECKOUT</button>
  `;
}