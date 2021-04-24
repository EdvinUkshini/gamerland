<template>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="black"
      dark
    >
      <v-toolbar-title
        style="width: 350px"
      >
        <a href="/" class="white--text" style="text-decoration: none"><v-icon>mdi-cart</v-icon>&nbsp;GamerLand</a>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down pl-10 ml-4"
      />
      <v-spacer />
      
      <div class="dropdown">
  <b-dropdown id="dropdown-offset" offset="25"  class="m-2"
  
  >
    
    <template v-slot:button-content> 
      <v-icon>mdi-cart</v-icon>

    </template>
  </b-dropdown>
</div>

    </v-app-bar>
    </template>

<script>
  

  
</script>