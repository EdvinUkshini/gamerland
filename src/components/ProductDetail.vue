<template>
  <v-container>
    <v-row>
      <v-col sm="15">
        <v-row no-gutters>
          <v-col
            cols="8"
            sm="6"
          >
            <v-card
              class="pa-2"
              outlined
              tile
            >
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
          <v-col
            class="d-flex" style="flex-direction:column"
          >
            <v-card
              outlined
              tile
              class="flex-grow-1"
            >
              <v-card-title>Ratings </v-card-title>
              <v-card-text><div class="text-center">
                  <v-rating
                    v-model="rating"
                    half-increments
                    background-color="indigo lighten-3"
                    color="indigo"
                    size="40"
                    readonly
                  ></v-rating>
                  <template v-if="rating != 0">
                  <p>This product has an average rating of {{ formatRating(rating) }} </p>
                  </template>
                  <template v-else>
                  <p>This product has not been rated yet.</p>
                  </template>
                  <v-divider />
                  <p>If you enjoyed this product, please take a few seconds to rate your experience with it. It really helps!</p>
                  <template v-if="isLoggedIn">
                  <GiveFeedback />
                  </template>
                  <template v-else>
                    <p>Please log in if you want to leave feedback</p>
                  </template>
              </div></v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card
          class="pa-2"
          outlined
          tile
        >
        <v-card-title>Feedbacks</v-card-title>
             <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="grey--text"
        multiple
      >
        <template v-for="(item, index) in feedbacks">
          <v-list-item :key="item._id">
            <template v-slot:default="{  }">
              <v-list-item-content>
                {{item.feedbacker}}
                  <v-spacer />
                <v-list-item-subtitle v-text="item.comment"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-rating
                  v-model="item.productRating"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  half-increments
                  hover
                  size="18"
                  readonly
                ></v-rating>

              <v-list-item-subtitle v-text="format_date(item.createdAt)"></v-list-item-subtitle>

              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < feedbacks.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios'
import {mapGetters} from "vuex"
import GiveFeedback from '../components/GiveFeedback'
import moment from 'moment'

  export default {
    components:{
      GiveFeedback,
    },
    data: () => ({
      rating:0,
      imgPath:"",
      product:[],
      feedbacks:[],
      selected: [],
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
              },
        getFeedbacks() {
          let sum = 0;
          axios
          .get(`http://localhost:4000/api/Feedback/${this.$route.params.pId}`)
          .then((response) => {

          this.feedbacks = response.data;
          console.log(this.feedbacks)

          if(response.data.length>0){
              for (var i = 0; i < response.data.length; i++) {
              sum = sum + response.data[i].productRating;
              }
              this.rating = sum/response.data.length;
          }
              
          })  
          
         },
         formatRating(number){
          return (Math.round(number * 100) / 100).toFixed(2)
         },
        format_date(value){
         if (value) {
           return moment(String(value)).startOf('day').fromNow();

          }
        },     
    },
         mounted () {
          this.getProduct();
          this.getFeedbacks();
         },
         computed:{
          ...mapGetters({
            getUser:"getUser",
            isLoggedIn:"isLoggedIn",

            
          })
        },
  }
</script>