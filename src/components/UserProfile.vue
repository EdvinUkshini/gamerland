<template>
<v-container>
  <v-card>

    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        User Informations
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-truck
        </v-icon>
        Shipping Informations
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-pencil
        </v-icon>
        Add/Edit shipping Informations
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
<p><strong>First Name:</strong> {{ MyData.firstname}}</p>
<p><strong>Last Name:</strong> {{ MyData.lastname}}</p>
<p><strong>Email:</strong> {{ MyData.email}}</p>
<p><strong>Registered on:</strong> {{ format_date(MyData.registered)}}</p>
<p><strong>Last login on:</strong> {{ format_date(MyData.last_login)}}</p>

          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template v-if="hasShippingAddress">
              <p><strong>Address:</strong> {{ MyShippingAddress.address}}</p>
              <p><strong>City:</strong> {{ MyShippingAddress.city}}</p>
              <p><strong>Country:</strong> {{ MyShippingAddress.country}}</p>
              <p><strong>Zip Code:</strong> {{ MyShippingAddress.zipCode}}</p>
              <p><strong>Phone Number:</strong> {{ MyShippingAddress.phoneNumber}}</p>
            
                <v-btn
      color="red"
      depressed
      style="color:white"
      @click="deleteShippingAddress()"
    >
      <v-icon left>
        mdi-delete
      </v-icon>
      Delete
    </v-btn>
            </template>
            <template v-else>
              You have no shipping address
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template v-if="!hasShippingAddress">
            <v-form
                ref="form"
            >
              <v-text-field
                v-model="address"
                label="Address"
                :value="MyShippingAddress.address"
                required
              ></v-text-field>
              <v-text-field
                v-model="city"
                label="City"
                required
              ></v-text-field>
              <v-text-field
                v-model="country"
                label="Country"
                required
              ></v-text-field>
              <v-text-field
                type="number"
                v-model="zipcode"
                label="Zip Code"
                required
              ></v-text-field>
              <v-text-field
                type="number"
                v-model="phonenumber"
                label="Phone Number"
                required
              ></v-text-field>             
              <v-btn
                color="error"
                class="mr-4"
                @click="reset"
              >
                Reset Form
              </v-btn>
              <v-btn
                color="success"
                class="mr-4"
                @click="SubmitForm"
              >
                Submit
              </v-btn>
            </v-form>
            </template>
            <template v-else>
              Delete your current one to get a new one
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
  </v-container>
</template>
<script>
import UserProfile from "../services/UserProfile";
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: "UserProfile",
  data() {
    return {
      MyData: [],
      MyShippingAddress: [],
      hasShippingAddress:false,
      address:'',
      city:'',
      country:'',
      zipcode:'',
      phonenumber:'',
    };
  },
  methods: {
    retrieveData() {
      UserProfile.getMyInformations(this.getUser.id)
        .then(response => {
          this.MyData = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getMyShippingAddress() {
      UserProfile.getMyShipping(this.getUser.id)
        .then(response => {
          this.MyShippingAddress = response.data;
          this.hasShippingAddress = true
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteShippingAddress(){
        UserProfile.deleteMyShipping(this.getUser.id)
        .catch(e => {
          console.log(e);
        });
        this.hasShippingAddress = false
        this.$router.go()
    },
        SubmitForm() {
      var data = {
        userid: this.getUser.id,
        address: this.address,
        city: this.city,
        country: this.country,
        zipcode: this.zipcode,
        phonenumber: this.phonenumber,
      };

      UserProfile.addShipping(data)
        .catch(e => {
          console.log(e);
        });
        this.$router.go()
    },
      reset () {
        this.$refs.form.reset()
      },
    format_date(value){
         if (value) {
           return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a');
          }
      },
  },
  computed:{
      ...mapGetters({
        getUser: 'getUser'
        })
  },
  mounted() {
    this.retrieveData();
    this.getMyShippingAddress();
  }
};
</script>