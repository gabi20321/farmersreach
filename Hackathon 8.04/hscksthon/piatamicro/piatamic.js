
let cartItems = [];

const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

addToCartBtns.forEach(addToCartBtn => {
  addToCartBtn.addEventListener('click', () => {
    console.log('Clicked "Add to Cart" button');
    const productId = addToCartBtn.dataset.id;
    const product = {
      id: productId,
      name: addToCartBtn.parentElement.querySelector('span').textContent,
      price: addToCartBtn.parentElement.querySelector('h3').textContent,
    };
    console.log(`Added product to cart: ${JSON.stringify(product)}`);
    addToCart(product);
  });
});


function addRemoveBtnListener(removeBtn) {
  removeBtn.addEventListener('click', () => {
    console.log('Clicked "Remove" button');
    const itemId = removeBtn.dataset.id;
    removeItem(itemId);
  });
}


function addToCart(product) {
  console.log('Adding product to cart...');
  const existingCartItem = cartItems.find(item => item.id === product.id);
  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }
  console.log(`Cart items: ${JSON.stringify(cartItems)}`);
  updateCart();
}

function removeItem(itemId) {
  console.log('Removing item from cart...');
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1);
    updateCart();
  }
}

function updateCart() {
  console.log('Updating cart...');
  const cartTotalElem = document.getElementById('cart-total');
  const cartItemsElem = document.getElementById('cart-items');
  let cartTotal = 0;
  cartItemsElem.innerHTML = '';
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} (${item.quantity}) - ${item.price}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeItem(item.id);
    });
    li.appendChild(removeBtn);

    console.log(`Item price: ${item.price}`);
    console.log(`Item quantity: ${item.quantity}`);
    const itemPrice = parseFloat(item.price.replace('$', ''));
    console.log(`Item price as float: ${itemPrice}`);
    cartItemsElem.appendChild(li);
    cartTotal += itemPrice * item.quantity;
  });
  console.log(`Cart total: ${cartTotal}`);
  cartTotalElem.textContent = `$${cartTotal.toFixed(2)}`;
}


const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
  const paymentAmount = parseFloat(document.getElementById('cart-total').textContent.slice(1));
  processPayment(paymentAmount);
});

function processPayment(paymentAmount) {
  
}