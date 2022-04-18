<template>
  <div class="personalInfo mt-5">
    <div class="container-sm p-5 my-5 bg-primary text-white text-center">
      <h1>Person Profile</h1>
      <img src="" class="rounded-circle" ><sup v-on:click=""> upload new profile </sup>
      </div>
      <div >
    </div>

    <div class="row">
        <div class="col-sm-5 p-4">
            User ID
        </div>

        <div class="col-sm-7 p-4">
            {{ userData.user_id }}
        </div>
    </div >

    <div class="row">
        <div class="col-sm-5 p-4">
            Username
        </div>

        <div class="col-sm-7 p-4">
            {{ userData.user_name }}
        </div>
    </div >

    <div class="row">
        <div class="col-sm-5 p-4">
            {Email}
        </div>

        <div class="col-sm-7 p-4">
            {{ userData.email }}
        </div>
    </div >

    <div class="row">
        <div class="col-sm-5 p-4">
            Gender
        </div>

        <div class="col-sm-7 p-4">
            
        <img src="" class="rounded-circle">

        </div>
    </div >

    <div class="row">
        <div class="col-sm-5 p-4">
            Contact Information
        </div>

        <div class="col-sm-7 p-4">
            {{ userData.contact_info }}
        </div>
    </div >

    <div class="row">
        <div class="col-sm-5 p-4">
            Bio
        </div>

        <div class="col-sm-7 p-4">

            <div class="card">
                <div class="card-body">{{ userData.personal_intro }}</div>
            </div>
        
        </div>
    </div >

  </div>
</template>

<script>
// here we need to fetch the data

const axios = require('axios').default;

const USER_INFO_URL = 'http://localhost:4000/personalInfo';

export default {
    data() {
        return {
            USER_Data: {},
        };
    },

    provide() {
        return {
            userData: this.USER_Data,
        };
    },

    methods: {
    getUserInfo() {
      const that = this;
      axios
        .get(USER_INFO_URL, { user_id: this.user_id })
        .then((response) => {
          that.USER_Data.push(response.data);
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
        this.user_id = this.$route.params.user_id;
        this.user_id.push(this.$route.params.user_id);
    }
}
</script>
