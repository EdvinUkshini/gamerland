<template>
  <v-row justify="center">
    <v-dialog
      v-model="giveFeedback"
      persistent
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Give Feedback
        </v-btn>
      </template>
<v-card
    class="elevation-16 mx-auto"
    width="300"
  >
    <v-card-title class="headline">
      Give product feedback
    </v-card-title>
    <v-card-text>

      <div class="text-center mt-12">
        <v-rating
          v-model="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          large
        ></v-rating>
        <v-col cols="12">
         <v-textarea
            v-model="comment"
            label="Comment"
            required
         ></v-textarea>
        </v-col>
      </div>
    </v-card-text>
    <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="giveFeedback = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submitFeedback()"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from 'axios'
import {mapGetters} from "vuex"
  export default {
    data: () => ({
      giveFeedback: false,
      rating:0,
      comment:'',
    }),
    methods:{
      submitFeedback(){
            var data = {
                productId: this.$route.params.pId,
                productRating: this.rating,
                comment: this.comment,
                feedbacker:this.getUser.email
            };
            axios
            .post(`http://localhost:4000/api/Feedback/`,data)
            .then(() => {
                this.$router.go();
            })
            .catch(e => { console.log(e);});
        },
    },
    computed:{
        ...mapGetters({
        getUser:"getUser",
        isLoggedIn:"isLoggedIn",
        })
    },
  }
</script>