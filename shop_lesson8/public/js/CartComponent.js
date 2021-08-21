// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          imgCart: 'https://placehold.it/200x150',
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    //item.imgPath = `img/${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                //item.imgPath = `img/${item.id_product}.jpg`;
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },

        // cartCount() {
        //     return this.cartItems.reduce((summ, item) => summ + item.quantity, 0);
        //   },
        //   cartSumm() {
        //     return this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0);
        //   }
    },
    template: `
        <a href="cart.html" @click.prevent="showCart = !showCart" class="cart-button"><img src="img/cart.svg" alt="cart" class="link_transform">
            
                <div class="cart-block" v-show="showCart">
                    <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img_product" :cart-item="item" @remove="remove" @add="addProduct">
                    </cart-item>
                </div>
            
        </a>
`
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="shopping_product_mini">
        <img :src="cartItem.img_product" alt="product_photo" class="cart-img pic_block">
        <div class="shopping_product_info">
            <p class="shopping_product_heading_mini">{{ cartItem.product_name }}</p>
            <p class="shopping_product_text_mini">Price: <span class="pink_text">$ {{ cartItem.price }}</span></p>
            <p class="shopping_product_text_mini">Quantity: {{ cartItem.quantity }}&nbsp;
                <button @click.prevent="$emit('remove', cartItem)">&nbsp;-&nbsp;</button>
                <button @click.prevent="$emit('add', cartItem)">&nbsp;+&nbsp;</button>
                
            </p>
            <p class="shopping_product_text_mini">Total price: <span class="pink_text">$ {{ cartItem.price * cartItem.quantity }}</span></p>
        </div>
    </div>
    `
})