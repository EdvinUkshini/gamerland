<template>
    <v-container>
      <v-row no-gutters>
        <v-col :cols="12">
          <v-card-text
            class=""
            tile
            outlined
          >
            <v-card-title class="subheading ">Latest Products</v-card-title>
            <v-divider></v-divider>
            <div class="row">
              <template v-for="item in Products">
              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center" v-bind:key="item.id">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                >

                  <v-img
                    class="white--red align-end"
                    height="250px"
                    :src="getImage(item.imgpath)"
                  >
                  </v-img>
                    <v-card-title style="text-align:center;color:black;">{{item.name}}</v-card-title>
                  <v-card-text class="text--primary text-center">
                    <div>€{{ item.price }}</div>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn
                      :to="`/shop/${item.type}/${item._id}`"
                      class="ma-2"
                      outlined
                      color="info"
                    >
                      Explore
                    </v-btn>

                     
                  </div>
                  
                </v-card>
                </v-hover>
              </div>
              </template>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
</template>
<style>
.v-card__title {
   margin: 0px !important
}
</style>
<script>
import Products from "../services/Products"; 
export default {
  data() {
    return {
      Products: [], 
    };
  },
  methods: {
    retrieveProducts() { 
      Products.theLatest(4) 
        .then(response => {
          this.Products = response.data; 
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getImage(path) {
      return require("../assets/images/products/"+path)
    }
  },
  mounted() {
    this.retrieveProducts();
  }
};
</script> 