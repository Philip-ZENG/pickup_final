<template>
  <section>
    <br>
    <div class="userInput">
      <p>Email Address</p>
      <input v-model="userAccount" placeholder="Email" />
      <p>Password</p>
      <input v-model="password" placeholder="Password" />
      <p></p>
      <button v-on:click="userLogin">User Login</button>
      <br><br>
      <button @click="adminLogin">Admin Login</button>
    </div>
    <br>
    <p>Don’t have an account? <router-link to="/register">Sign Up</router-link></p>
    <br>
    <button @click="userTest">User Test</button>
    <br>
    <br>
    <button @click="adminTest">Amin Test</button>
    <br>
    <br>
    <button @click="goToHomeAsGuest">Visit As Guest</button>
  </section>
</template>

<script>
const axios = require('axios').default;

const LOGIN_URL = 'http://localhost:4000/login';
const ADMIN_LOGIN_URL = 'http://localhost:4000/adminLogin';

export default {
  name: 'LoginView',
  data() {
    return {
      userAccount: null,
      password: null,
    };
  },
  methods: {
    userLogin() {
      const account = this.userAccount;
      const keyword = this.password;
      axios
        .post(LOGIN_URL, { userAccount: account, password: keyword })
        .then((response) => {
          console.log(response);
          this.$store.dispatch('setUserId', { user_id: response.data.user_id });
          this.$store.dispatch('setIsLogIn', { isLogIn: true });
          this.$store.dispatch('setIsUser', { isUser: true });
          this.$router.push('/userHome');
        });
    },
    // login successfully as admin
    adminLogin() {
      const adminEmail = this.userAccount;
      const adminPassword = this.password;
      axios
        .post(ADMIN_LOGIN_URL, { admin_email: adminEmail, admin_password: adminPassword })
        .then((response) => {
          if (response.data.adminLoginSucceed) {
            this.$store.dispatch('setAdminId', { admin_id: 1 });
            this.$store.dispatch('setIsLogIn', { isLogIn: true });
            this.$store.dispatch('setIsGuest', { isUser: false });
            this.$store.dispatch('setIsAdmin', { isAdmin: true });
            this.$router.push('/adminConsole');
          } else {
            alert('The email or password is incorrect.');
          }
        });
    },
    userTest() {
      this.$store.dispatch('setUserId', { user_id: 1 });
      this.$store.dispatch('setIsLogIn', { isLogIn: true });
      this.$store.dispatch('setIsGuest', { isUser: false });
      this.$store.dispatch('setIsUser', { isUser: true });
      this.$router.push('/userHome');
    },
    adminTest() {
      this.$store.dispatch('setAdminId', { admin_id: 1 });
      this.$store.dispatch('setIsLogIn', { isLogIn: true });
      this.$store.dispatch('setIsGuest', { isUser: false });
      this.$store.dispatch('setIsAdmin', { isAdmin: true });
      this.$router.push('/adminConsole');
    },
    goToHomeAsGuest() {
      this.$store.dispatch('setIsGuest', { isGuest: true });
      this.$router.push('/userHome');
    },
  },
};
</script>
