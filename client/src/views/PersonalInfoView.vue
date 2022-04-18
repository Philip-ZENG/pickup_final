<template>
  <section>
    <div class="personalInfo mt-5">
      <div class="container-sm p-5 my-5 bg-primary text-white text-center">
        <h1>Person Profile</h1>
        <p href="">upload new profile</p>
        <!-- <img src="" class="rounded-circle" ><sup v-on:click=""> upload new profile </sup>
        </div> -->
      </div>

      <div class="row">
          <div class="col-sm-5 p-4">
              User ID
          </div>

          <div class="col-sm-7 p-4">
              {{ userData[USER_DATA_INDEX].user_id }}
          </div>
      </div >

      <div class="row">
          <div class="col-sm-5 p-4">
              Username
          </div>

          <div class="col-sm-7 p-4">
              {{ userData[USER_DATA_INDEX].user_name }}
          </div>
      </div >

      <div class="row">
          <div class="col-sm-5 p-4">
              Email
          </div>

          <div class="col-sm-7 p-4">
              {{ userData[USER_DATA_INDEX].email }}
          </div>
      </div >

      <div class="row">
          <div class="col-sm-5 p-4">
              Gender
          </div>

          <div class="col-sm-7 p-4">
            {{ userData[USER_DATA_INDEX].gender }}
          </div>
      </div >

      <div class="row">
          <div class="col-sm-5 p-4">
              Contact Information
          </div>

          <div class="col-sm-7 p-4">
              {{ userData[USER_DATA_INDEX].contact_info }}
          </div>
      </div >

      <div class="row">
        <div class="col-sm-5 p-4">
          Bio
        </div>

        <div class="col-sm-7 p-4">
          <div class="card">
            <div class="card-body">{{ userData[USER_DATA_INDEX].personal_intro }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// here we need to fetch the data

const axios = require('axios').default;

const USER_INFO_URL = 'http://localhost:4000/personalInfo';

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
        .get(USER_INFO_URL, { user_id: this.user_id })
        .then((response) => {
          that.userData.push(response.data);
          that.USER_DATA_INDEX = 1;
        })
        .catch((error) => {
          console.log(error);
        });
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
