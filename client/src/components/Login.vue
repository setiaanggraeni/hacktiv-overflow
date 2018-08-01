<template>
  <div class="form-group col-md-8" style="margin-left:20%;margin-top:10%">
    <h3>Login</h3>
    <label for="exampleInputEmail1">Email</label>
    <input type="text" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Email">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" v-model="password" placeholder="Password">
    <button @click="login" style="border-radius:5px; background-color:pink">Login</button>
  </div>
</template>

<script>
export default {
  name: 'loginForm',
  props: [],
  data () {
    return {
      email: '',
      password: '',
      rawData: []
    }
  },
  methods: {
    login(){
      axios.post('http://localhost:3000/users/login', {
        email: this.email,
        password: this.password
      })
      .then(user => {
        if(user !== null){
          localStorage.setItem('token', user.data.token)
            this.$router.replace('/')
        } 
        else {
          alert('Wrong email/password!')
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
