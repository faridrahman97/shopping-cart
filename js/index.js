import { shoppingItems } from "./data.js";

let cartItems = []
const modal = document.getElementById('modal')

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        document.querySelector("#order-success").classList.add('hidden')
        document.querySelector("#order-page").classList.remove('hidden')
        addToCart(e.target.dataset.add)
    } else if (e.target.dataset.remove){
        removeFromCart(e.target.dataset.remove)
    } else if (e.target.id === 'complete-order-btn'){
        modal.classList.remove('hidden')
    } else if (e.target.id === 'close-modal-btn') {
        e.preventDefault()
        modal.classList.add('hidden')
    } else if (e.target.id === 'pay-btn'){
        e.preventDefault()
        modal.classList.add('hidden')
        cartItems = []
        document.querySelector("#order-page").classList.add('hidden')
        document.querySelector("#order-success").classList.remove('hidden')
    }
})

function renderItems(){
    let itemHtml = ''

    shoppingItems.forEach(function(item){
        itemHtml += `
        <div class = "item-options">
            <div class = "item-options-details">
                <p class= "item-emoji">${item.emoji}</p>
                <div>
                    <p class="item-name">${item.name}</p>
                    <p class="item-materials">${item.materials.join(", ")}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
            </div>
            <button data-add="${item.id}" class="add-btn btn">+</button>
        </div>
        `
    })
    document.querySelector("#order-items").innerHTML = itemHtml
}

function removeFromCart(itemId) {
    const targetItemObj = shoppingItems.filter(function(item){
        return item.id == itemId
    })[0]
    const index = cartItems.indexOf(targetItemObj);
    if (index > -1) {
        cartItems.splice(index, 1)
    }

    renderOrder(cartItems)

}

function addToCart(itemId){
    const targetItemObj = shoppingItems.filter(function(item){
        return item.id == itemId
    })[0]
    cartItems.push(targetItemObj)

    renderOrder(cartItems)
}

function renderOrder(cartItems){
    if (cartItems.length === 0){
        document.querySelector("#order-page").classList.add('hidden')
    }

    let orderItemHtml = ''
    let totalPrice = 0
    cartItems.forEach(function(item){
        orderItemHtml += `
        <div class="item-flex">
            <div class="order-flex">
                <p class = "item-name-order">${item.name}</p>
                <p data-remove=${item.id} class="remove-btn btn">remove</p>
            </div>
            <div>
                <p class="item-price-order">$${item.price}</p>
            </div>
        </div>
        `

        totalPrice += item.price
    })

    document.querySelector("#shopping-cart-items").innerHTML = orderItemHtml
    document.querySelector("#total-price").textContent = '$' + totalPrice
}


renderItems()