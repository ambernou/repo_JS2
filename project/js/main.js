const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = [...data];
                 this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class BasketList {
    constructor(container = ".basket"){
        this.container = container;
        this.goods = {};
        this._getProducts()
            .then(data => {
                this.goods = {data};
                this.render();
            });
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error =>{
                console.log(error);
            })
    }

    render() {
        // console.log(this.goods);
        // console.log(this.goods.data);
        // console.log(this.goods.data.amount);
        // console.log(this.goods.data.contents[0].price);
        let basketInfo = `<div class="basketInfo">
                            <p>Общая сумма: ${this.goods.data.amount} $<p>
                            <p>Общее количесто товаров ${this.goods.data.countGoods} шт.</p>
                        </div>`;
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML('beforeend', basketInfo);
        for (let product of this.goods.data.contents){
            //const productObj = new BasketItem(product);
            let basketEl = `<div class="basketEl data-id="${product.product_id}"">
                            <p>${product.product_name}<p>
                            <p>${product.price} $<p>
                            <p>${product.quantity} шт.</p>
                            </div>`;
            block.insertAdjacentHTML('beforeend', basketEl);
        }
    }
}

// class BasketItem {
//     render(){
//         return `<div class="product-item">
//                 <div class="desc">
//                     <h3>${product.product_name}</h3> // через отладчик эти параметры определяются, но не выводятся, ошибка. Не разобралась почему так
//                     <p>${product.price}$</p>
//                 </div>
//             </div>`
//     }
// }

let list = new ProductsList();
let basket = new BasketList();
//console.log(list.allProducts);