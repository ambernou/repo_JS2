class Hamburger {
    constructor(container) {
        this.container = container;
        this.burgers = [];
        this.topping = [];
        this.fetchBurgers();
        this.fetchTopping();
        this.render();
        this.renderTopping();
    }

    fetchBurgers() {
        this.burgers = [
            {id: 1, name: "Маленький гамбургер", price: 50, calories: 20},
            {id: 2, name: "Большой гамбургер", price: 100, calories: 40},
            {id: 3, name: "Сыр", price: 10, calories: 20},
            {id: 4, name: "Салат", price: 20, calories: 5},
            {id: 5, name: "Картофель", price: 15, calories: 10},
        ]
    }

    fetchTopping() {
        this.topping = [
            {id: 6, name: "Приправа", price: 15, calories: 0},
            {id: 7, name: "Полить майонезом", price: 20, calories: 5},
        ]
    }

    render() {
        const block = document.querySelector(this.container);
        for(let burger of this.burgers){
            const item = new BurgerItem(burger);
            block.insertAdjacentHTML("beforeend",item.render());
        }
    }

    renderTopping() {
        const block = document.querySelector(".topping");
        for(let burger of this.topping){
            const item = new BurgerItem(burger);
            block.insertAdjacentHTML("beforeend",item.render());
        }
    }

}

class BurgerItem{
    constructor(burger){
        this.id = burger.id;
        this.name = burger.name;
        this.price = burger.price;
        this.calories = burger.calories;
    }

    render(){
        return `<div class=menu-item>
                    <h3>${this.name}</h3>
                    <p>${this.price} руб.</p>
                    <p>${this.calories} калорий</p>
                    <button data-productId="${this.id}">Добавить</button>
                </div>`;
    }
}

let menu = new Hamburger(".menu");

let addToOrder = document.querySelectorAll("[data-productId]");
let orderList = {};

//addTopping.addEventListener("click", menu.renderTopping());

// addToOrder.forEach(add => {
//     add.addEventListener("click", console.log("1"));
// });
