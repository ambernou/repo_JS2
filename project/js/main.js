class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        this.getSum();
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    // ДЗ_1 получаем сумму товаров
    getSum() {
        let sum = 0;
        //this.goods.forEach(function(product){
        this.goods.forEach(product => {
            sum += product.price;
        });
        console.log(sum);
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
//           block.innerHTML += item.render();
        }
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductList();

// ДЗ_2 методы для корзины и товаров
class Cart {
    // предполагаю, что возможно класс корзины будет наследоваться от ProductList
    // то есть, те же методы: 
    fetchProducts(){} // получение списка товаров 

    render(){} // вывод верстки товаров в корзине

    getSum(){} // получение общей суммы товаров в корзине

    // возможно, ещё нужно добавить свой метод:
    clear(){} // очистить всё содержимое корзины

    // кроме того, методы чтобы скрыть и показать содержимое блока корзины:
    show(){}

    hide(){}
}

class CartItem {
    delete(){} // удалить элемент из списка товаров корзины и, соответственно, из верстки

    getSumProduct(){} // получить стоимость товара в зависимости от его количества
}

//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);