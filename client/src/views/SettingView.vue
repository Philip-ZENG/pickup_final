<template>
<div class="personalInfo">
    <div class="container-fluid">
        <h1>Settings</h1>
    </div>
    <div class="card mx-auto">
        <div class="card-title text-center"> Password Settings </div>
        <div class="card-body">
            <div id="alert" v-if="alert">{{ alert }}</div>

                <label>
                    Origin Password
                    <input type="OriginPassword" v-model="password" />
                </label>

                <form @submit.prevent="checkAndResetPassword">
                    <label>
                        Password
                        <input type="password" v-model="password" />
                    </label>
                    <label>
                        Re-type password
                        <input type="password" v-model="passwordVerify" />
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
  // Initialize Userfront
  Userfront.init("demo1234");

  export default {
    data() {
      return {
        originPassword: "",
        password: "",
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

        checkOldPassword(){},
        updatePassword(){},
        updateUserName(){},
        updateContact(){},
        updateBio(){},
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

