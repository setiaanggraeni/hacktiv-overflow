<template>
  <div class="home">
    <ForNavbar/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ForNavbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    ForNavbar
  }
}
</script>
