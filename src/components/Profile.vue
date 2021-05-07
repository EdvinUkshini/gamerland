<template>
<div>
   <v-row justify="center">
    <v-dialog
      v-model="Profile"
      max-width="350px"
    >
      <template v-slot:activator="{ on, Profile }">
        <v-btn
          icon
          v-bind="Profile"
          v-on="on"
          mx-2
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Profile</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="margin:20px 0px;">
          <v-row justify="center">
          <template v-if="isLoggedIn">
          <v-btn
            class="mx-2"
            dark
            mx-2
            @click="SignOut" 
          >
           Sign Out
          </v-btn>
          <v-btn
            class="mx-2"
            mx-2
            style="background-color:#00cc6a;color:#ffffff;"
          >
           My Orders
          </v-btn>
          <v-btn
            class="mx-2"
            tile
            dark
            color="indigo"
            style="margin-top:5px;color:#ffffff;text-decoration:none;"
            href="/profile"
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            Edit Profile
          </v-btn>
          </template>
          <template v-else>
              <Login @LogInClick="Profile=false"/>
              <div id="buttonSpacer" />
              <Register @SignUpClick="Profile=false"/>
            </template>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="Profile = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>
<style>

</style>
<script>
import {mapGetters} from "vuex"
import Login from "../components/Login"
import Register from "../components/Register"
   export default {
        name: 'Profile',
        components:{
          Login,
          Register,
        },
        data () {
          return {
            Profile: false,
            }
        },
        computed:{
          ...mapGetters({
            getUser:"getUser",
            isLoggedIn:"isLoggedIn"
          })
        },
        methods:{
         SignOut:function(){
          this.Profile = false;
          this.$store.dispatch('logout');
        }
      }, 
    }
</script>