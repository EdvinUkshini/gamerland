<template>
    <v-dialog
      v-model="Register"
      persistent
      max-width="400px"
    >
      <template v-slot:activator="{ on, Register }">
        <v-btn
          class="mx-2"
          color="#00cc6a"
          dark
          v-bind="Register"
          v-on="on"
          mx-2
        >
          Sign Up
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Sign Up</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                    <v-alert v-show="SignUpResponse" type="error">
                    {{SignUpMessage}}
                    </v-alert>
              <v-col cols="12">
                <v-text-field
                  label="First Name*"
                  required
                  v-model="firstname"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Last Name*"
                  required
                  v-model="lastname"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Confirm Password*"
                  type="password"
                  v-model="cpassword"
                  required
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="Register = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="signUp"
          >
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import AuthService from '@/services/AuthService.js';
  export default {
    name: 'Register',
    data: () => ({
      Register: false,
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      cpassword:"",
      SignUpResponse:false,
      SignUpMessage:"",
    }),
    methods:{
      async signUp() {
        try {
          const credentials = {
            firstname: this.firstname,
            lastname:this.lastname,
            email:this.email,
            password: this.password,
            cpassword:this.cpassword,
          };
          const response = await AuthService.signUp(credentials);
          this.Register = false;
          this.SignUpMessage = response.msg;
          } catch (error) {
            this.SignUpResponse = true;
            this.SignUpMessage = error.response.data.msg;
          }
        }
      },
  }
</script>