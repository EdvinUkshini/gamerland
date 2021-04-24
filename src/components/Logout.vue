<template>
    <v-btn
          class="mx-2"
          color="#00cc6a"
          dark
          @click="logOut"
    >
          Log Out
    </v-btn>
</template>
<script>
  export default {
    name: 'Logout',
    data: () => ({
    }),
    methods:{
      async logOut() {
          this.$store.dispatch('logout');
        }
      },
  }
</script>
