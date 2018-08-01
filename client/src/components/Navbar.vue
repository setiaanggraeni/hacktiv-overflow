<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="/">Hacktiv Overflow</a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="#" @click="timeline">Timeline</a>
      </li>
      </ul>
      <div v-if="seen">
        <form class="form-inline my-2 my-lg-0">
          <a @click="login" >Login</a>
        </form>
      </div>
      <div v-else>
        <form class="form-inline my-2 my-lg-0">
          <a @click="logout" >Logout</a>
        </form>
      </div>
        <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
    </div>
  </nav>
</template>

<script>
export default {
  name: 'forNavbar',
  props: [],
  data () {
    return {
      seen: true
    }
  },
  methods: {
    login () {
      this.seen = false
      this.$router.replace('/login')
    },
    timeline () {
      let token = localStorage.getItem("token")
      if(token){
        axios.get('http://localhost:3000/users/question', {
          headers: {
            token : localStorage.getItem("token")
          }
        })
        .then(response => {
          // console.log("========",response)
          this.questions = response.data
          this.$router.replace('/timeline')
        })
        .catch(function (error) {
          console.log(error)
        })
      } else{
        alert('Please login to view your timeline!');
        this.$router.replace('/login')
      }
    }
  }
}
</script>
