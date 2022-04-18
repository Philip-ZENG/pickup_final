<template>
<div class="personalInfo">
    <div class="container-fluid">
        <h1>Settings</h1>
    </div>
    <div class="card mx-auto">
        <div class="card-title text-center"> Password Settings </div>
        <div class="card-body">
            <div id="alert" v-if="alert">{{ alert }}</div>
                <form @submit.prevent="checkOldPassword()">
                  <label>
                      Origin Password
                      <input type="OriginPassword" v-model="password" />
                  </label>
                </form>
                <form @submit.prevent="checkAndResetPassword">
                    <label>
                        Password
                        <input type="password" v-model="password" />
                    </label>
                    <label>
                        Re-type password
                        <input type="passwordVerify" v-model="passwordVerify" />
                    </label>
                    <button type="submit">Reset password</button>
                </form>
        </div>
    </div>

    <div class="card mx-auto">
        <div class="card-title text-center"> User Name</div>
        <div class="card-body">
            <div id="alert" v-if="alert">{{ alert }}</div>
                <label>
                    New User name
                    <input type="userName" v-model="passwordVerify" />
                </label>
                <button type="submit">Reset User Name</button>
        </div>
    </div>

    <div class="card mx-auto">
        <div class="card-title text-center">Contact</div>
        <div class="card-body">
            <div id="alert" v-if="alert">{{ alert }}</div>
                <label>
                    New Contact
                    <input type="contact" v-model="passwordVerify" />
                </label>
                <button type="submit">Reset contact</button>
        </div>
    </div>

    <div class="card mx-auto">
        <div class="card-title text-center">Bio</div>
        <div class="card-body">
            <div id="alert" v-if="alert">{{ alert }}</div>
                <label>
                    New Bio
                    <input type="Bio" v-model="passwordVerify" />
                </label>
                <button type="submit">Update Bio</button>
        </div>
    </div>
        
</div>
</template>


<script>
  const axios = require('axios').default;
  const SETTING_URL = "http://localhost:4000/setting"
  // Initialize Userfront
  // Userfront.init("demo1234");

  export default {
    data() {
      return {
        originPassword: null,
        password: null,
        userName: "",
        Bio: "",
        contact: "",
        passwordVerify: "",
        alert: "",
      };
    },
    methods: {
      checkAndResetPassword() {
        this.alert = "";
        // Verify that the passwords match

        if (this.password !== this.passwordVerify) {
          this.alert = "Passwords must match";
          return;
        }
        // Call Userfront.resetPassword()
        Userfront.resetPassword({
          password: this.password,
        }).catch((error) => {
          this.alert = error.message;
        });
      },
    },

    checkOldPassword(oldPassword){
      if (this.originPassword !== oldPassword) {
        this.alert = "The Old Password is Incorrect!"
        return;
      }
    },
    
    updatePassword(){
      const keyword = this.password;
      axios.post(SETTING_URL, {password: keyword });
      setTimeout(this.pageUpdate(), 250);
    },

    updateUserName(){
      const user_name = this.userName;
      axios.post(SETTING_URL, { userName: user_name });
      setTimeout(this.pageUpdate(), 250);
    },

    updateContact(){
      const contactInfo = this.contact;
      axios.post(SETTING_URL, { contact: contactInfo });
      setTimeout(this.pageUpdate(), 250);
    },

    updateBio(){
      const BioInfo = this.Bio;
      axios.post(SETTING_URL, { Bio: BioInfo });
      setTimeout(this.pageUpdate(), 250);
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

