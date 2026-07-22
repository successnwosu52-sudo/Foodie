// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn')
const navLinks = document.getElementById('navLinks')

menuBtn.addEventListener('click', (event) => {
  navLinks.classList.toggle('show')
  event.stopPropagation()
})

window.addEventListener('click', () => {
  if (navLinks.classList.contains('show')) {
    navLinks.classList.remove('show')
  }
})

// Filter Menu
const filterBtns = document.querySelectorAll('.filter-btn')
const menuItems = document.querySelectorAll('.menu-items')

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter
    filterBtns.forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
    menuItems.forEach((item) => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    })
  })
})

// Adding to cart(Menu Page)

// 1. Selects all add-to-cart buttons on the page
const cartButtons = document.querySelectorAll('.add-to-cart-btn')

// 2. Loop through each button and listen for a click
cartButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Stop any unexpected link or form behavior
    event.preventDefault()

    // 3. Extract the details directly from the clicked button's data attributes
    const id = parseInt(button.dataset.id)
    const name = button.dataset.name
    const price = parseFloat(button.dataset.price)

    // 4. Fetch the existing cart or create a blank one
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // 5. Check if the item is already added
    const exist = cart.find((i) => i.id === id)

    if (exist) {
      exist.qty++
    } else {
      cart.push({ id, name, price, qty: 1 })
    }

    // 6. Save data and run updates
    localStorage.setItem('cart', JSON.stringify(cart))

    if (typeof updateCartCount === 'function') updateCartCount()
    if (typeof showToast === 'function') showToast('Added to cart!')

    // added to cart pop-up
    function showToast(message) {
      let container = document.getElementById('toast-container')
      const toast = document.createElement('div')
      toast.innerText = message
      toast.className = 'toast'
      container.appendChild(toast)
      setTimeout(() => {
        toast.remove()
      }, 3000)
    }
  })

  function updateCartCount() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []

    const totalItems = savedCart.reduce((sum, item) => {
      return sum + (Number(item.qty) || 1)
    }, 0)

    const countElement = document.getElementById('cart-count')
    if (countElement) {
      countElement.innerText = totalItems
    }
  }

  document.addEventListener('DOMContentLoaded', updateCartCount)
})

// Loading cart
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const cartItems = document.getElementById('cart-items')
  const totalEl = document.getElementById('total-price')
  cartItems.innerHTML = ''
  let total = 0
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center py-10">Your cart is empty</p>' 
    totalEl.textContent = '0.00'
    return
  }
  cart.forEach(item => {
    total == item.price * item.qty
     const div = document.createElement('div')
     div.className = 'flex flex-col sm:flex-row items-center justify-between gap-4'
    div.innerHTML = `
      <div class="flex items-center gap-4">
        <div>
          <h4 class="font-semibold">${item.name}</h4>
          <p class="text-red-500">$${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
        <span class="px-3">${item.qty}</span>
        <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        <button class="remove-btn text-red-500" data-id="${item.id}">Remove</button>
      </div>`
      cartItems.appendChild(div)
  })
      totalEl.textContent = total.toFixed(2);
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('qty-btn')) {
    const id = parseInt(e.target.dataset.id)
    const action = e.target.dataset.action
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    const item = cart.find(i => i.id === id)
})
