<template>
  <v-container>
              <v-alert @if="actionResponse" :type="actionResponseType">
            {{ actionResponseMessage }}
          </v-alert>
    <v-fade-transition mode="out-in">
      <v-row justify="center">

        <v-col cols="8">
          <v-card>
            <v-img
              :src="imgPath"
                max-height="250"
                max-width="250"
              class="white darken-4"
            ></v-img>
            <v-card-title class="title">
              {{product.name}}
            </v-card-title>
            <br />
            <v-card-text><strong>Description:</strong>{{product.description}}</v-card-text>
            <v-card-text><strong>Price:</strong> ${{product.price}}
            <v-divider />
              <v-btn
                outlined
                color="info"
                class="mx-2"
                @click="getBack()"
              >
              <v-icon>mdi-arrow-left-circle</v-icon>
              </v-btn>
             <template v-if="isLoggedIn">
             <v-btn
                outlined
                color="info"
                class="mx-2"
              >
                 <v-icon>mdi-cart</v-icon>
              </v-btn>
            <v-btn
                outlined
                color="info"
                class="mx-2"
                @click="addToWishlist(product._id)"
              >
                 <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
             </template>
             <template v-else>
                Log In to add product to cart/wishlist
             </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>

</v-container>
</template>
<script>
import axios from 'axios'
import {mapGetters} from "vuex"
  export default {
    data: () => ({
      imgPath:"",
      product:[],
      actionResponse:false,
      actionResponseType:null,
      actionResponseMessage:"",
    }), 

    methods: {

        getProduct(){
            axios
            .get(`http://localhost:4000/api/Product/${this.$route.params.pId}`)
            .then(response => (this.product = response.data,
                              this.imgPath = require("../assets/images/products/"+response.data.imgpath)))
            .catch(e => { console.log(e);});
              },
        addToWishlist(pId){
            var data = {
                pId: pId,
                uId: this.getUser.id,
            };
            axios
            .post(`http://localhost:4000/api/Wishlist/`,data)
            .then(() => {
                this.actionResponse = true
                this.actionResponseType = "success"
                this.actionResponseMessage = "Item added to wishlist successfully"
            })

            .catch(e => { console.log(e);});
              },
              getBack(){
                this.$router.back();
              }
    
    
    },
          
         mounted () {
          this.getProduct();
         },
         computed:{
          ...mapGetters({
            getUser:"getUser",
            isLoggedIn:"isLoggedIn"
          })
        },
  }
</script>