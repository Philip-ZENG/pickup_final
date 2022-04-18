<template>
  <div class="personalInfo">
    <div class="container-fluid">
      <h1>Settings</h1>
    </div>
    <div class="card mx-auto">
      <div class="card-title text-center">Password Settings</div>
      <div class="card-body">
        <div id="alert" v-if="alert">{{ alert }}</div>
        <form @submit.prevent="checkOldPassword()">
          <label for="OriginPassword">
            Origin Password
            <input id="OriginPassword" v-model="password" placeholder="original password" />
          </label>
        </form>
        <form @submit.prevent="checkAndResetPassword">
          <label for="password1">
            Password
            <input id="password1" v-model="password" placeholder="new password" />
          </label>
          <br>
          <label for="password2">
            Confirm Your New Password
            <input id="password2" v-model="passwordVerify" placeholder="new password" />
          </label>
          <button type="submit" class="mx-auto" v-on:click="updatePassword">Reset password</button>
        </form>
      </div>
    </div>

    <div class="card mx-auto">
      <div class="card-title text-center">User Name</div>
      <div class="card-body">
        <div id="alert" v-if="alert">{{ alert }}</div>
        <form>
          <label for="userName">
            New User name
            <input id="userName" v-model="userName" placeholder="Your new user name" />
          </label>
          <button type="submit" class="mx-auto" v-on:click="updateUserName">Reset User Name</button>
        </form>
      </div>
    </div>

    <div class="card mx-auto">
      <div class="card-title text-center">Contact</div>
      <div class="card-body">
        <div id="alert" v-if="alert">{{ alert }}</div>
        <form>
          <label for="contact">
            New Contact
            <input id="contact" v-model="contact" placeholder="Your new contact Information" />
          </label>
          <button type="submit" class="mx-auto" v-on:click="updateContact">Reset contact</button>
        </form>
      </div>
    </div>
    <div class="card mx-auto">
      <div class="card-title text-center">Bio</div>
      <div class="card-body">
        <div id="alert" v-if="alert">{{ alert }}</div>
        <form>
          <label for="Bio">
            New Bio
            <input id="Bio" v-model="Bio" placeholder="Show Yourself more!" />
          </label>
          <button type="submit" class="mx-auto" v-on:click="updateBio">Update Bio</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default;

const SETTING_PASSWORD_URL = 'http://localhost:4000/setting/password';
const SETTING_NAME_URL = 'http://localhost:4000/setting/name';
const SETTING_CONTACT_URL = 'http://localhost:4000/setting/contact';
const SETTING_BIO_URL = 'http://localhost:4000/setting/bio';
// Initialize Userfront
// Userfront.init("demo1234");

export default {
  data() {
    return {
      originPassword: null,
      password: null,
      userName: '',
      Bio: '',
      contact: '',
      passwordVerify: '',
      alert: '',
    };
  },

  computed: {
    userId() {
      return Number(this.$store.getters.getUserId);
    },
  },

  methods: {
    checkAndResetPassword() {
      this.alert = '';
      // Verify that the passwords match

      if (this.password !== this.passwordVerify) {
        this.alert = 'Passwords must match';
        // return;
      }
      // Call Userfront.resetPassword()
      // Userfront.resetPassword({
      //   password: this.password,
      // }).catch((error) => {
      //   this.alert = error.message;
      // });
    },
    // checkOldPassword() {
    //   if (this.originPassword !== oldPassword) {
    //     this.alert = 'The Old Password is Incorrect!';
    //     // return;
    //   }
    // },

    updatePassword() {
      const keyword = this.password;
      const id = this.$store.getters.getUserId;
      axios.post(SETTING_PASSWORD_URL, { password: keyword, user_id: id });
      setTimeout(this.pageUpdate(), 250);
    },

    updateUserName() {
      const userNewName = this.userName;
      const id = this.$store.getters.getUserId;
      axios.post(SETTING_NAME_URL, { userName: userNewName, user_id: id });
      setTimeout(this.pageUpdate(), 250);
    },

    updateContact() {
      const contactInfo = this.contact;
      const id = this.$store.getters.getUserId;
      axios.post(SETTING_CONTACT_URL, { contact: contactInfo, user_id: id });
      setTimeout(this.pageUpdate(), 250);
    },

    updateBio() {
      const BioInfo = this.Bio;
      const id = this.$store.getters.getUserId;
      axios.post(SETTING_BIO_URL, { Bio: BioInfo, user_id: id });
      setTimeout(this.pageUpdate(), 250);
    },
  },
};
</script>

<style scoped>
button,
input {
  display: block;
  margin-bottom: 10px;
}

#alert {
  color: red;
  margin-bottom: 10px;
}
</style>
