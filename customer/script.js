let customers_items = []


function addToCart(id){
    const item = findItemById(id)
    if(item){
        let existingItem = customers_items.find(i => i.id === item.id)
        if(existingItem){
            existingItem.quantity++
        }else{
            customers_items.push({...item, quantity: 1})
        }
    }
    updateCart()

}

function updateCart() {



}




const findItemById = (id) => {
    const key = Object.keys(items.items).find(user => items.items[user].id === '1')
    return items.items[key]
}
  
