<template>
  <v-container>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Product
          </th>
          <th class="text-left">
            Shipped To
          </th>
         <th class="text-left">
            Amount
          </th>
         <th class="text-left">
            Actions
         </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in Orders"
          :key="item.id"
        >
          <td><router-link to="">View Product</router-link></td>
          <td>{{ shippingAddress }}</td>
          <td>{{ item.amount }} $</td>
          <td><v-icon small @click="deleteOrder(item.id)">mdi-delete</v-icon></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-container>
</template>

<script>
import MyOrders from "../services/MyOrders";
import { mapGetters } from 'vuex'
export default {
  name: "MyOrders",
  data() {
    return {
      Orders: [],   
      shippingAddress:'',     
    };
  },
  methods: {
    getMyOrderHistory() {
      MyOrders.getMyOrders(this.getUser.id)
        .then((response) => {
          this.Orders = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getOrderShippingAddress(){
        MyOrders.getMyShipping(this.getUser.id).then((response) =>{
            this.shippingAddress = response.data.address+","+response.data.city+","+response.data.country;
        }).catch((e) => {
          console.log(e);
        });
    },
    deleteOrder(id){
        MyOrders.deleteOrder(id)
        .catch(e => {
          console.log(e);
        });
        this.$router.go()
    },
  },
  mounted() {
    this.getMyOrderHistory();
    this.getOrderShippingAddress();
  },
    computed:{
      ...mapGetters({
        getUser: 'getUser'
        })
  },
};
</script>