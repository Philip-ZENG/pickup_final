<template>
  <section>
    <h1>User Management Console</h1>
    <div>
      <h3>User Id</h3>
      <P>{{ user_id }}</P>
    </div>
    <div>
      <h3>Email</h3>
      <P>{{ email }}</P>
    </div>
    <div>
      <h3>User Name</h3>
      <P>{{ user_name }}</P>
    </div>
    <div>
      <h3>Gender</h3>
      <P>{{ gender }}</P>
    </div>
    <div>
      <h3>Contact Information</h3>
      <P>{{ contact_info }}</P>
    </div>
    <div>
      <h3>Personal Introduction</h3>
      <P>{{ Personal_intro }}</P>
    </div>
    <br />
    <form @submit.prevent="setNewUserPassword">
      <label for="user_id"
        >Set New Password For
        User<input type="password" v-model="new_user_password" /></label
      >
      <button class="btn btn-primary">Set</button>
    </form>
    <br>
    <button class="btn btn-danger" @click="deleteUser">Delete</button>
    <br>
    <br>
    <button class="btn btn-primary" @click="toAdminConsole">Back</button>
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
