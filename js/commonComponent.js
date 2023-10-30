function addNavBar() {
    document.write(`  
    `)
}
function addFooter() {
    document.write(`
    
    `)
}

function addButton(content, icon, bgcolor) {
    document.write(`
      <button>${content}</button>
    `)
}

function addButton(content, bgcolor) {
    document.write(`
      <button>${content}</button>
    `)
}

function addIconButton(iconname, bgcolor) {

}
function addPagination(paginationitems) {

}

function addProduct(product) {

}

function addQuantity(quantity) {
    document.write(`
          <button class="quantity-button" onclick="decrement()">-</button>
        <span id="quantity">${quantity}</span>
        <button class="quantity-button" onclick="increment()">+</button>
    `)

}
function addBreadCrump(url) {

}


export { addNavBar, addFooter, addButton, addIconButton, addPagination, addProduct, addQuantity, addBreadCrump };