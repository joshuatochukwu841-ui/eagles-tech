// PRODUCT  SECTION
const productRow = document.getElementById("products");
const popUpModal = document.getElementById("popUp");
const closeModal = document.getElementById("close-popUp");
const cartCount = document.querySelectorAll(".cart-count");
const emptyCart = document.getElementById("empty-cart");
const cartSummary = document.getElementById("cart-summary");
const cartItems = document.getElementById("cart-items");
const grandTotal = document.querySelectorAll(".grand-total");
const orderBtn = document.getElementById("placeOrderBtn");
const cartBriefing = document.getElementById("cart-briefing");
const hasStoreUi = Boolean(
  productRow &&
  popUpModal &&
  closeModal &&
  emptyCart &&
  cartSummary &&
  cartItems &&
  orderBtn,
);

console.log(
  productRow,
  cartCount,
  emptyCart,
  cartSummary,
  cartItems,
  grandTotal,
  orderBtn,
);

// array of cart items
let cart = [];
let searchTerm = "";

// array of products
const loadProducts = [
  {
    id: 1,
    image: "../images/TBookPri1(1).jpg",
    name: "AI & Robotics - Primary 1",
    producer: "by Eagles Tech",
    text: "Artificial Intelligence and Robotics - Primary 1 (Basic One)",
    price: "7000.00",
  },

  {
    id: 2,
    image: "../images/TBookPri2.jpg",
    name: "AI & Robotics - Primary 2",
    producer: "by Eagles Tech",
    text: "Artificial Intelligence and Robotics - Primary 2 (Basic Two)",
    price: "7000.00",
  },

  {
    id: 3,
    image: "../images/TBookPri3.jpg",
    name: "AI & Robotics - Primary 3",
    producer: "by Eagles Tech",
    text: "Artificial Intelligence and Robotics - Primary 3 (Basic Three)",
    price: "7000.00",
  },

  {
    id: 4,
    image: "../images/TBookPri4.jpg",
    name: "AI & Robotics - Primary 4",
    producer: "by Eagles Tech",
    text: "Artificial Intelligence and Robotics - Primary 4 (Basic Four)",
    price: "7000.00",
  },

  {
    id: 5,
    image: "../images/TBookPri5.jpg",
    name: "AI & Robotics - Primary 5",
    producer: "by Eagles Tech",
    text: "Artificial Intelligence and Robotics - Primary 5 (Basic Five)",
    price: "7000.00",
  },

  {
    id: 6,
    image: "../images/TBookPri6.jpg",
    name: "AI & Robotics - Primary 6",
    producer: "by Eagles Tech",
    text: "Artificial Intelligence and Robotics - Primary 6 (Basic Six)",
    price: "7000.00",
  },

  {
    id: 7,
    image: "../images/TBookJss1.jpg",
    name: "AI & Robotics - Junior Secondary 1",
    producer: "by Eagles Tech",
    text: "Artificial Intelligence and Robotics - Junior Secondary 1",
    price: "7000.00",
  },

  {
    id: 8,
    image: "../images/TBookJss2.jpg",
    name: "AI & Robotics - Junior Secondary 2",
    producer: "by Eagles Tech",
    text: "Artificial Intelligence and Robotics - Junior Secondary 2",
    price: "7000.00 ",
  },

  {
    id: 9,
    image: "../images/TBookJss3(1).jpg",
    name: "AI & Robotics - Junior Secondary 3",
    producer: "by Eagles Tech",
    text: "Artificial Intelligence and Robotics - Junior Secondary 3",
    price: "7000.00 ",
  },
];


// display products on the page
function displayProducts() {
  if (!productRow) return;

  productRow.innerHTML = loadProducts
    .map(
      (product, index) => `
    <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card product-item p-3">
                     <div class="product-img"><img src="${product.image}" alt="primary 1"></div>
                    <div class="product-category">
                            <h5 class="product-title pt-3 text-center">${product.name}</h5>
                           <em class="text-center d-block pb-4">${product.producer}</em>
                            <p class="product-text">${product.text}</p>
                            <span class="product-price d-block">${product.price}(7$)</span>
                            ${getProductButton(index)}
                    </div>
            </div>
    </div>
    `,
    )
    .join("");

  console.log(loadProducts);
}

if (hasStoreUi) {
  displayProducts();
}

// show either the "add to cart" or the "quantity controls"
function getProductButton(index) {
  // get the item from the cart array that matches the index of the product
  const item = cart.find((item) => item.index === index);
  //   console.log(item);

  // if the item is not in the cart, show the "add to cart" button
  if (!item) {
    return `
     <button type="button" class="addToCart-btn d-block mt-3" onclick="addToCart(${index})">
             <span class="cart-icon text-white pe-3"><i class="bi bi-cart-plus"></i></span>
            <span class="cart-text"></span>Add To Cart</span>
    </button>
    `;
  }

  return `
        <div class="quantity-controls mt-3">
                <button class="action-btn decrement-btn" onclick="decreaseItem(${index})">
                        <img src="../images/icon-decrement-quantity.svg" alt="">
                </button>

                    <span>${item.quantity}</span>

                 <button class="action-btn increment-btn" onclick="increaseItem(${index})">
                        <img src="../images/icon-increment-quantity.svg" alt="">
                </button>
        </div>
  `;
}

