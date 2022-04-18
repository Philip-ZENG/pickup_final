<template>
  <div class="personalInfo">
    <div class="container-fluid p-4 bg-primary text-white">
      <h1>Personal Information</h1>
    </div>
    <div class="row">
        <div class="col-sm-5 p-4">
          <h1>User ID</h1>
        </div>

        <div class="col-sm-7 p-4">
          <h2>{{ userData[USER_DATA_INDEX].user_id }}</h2>
        </div>
    </div >

    <div class="row">
        <div class="col-sm-5 p-4">
          <h1>Username</h1>
        </div>

        <div class="col-sm-7 p-4">
          <h2>{{ userData[USER_DATA_INDEX].user_name }}</h2>
        </div>
    </div >

    <div class="row">
        <div class="col-sm-5 p-4">
          <h1>Email</h1>
        </div>

        <div class="col-sm-7 p-4">
          <h2>{{ userData[USER_DATA_INDEX].email }}</h2>
        </div>
    </div >

    <div class="row">
        <div class="col-sm-5 p-4">
          <h1>Gender</h1>
        </div>

        <div class="col-sm-7 p-4">
          <h2>{{ userData[USER_DATA_INDEX].gender }}</h2>
        </div>
    </div >

    <div class="row">
        <div class="col-sm-5 p-4">
          <h1>Contact Information</h1>
        </div>

        <div class="col-sm-7 p-4">
           <h2>{{ userData[USER_DATA_INDEX].contact_info }}</h2>
        </div>
    </div >

    <div class="row">
      <div class="col-sm-5 p-4">
        <h1>Bio</h1>
      </div>

      <div class="col-sm-7 p-4">
        <!-- <div class="card w-50"> -->
          <h2>{{ userData[USER_DATA_INDEX].personal_intro }}</h2>
        <!-- </div> -->
      </div>
    </div>

    <div class="row">
      <div class="col-sm-5 p-4">
        <h1>Image Profile</h1>
      </div>

      <div class="col-sm-7 p-4">
        <button class="btn btn-primary" @click="uploadImage">Upload Your Image</button>
      </div>
    </div>
  </div>
</template>

<script>
// here we need to fetch the data

const axios = require('axios').default;

const USER_INFO_URL = 'http://localhost:4004/getUserInfo';

export default {
  data() {
    return {
      user_id: null,
      USER_DATA_INDEX: 0,
      userData: [
        {
          user_id: null,
          user_name: null,
          email: null,
          gender: null,
          contact_info: null,
          personal_intro: null,
        },
      ],
    };
  },
  methods: {
    getUserInfo() {
      const that = this;
      axios
        .post(USER_INFO_URL, { user_id: this.user_id })
        .then((response) => {
          that.userData.push(response.data);
          that.USER_DATA_INDEX = 1;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadImage() {
      // Up load your image
    },
  },

  mounted() {
    this.getUserInfo();
  },

  created() {
    this.user_id = this.$store.getters.getUserId;
  },
};
</script>

<style scoped>
p {
  text-align: left;
  font-size: medium;
  font-family: Arial;
}
</style>
