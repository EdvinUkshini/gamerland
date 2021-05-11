<template>
  <v-container>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            #
          </th>
          <th class="text-left">
            Type
          </th>
         <th class="text-left">
            Name
          </th>
         <th class="text-left">
            In stock #
         </th>
        <th class="text-left">
            Price
         </th>
        <th class="text-left">
            Actions
         </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in ProductsData"
          :key="item.id"
        >
          <td>                  
            <v-img
                max-height="100px"
                max-width="100px"
                :src="getImage(item.imgpath)"
            >
            </v-img>
          </td>
          <td>{{ item.type }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.price }} $</td>
          <td>
            <v-btn class="mx-2" color="indigo" style="margin-top:5px;color:#ffffff;text-decoration:none;" :to="`/shop/wishlist/${item._id}`">
            <v-icon left>
              mdi-arrow-top-right-bottom-left-bold
            </v-icon>
            View
          </v-btn>
          <v-btn class="mx-2" color="red" style="margin-top:5px;color:#ffffff;text-decoration:none;" @click="removeFromWishList(item._id)">
            <v-icon left>
              mdi-delete
            </v-icon>
            Remove
          </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: "Wishlist",
  data() {
    return {
      WishlistProductsId: [], 
      ProductsData:[],
    };
  },
  methods: {
    getWishlistProducts() {
        axios
        .get(`http://localhost:4000/api/Wishlist/${this.getUser.id}`)
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
            this.WishlistProductsId.push(response.data[i].productId)
            }
        })
        .then(() =>{
            for(var j=0;j<this.WishlistProductsId.length;j++){
                axios.get(`http://localhost:4000/api/Product/${this.WishlistProductsId[j]}`)
                .then((response) =>{
                    this.ProductsData.push(response.data)
                })
            }
        })
        .catch(e => { console.log(e);});
    },
    getImage(path) {
      return require("../assets/images/products/"+path)
    },

    removeFromWishList(pId){
      axios
        .delete(`http://localhost:4000/api/Wishlist/${pId}/${this.getUser.id}`)
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
            this.WishlistProductsId.push(response.data[i].productId)
            }
        })
        .catch(e => { console.log(e);});

        this.$router.go()
    },
  },
  created() {
    this.getWishlistProducts();
  },
    computed:{
      ...mapGetters({
        getUser: 'getUser'
        })
  },
};
</script>