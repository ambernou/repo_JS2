Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" placeholder="search" v-model="userSearch" class="search_field">
                <button type="submit" class="cart_button">
                    <img src="../img/search.svg" alt="search" class="link_transform">
                </button>
            </form>`
})
// `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
//                 <input type="text" placeholder="поиск" class="search-field" v-model="userSearch">
//                 <button type="submit" class="btn-search">
//                     <i class="fas fa-search"></i>
//                 </button>
//             </form>`