// function that adds to cart
function addToCart(index) {
  //  variable holding up an exiting item in the cart
  const existingItem = cart.find((item) => item.index === index);

  if (existingItem) {
    // if item exists in the cart, increment the quantity,
    existingItem.quantity++;
  } else {
    // otherwise add the item to the cart with a quantity of 1
    cart.push({
      index,
      quantity: 1,
    });
    console.log(cart);
  }

  // update the cart and display the products in the cart
  updateCart();
}

// increment products
function increaseItem(index) {
  const item = cart.find((item) => item.index === index);

  if (item) {
    item.quantity++;
  }

  updateCart();
}

// decrease products
function decreaseItem(index) {
  const item = cart.find((item) => item.index === index);

  if (item) {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter((item) => item.index != index);
    }
  }

  updateCart();
}

// remove item from cart
function removeItem(index) {
  // filter out any item that does not match the desired element
  cart = cart.filter((item) => item.index != index);

  updateCart();
}

// update cart and display products in cart
function updateCart() {
  if (!hasStoreUi) return;

  // display products on the page
  displayProducts();

  //   total number of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalCost = cart.reduce((total, item) => {
    return total + loadProducts[item.index].price * item.quantity;
  }, 0);
  console.log(totalCost);

  // setting up the cart count and displaying it on the page
  cartCount.forEach((item) => {
    item.innerText = totalItems;
  });

  grandTotal.forEach((item) => {
    item.innerHTML = totalCost.toFixed(2);

    console.log(cartCount);
  });

  // display empty cart if there are no items in the cart
  if (totalItems === 0) {
    emptyCart.style.display = "block";
    cartSummary.style.display = "none";
  } else {
    // hide empty cart message
    emptyCart.style.display = "none";

    // display cart summary
    cartSummary.style.display = "block";
    popUpModal.classList.add("visible");
  }

  cartItems.innerHTML = cart
    .map((item) => {
      const product = loadProducts[item.index];
      console.log(product);

      const productQuantity = item.quantity;
      console.log(productQuantity);

      const productTotal = product.price * productQuantity;
      console.log(productTotal);

      return `
      <div class="pt-4 d-flex align-items-center justify-content-between gap-3  border-bottom pb-3">
                <div class="cart-item">
                        <span class="cart-item-img">
                                 <img src="${product.image}" alt="" class="img-fluid">
                             </span>
                    <span>
                            <span class="cart-item-name">${product.name}</span>
                            <h4>
                                 <span class="total-amount">₦${productTotal.toFixed(2)}</span>
                                 <span><i class="bi bi-x"></i></span>
                                 <span class="product-count">${productQuantity}</span>
                             </h4>
                    </span>
             </div>
            <button class="action-btn" onclick="removeItem(${item.index}) "><i class="bi bi-x"></i></button>
        </div>
    `;
    })
    .join("");
}

if (hasStoreUi) {
  updateCart();
}

function placeOrder() {
  // Don't allow empty orders
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Your WhatsApp number
  const phoneNumber = "2348069033090";

  // Start the message
  let message = `🛒 NEW ORDER\n\n`;
  message += `Hello Eagles Tech, I would like to place an order:\n\n`;

  // Add each cart item
  cart.forEach((item, index) => {
    const product = loadProducts[item.index];

    const quantity = item.quantity;
    const productTotal = product.price * quantity;

    message += `${index + 1}. ${product.name}\n`;
    message += `Quantity: ${item.quantity}\n`;
    message += `Price: ₦${productTotal.toLocaleString()}.00\n\n`;
  });

  // Calculate total
  const total = cart.reduce((sum, item) => {
    return sum + loadProducts[item.index].price * item.quantity;
  }, 0);

  message += `💰 TOTAL: ₦${total.toLocaleString()}.00\n\n`;
  message += `Please let me know the next steps for payment.`;

  // Encode the message for a URL
  const encodedMessage = encodeURIComponent(message);

  // Create WhatsApp link
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");

  // reset cart
  cart = [];
  popUpModal.classList.remove("visible");

  // update the page
  updateCart();
}

if (orderBtn) {
  orderBtn.addEventListener("click", placeOrder);
}

// shows the cart summary
// cartBriefing.addEventListener("click", () =>{
//   popUpModal.classList.add("visible")
// })

// hides the cart summary
if (closeModal) {
  closeModal.addEventListener("click", (e) => {
    e.stopPropagation();
    popUpModal.classList.remove("visible");
    // updateCart();
  });
}

if (popUpModal) {
  popUpModal.addEventListener("click", (e) => {
    if (e.target === popUpModal) {
      popUpModal.classList.remove("visible");
    }
  });
}

// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

//Date Get Methods
// let today = new Date("2026-09-17T12:34:56")
// console.log(today);

// console.log(today.getFullYear());
