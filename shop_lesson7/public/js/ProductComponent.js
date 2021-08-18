Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           //imgProduct: 'https://placehold.it/200x150'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    //item.imgPath = `img/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="container fetured_box">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.img_product"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
                </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="fetured_item">
            <a href="product.html" class="fetured_item_link">
                <img :src="img" alt="fetured_item" class="fetured_item_pic">
                <div class="fetured_item_info">
                    <h3 class="fetured_item_heading">{{ product.product_name }}</h3>
                    <p class="fetured_item_text">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                    <p class="pink_text fetured_item_price">$ {{ product.price }}</p>
                </div>
            </a>
            <div class="add_box">
                <a href="#" class="add_link" @click.prevent="$emit('add-product', product)">
                    <img src="img/small_cart.png" alt="cart">
                    <p class="main_text add_text">Add to Cart</p>
                </a>
            </div>
        </div>
    `
})

{/* <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                <h3 class="forDesc">{{product.product_name}}</h3>
                <p class="forDesc">{{product.price}}</p>
                    <button class="buy-btn forDesc" @click="$emit('add-product', product)">Купить</button>
                </div>
            </div> */}
