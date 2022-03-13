<template>
  <div class="home">
    <Slideshow />
    <LatestProducts />
  </div>
</template>

<script>
// @ is an alias to /src
import Slideshow from '@/components/Slideshow.vue'
import LatestProducts from '@/components/LatestProducts.vue'

export default {
  name: 'Home',
  components: {
    Slideshow,LatestProducts
  }
}
</script>
