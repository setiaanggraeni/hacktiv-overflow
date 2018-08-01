<template>
  <div>
    <div class="card" style="width: 18rem;">
      <div v-for="question in questions" v-bind:key="question['.key']">
        <div class="card-body">
          <!-- {{question}} -->
          <h5 class="card-title">Card title</h5>
          <p class="card-text">{{question.thequestion}}</p>
        </div>
        <ul class="list-group list-group-flush" v-for="theanswer in answer" v-bind:key="theanswer['.key']">
          <li class="list-group-item">{{theanswer.theAnswer}}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link"><i class="far fa-thumbs-down"></i></a>
          <a href="#" class="card-link"><i class="far fa-thumbs-up"></i></a>
          <a href="#" class="card-link" @click="comment">Comment</a>
      </div>
      </div>
    </div>
    <div v-if="seen">
      <form>
        <textarea v-model="theAnswer"></textarea>
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  data () {
    return {
      questions: [],
      answer: [],
      theAnswer: '',
      seen: false
    }
  },
  mounted () {
    this.getAllQuestion()
    this.getAllAnswer()
  },
  methods: {
    getAllQuestion () {
      let token = localStorage.getItem("token")
      if(token){
        axios.get('http://localhost:3000/users/question', {
          headers: {
            token : localStorage.getItem("token")
          }
        })
        .then(response => {
          // console.log("===== masuk g ===", response)
          this.questions = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      } else{
        alert('Please login to view your timeline!')
        this.$router.replace('/login')
      }
    },
    getAllAnswer () {
      let token = localStorage.getItem('token')
      if(token){
        axios.get('http://localhost:3000/users/answer', {
          headers: {
            token : localStorage.getItem('token')
          }
        })
        .then(response => {
          // console.log("===== masuk g answer ===", response)
          this.answer = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        alert('Please login to view your timeline!')
      }
    },
    comment () {
      this.seen = true
      let token = localStorage.getItem('token')
      if (token) {
        axios.post(`http://localhost:3000/users/answer/${this.questions[0]._id}`, {
          theAnswer: this.theAnswer
        }, {
          headers: {
           token: localStorage.getItem("token")
          }
        })
        .then(newComment => {
          console.log(newComment)
        })
        .catch(err => {
          alert('Failed to add comment!')
        })
      }
    }
  }
}
</script>
