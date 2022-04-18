<template>
  <section>
    <h1>Admin Account Management Console</h1>
    <div>
      <h3>Admin Id</h3>
      <P>{{ admin_id }}</P>
    </div>
    <div>
      <h3>Admin Email</h3>
      <P>{{ admin_email }}</P>
    </div>
    <form @submit.prevent="setNewAdminPassword">
      <label for="user_id"
        >Set New Password For Admin Account<input type="password" v-model="new_admin_password"
      /></label>
      <button class="btn btn-primary">Set</button>
    </form>
    <br />
    <button class="btn btn-danger" @click="deleteAdmin">Delete</button>
    <br />
    <br />
    <button class="btn btn-primary" @click="toAdminAccountList">Back</button>
  </section>
</template>

<script>
const axios = require('axios').default;

const ADMIN_DATA_URL = 'http://localhost:4002/getAdminData';
const SET_NEW_ADMIN_PASSWORD = 'http://localhost:4002/setNewAdminPassword';
const DELETE_ADMIN_ACCOUNT = 'http://localhost:4002/deleteAdmin';

export default {
  data() {
    return {
      admin_id: null,
      ADMIN_ACCOUNT_INDEX: 0,
      new_admin_password: '',
      ADMIN_DATA: [
        {
          admin_id: null,
          admin_email: null,
        },
      ],
    };
  },
  computed: {
    admin_email() {
      return this.ADMIN_DATA[this.ADMIN_ACCOUNT_INDEX].admin_email;
    },
  },
  methods: {
    /**
     * @description
     * Redirect to admin management page
     */
    toAdminAccountList() {
      this.$router.push('/adminAccountList');
    },
    /**
     * @description
     * Return user info of a specific admin account with the provided admin_id
     */
    getAdminData() {
      const that = this;
      axios
        .post(ADMIN_DATA_URL, { admin_id: this.admin_id })
        .then((response) => {
          that.ADMIN_DATA.push(response.data);
          that.ADMIN_ACCOUNT_INDEX = 1;
        });
    },
    /**
     * @description
     * Set admin account password to a new valleu
     */
    setNewAdminPassword() {
      axios
        .post(SET_NEW_ADMIN_PASSWORD, {
          admin_id: this.admin_id,
          new_admin_password: this.new_admin_password,
        })
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
    deleteAdmin() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to delete this admin account?')) {
        axios.post(DELETE_ADMIN_ACCOUNT, { admin_id: this.admin_id }).then((response) => {
          if (response.data.succeed) {
            alert('Admin Account Deleted');
            this.$router.push('/adminAccountList');
          }
        });
      }
    },
  },
  mounted() {
    this.getAdminData();
  },
  created() {
    this.admin_id = this.$store.getters['adminAccountManagement/getAdminId'];
  },
};
</script>
