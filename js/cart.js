const cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem (item))









function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length 
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
  }
}

function displayTotalPrice(item) {
  const totalQuantity = document.querySelector("#totalQuantity")
  totalQuantity.textContent = item.quantity
}

function displayItem(item) {
  const article = makeArticle(item)
  const imageDiv = makeImageDiv(item)
  article.appendChild(imageDiv)
  const cartItemContent = makeCartContent(item)
  article.appendChild(cartItemContent)
  displayArticle(article)
  displayTotalQuantity(item)
  displayTotalPrice()
}

function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}

function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}

function makeCartContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)

  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
  
}  

function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")
  addQuatityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}

function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  p.textContent = "supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}

function deleteItem(item){
  console.log("item to delete", item)
  const itemToDelete = cart.find(item =>item.id)
}

function addQuatityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent ="Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity

  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
  

  quantity.appendChild(input)
  settings.appendChild(quantity)
}

function updatePriceAndQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = Number(newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}

function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}

function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement("div")
  h2.textContent = item.name
  const p = document.createElement("p")
  p.textContent = item.color
  const p2 = document.createElement("p")
  p2.textContent = item.price + "€"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
  
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("cart__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}

function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")
  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}
