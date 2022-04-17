<template>
  <section>
    <h1>This is visitor home</h1>
    <button @click="goToLogIn">Login</button>
    <br>
    <br>
    <button @click="goToRegister">Register</button>
    <br>
    <br>
    <button @click="goToHomeAsGuest">Visit As Guest</button>
  </section>
</template>

<script>
export default {
  methods: {
    goToLogIn() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToHomeAsGuest() {
      this.$store.dispatch('setIsGuest', { isGuest: true });
      this.$router.push('/userHome');
    },
  },
};
</script>
