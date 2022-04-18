<template>
  <section>
    <div class="container-fluid p-4 bg-primary text-white">
      <h1>Create New Admin Account</h1>
    </div>
    <br>
    <form @submit.prevent="createAdminAccount">
      <label for="admin_email"
        >Admin Email <br> <input type="text" id="admin_email" v-model="admin_email"
      /></label>
      <br />
      <br />
      <label for="admin_password"
        >Admin Password <br> <input type="password" id="admin_password" v-model="admin_password"
      /></label>
      <br />
      <br />
      <button class="btn btn-primary">Register</button>
    </form>
    <br>
    <button class="btn btn-primary" @click="goToAdminAccouontManagement">Back</button>
  </section>
</template>

<script>
const axios = require('axios').default;

const CREATE_ADMIN_ACCOUNT = 'http://localhost:4002/createNewAdminAccount';

export default {
  data() {
    return {
      admin_email: null,
      admin_password: null,
    };
  },
  methods: {
    createAdminAccount() {
      axios
        .post(CREATE_ADMIN_ACCOUNT, {
          admin_email: this.admin_email,
          admin_password: this.admin_password,
        })
        .then((response) => {
          if (response.data.succeed) {
            alert('New Admin Account Created!');
            this.$router.push('/adminAccountList');
          }
        });
    },
    goToAdminAccouontManagement() {
      this.$router.push('/adminAccountList');
    },
  },
};
</script>
