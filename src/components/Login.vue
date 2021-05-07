<template>
    <v-dialog
      v-model="Login"
      persistent
      max-width="400px"
    >
      <template v-slot:activator="{ on, Login }">
        <v-btn
          class="mx-2"
          color="#00cc6a"
          dark
          v-bind="Login"
          v-on="on"
          mx-2
        >
          Log In
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Log In</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                    <v-alert v-show="LogInResponse" type="error">
                    {{LogInMessage}}
                    </v-alert>
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
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="Login = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="logIn"
          >
            Log In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import AuthService from '@/services/AuthService.js';
  export default {
    name: 'Login',
    data: () => ({
      Login: false,
      email:"",
      password:"",
      LogInResponse:false,
      LogInMessage:"",
    }),
    methods:{
    async logIn() {
        try {
              const credentials = {
                email: this.email,
                password: this.password
              };
                const response = await AuthService.login(credentials);
                this.Login = false;
                this.LogInMessage = response.msg;
                const token = response.token;
                const user = response.user;
                this.$store.dispatch('login', { token, user });
                this.$emit('LogInClick')
            } catch (error) {
                this.LogInResponse = true;
                this.LogInMessage = error.response.data.msg;
            }
        }
      },
  }
</script>