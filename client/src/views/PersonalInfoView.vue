<template>
  <div class="personalInfo">
    <div class="container-fluid p-4 heading">
      <h1>Personal Information</h1>
    </div>
    <div class="card mx-auto m-4 account_info_block" style="border-color: #9198e5; border-width: 2px">
      <div class="row">
        <div class="col-sm-6 p-4 mt-3">
          <h3 style="text-align: left">User ID</h3>
        </div>
        <div class="col-sm-6 p-4 mt-3">
          <h3>{{ userData[USER_DATA_INDEX].user_id }}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 p-4">
          <h3 style="text-align: left">Username</h3>
        </div>

        <div class="col-sm-6 p-4">
          <h3>{{ userData[USER_DATA_INDEX].user_name }}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 p-4">
          <h3 style="text-align: left">Email</h3>
        </div>

        <div class="col-sm-6 p-4">
          <h3>{{ userData[USER_DATA_INDEX].email }}</h3>
        </div>
      </div>
    </div>

    <div class="card mx-auto m-4 personal_info_block" style="border-color: #9198e5; border-width: 2px">
      <div class="row">
        <div class="col-sm-6 p-4">
          <h3 style="text-align: left">Gender</h3>
        </div>

        <div class="col-sm-6 p-4">
          <h3>{{ userData[USER_DATA_INDEX].gender }}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 p-4">
          <h3 style="text-align: left">Contact Information</h3>
        </div>

        <div class="col-sm-6 p-4">
          <h3>{{ userData[USER_DATA_INDEX].contact_info }}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 p-4">
          <h3 style="text-align: left">Bio</h3>
        </div>
        <div class="col-sm-6 p-4">
          <h3>{{ userData[USER_DATA_INDEX].personal_intro }}</h3>
        </div>
      </div>
    </div>
    <div class="card mx-auto m-4 image_block" style="border-color: #9198e5; border-width: 2px">
      <div class="row">
        <div class="col-sm-6 image-box" >
          <h3 style="text-align: left">Image Profile</h3>
          <br>
          <button class="btn btn-primary img-upload-button btn-lg" @click="uploadImage">
            Upload Your Image
          </button>
        </div>

        <div class="col-sm-6 p-4">
          <div class="image-holder"></div>
        </div>
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
.heading {
  background-color: #9198e5;
  /* background-image: linear-gradient(to bottom right, #9198e5, #64e6bf); */
}
.account_info_block {
  border-radius: 30px;
  padding: 0 5%;
  width: 60%;
}
.personal_info_block {
  border-radius: 30px;
  padding: 0 5%;
  width: 60%;
}
.image_block {
  border-radius: 30px;
  padding: 0 5%;
  width: 60%;
  height: 250px;
}
.image-holder {
  width: 200px;
  height: 200px;
  background-color: bisque;
  margin: auto;
}
.img-upload-button {
  position: relative;
  display: block;
}
.image-box {
  padding-top: 70px;
}
</style>
