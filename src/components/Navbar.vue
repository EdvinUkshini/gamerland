     <template>
<v-content
  style="padding:0"
>
      <v-bottom-navigation
        style="background-color:#000000;"
        dark
        horizontal
      >
        <a href="/" class="v-btn">
          <span>Home</span>
        </a>
        <a href="/shop/Desktops" class="v-btn">
          <span>Desktops</span>
        </a>
        <a href="/shop/Laptops" class="v-btn">
          <span>Laptops</span>
        </a>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">
              <span>Parts</span>
            </v-btn>
          </template>
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :to="item.path"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-menu>
        <a href="/shop/Peripherals" class="v-btn">
          <span>Peripherals</span>
        </a>
      </v-bottom-navigation>
    </v-content>   
     </template>
<script>
    export default {
        name: 'Navbar',
        data () {
            return {
                items: [
                    { title: 'Cpu', path:'/shop/Cpu' },
                    { title: 'Ram', path:'/shop/Ram'},
                    { title: 'Gpu', path:'/shop/Gpu'},
                    { title: 'Storage', path:'/shop/Storage' },
                    { title: 'Motherboard', path:'/shop/Motherboard'},
                ],
            }
        },
        
    }
</script>