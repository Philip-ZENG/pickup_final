<template>
  <section>
    <br>
    <div class="userInput">
      <p>Email Address</p>
      <input v-model="userAccount" placeholder="Email" />
      <p>Password</p>
      <input v-model="password" placeholder="Password" />
      <p></p>
      <button v-on:click="postMessage">Sign Up</button>
    </div>
    <br>
    <p>Already have an account? <router-link to="/login">Log In</router-link></p>
  </section>
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
