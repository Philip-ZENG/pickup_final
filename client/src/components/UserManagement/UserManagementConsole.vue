<template>
  <section>
    <div class="container-fluid p-4 bg-primary text-white">
      <h1>User Management</h1>
    </div>
    <br>
    <div class="row">
      <div class="col-sm-5 p-4">
        <h2>User ID</h2>
      </div>
      <div class="col-sm-7 p-4">
        <h2>{{ user_id }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-4">
        <h2>Email</h2>
      </div>
      <div class="col-sm-7 p-4">
        <h2>{{ email }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-4">
        <h2>User Name</h2>
      </div>
      <div class="col-sm-7 p-4">
        <h2>{{ user_name }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-4">
        <h2>Gender</h2>
      </div>
      <div class="col-sm-7 p-4">
        <h2>{{ gender }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-4">
        <h2>Contact Info</h2>
      </div>
      <div class="col-sm-7 p-4">
        <h2>{{ contact_info }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-4">
        <h2>Personal Introduction</h2>
      </div>
      <div class="col-sm-7 p-4">
        <h2>{{ Personal_intro }}</h2>
      </div>
    </div >
    <br />
    <div class="row">
      <div class="col-sm-5 p-4">
        <h2>Set New Password For User</h2>
      </div>
      <div class="col-sm-7 p-4">
      <form @submit.prevent="setNewUserPassword">
        <label for="user_id"><input type="password" v-model="new_user_password" /></label>
        <button class="btn btn-primary m-2">Set</button>
      </form>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-4">
        <h1>Action</h1>
      </div>
      <div class="col-sm-7 p-4">
        <button class="btn btn-danger m-2" @click="deleteUser ">Delete</button>
        <button class="btn btn-primary m-2" @click="toAdminConsole">Back</button>
      </div>
    </div >
    <br>
  </section>
</template>

<script>
const axios = require('axios').default;

const USER_INFO_URL = 'http://localhost:4002/getUserInfo';
const SET_NEW_PASSWORD = 'http://localhost:4002/setNewPassword';
const DELETE_USER = 'http://localhost:4002/deleteUser';

export default {
  data() {
    return {
      user_id: null,
      USER_INFO_INDEX: 0,
      new_user_password: '',
      // dumy data is to prevent loading error (loading from database needs time)
      USER_INFO: [
        {
          user_id: null,
          email: null,
          password: null,
          user_name: null,
          gender: null,
          contact_info: null,
          personal_intro: null,
        },
      ],
    };
  },
  computed: {
    email() {
      return this.USER_INFO[this.USER_INFO_INDEX].email;
    },
    user_name() {
      return this.USER_INFO[this.USER_INFO_INDEX].user_name;
    },
    gender() {
      return this.USER_INFO[this.USER_INFO_INDEX].gender;
    },
    contact_info() {
      return this.USER_INFO[this.USER_INFO_INDEX].contact_info;
    },
    Personal_intro() {
      return this.USER_INFO[this.USER_INFO_INDEX].personal_intro;
    },
  },
  methods: {
    /**
     * @description
     * Redirect to admin console page
     */
    toAdminConsole() {
      this.$router.push('/adminConsole');
    },
    /**
     * @description
     * Return user info of a specific user with the provided user_id
     */
    getUserInfo() {
      const that = this;
      axios
        .post(USER_INFO_URL, { user_id: this.user_id })
        .then((response) => {
          that.USER_INFO.push(response.data);
          that.USER_INFO_INDEX = 1;
        });
    },
    /**
     * @description
     * Set user password to a new valleu
     */
    setNewUserPassword() {
      axios
        .post(SET_NEW_PASSWORD, { user_id: this.user_id, new_password: this.new_user_password })
        .then((response) => {
          if (response.data.succeed) {
            alert('Password Change succeed!');
          }
        });
    },
    /**
     * @description
     * Delete User
     */
    deleteUser() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to delete this user?')){
        axios
          .post(DELETE_USER, { user_id: this.user_id })
          .then((response) => {
            if (response.data.succeed) {
              alert('User Deleted');
              this.$router.push('/adminConsole');
            }
          });
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
  created() {
    this.user_id = this.$store.getters['userManagement/getUserId'];
  },
};
</script>
