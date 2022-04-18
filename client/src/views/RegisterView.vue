<template>
<div class="container">
  <br>
  <div class="box">
    <div class="about">
      <header><strong>Sign Up</strong></header>
    </div>
    <div class="userInput">
      <p>Email Address</p>
      <input v-model="userAccount" placeholder="Email" />
      <p>Password</p>
      <input v-model="password" placeholder="Password" />
      <p></p>
      <button v-on:click="postMessage" class="btn btn-primary">Sign Up</button>
    </div>
    <br>
    <p>Already have an account? <router-link to="/login">Log In</router-link></p>
    <br>
  </div>
</div>
</template>

<script>
const axios = require('axios').default;

const REGISTER_URL = 'http://localhost:4000/register';

export default {
  name: 'RegisterView',
  data() {
    return {
      email: null,
      count: null,
      userAccount: null,
      password: null,
    };
  },
  methods: {
    postMessage() {
      const account = this.userAccount;
      const keyword = this.password;
      axios.post(REGISTER_URL, { userAccount: account, password: keyword });
      setTimeout(this.pageUpdate(), 500);
    },
  },
};
</script>

<style scoped>
header {
  top: 25px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 80%;
  max-width: 40rem;
}
.box {
  height: 40%;
  width: 33%;
  margin: auto;
  position: relative;
  background-color: #FFF6EA;
  border-radius: 10px;
}
.container {
  position: relative;
}
</style>
