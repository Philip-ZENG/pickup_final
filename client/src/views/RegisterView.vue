<template>
  <section>
    <div class="about">
      <h1>This is the register page</h1>
    </div>

    <div class="userInput">
      <p>Email Address</p>
      <input v-model="userAccount" placeholder="Email" />
      <p>Password</p>
      <input v-model="password" placeholder="Password" />
      <p></p>
      <button v-on:click="postMessage">Register</button>
    </div>
    <br>
    <button @click="goToLogin">GoToLogin</button>
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
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>
