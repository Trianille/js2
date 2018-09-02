function cartSection() {
    const el = document.createElement('div');
    el.classList.add('cart');

    const addItem = addItemRender();
    const cart = cartRender();
    el.appendChild(cart);
    document.querySelector('.container').appendChild(el);
}

function addItemRender() {
    const el = document.createElement('div');
    el.classList.add('cart-add');

    return el;
}

function cartRender() {
    const data = {
        id_user: '123'
    };

    const el = document.createElement('div');
    el.classList.add('cart-items');
    getUserCart(data);

    return el;
}

function getUserCart(data) { //userid
    const form = new FormData();
    form.append('json', JSON.stringify(data));

    fetch('http://localhost:3000/cart.get', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
        const items = document.querySelector('.cart-items');
        for (let item of obj.basket) {
            const el = document.createElement('div');
            el.classList.add('item');
            el.innerHTML = '<div class="item-name">id: ' +
                item.id_product +
                '</div><div class="item-price">price: ' +
                item.price +
                '</div><div><button class="btm-item-delete" onClick="deleteItemFromCart(' +
                item.id_product +
                ')">Delete?</button></div>';
            items.appendChild(el);
        }
        const total = document.createElement('div');
        total.classList.add('total');
        total.innerHTML = 'total: ' + obj.amount;
        items.appendChild(total);
    });
}

function addItemToCart(data) { //id_product, quantity
    const form = new FormData();
    form.append('json', JSON.stringify(data));

    fetch('http://localhost:3000/cart.get', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
    });
}

function deleteItemFromCart(data) { //id_product, new full price??
    const form = new FormData();
    form.append('json', JSON.stringify(data));

    fetch('http://localhost:3000/cart.delete', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
    });
}