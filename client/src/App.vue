<template>
  <section>
    <section>
      <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd">
        <div class="container-fluid">
          <a class="navbar-brand">PickUp</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav" v-if="getIsUser">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="http://localhost:8080/#/userHome">Home</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Activity Management
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/activityCreation"
                      >Create Activity</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/activityList"
                      >My Activity List</a
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Personal Center
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/personalInfo"
                      >Personal Information</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/setting">Setting</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="http://localhost:8080/#/notification">Store Monitor</a>
              </li>
            </ul>
            <ul class="navbar-nav" v-if="getIsAdmin">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="http://localhost:8080/#/adminConsole">Manage User Account</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="http://localhost:8080/#/adminAccountList">Manage Admin Account</a>
              </li>
            </ul>
          </div>
          <ul style="list-style-type:none;">
            <li class="nav-item" v-if="getIsUser || getIsAdmin">
              <button class="btn btn-primary" @click="logout">Logout</button>
            </li>
            <li class="nav-item" v-if="getIsGuest">
              <button class="btn btn-primary" @click="redirectToLogIn">Login</button>
            </li>
          </ul>
        </div>
      </nav>
    </section>
    <router-view />
  </section>
</template>

<script>
export default {
  computed: {
    getIsLogIn() {
      return this.$store.getters.getIsLogIn;
    },
    getIsUser() {
      return this.$store.getters.getIsUser;
    },
    getIsGuest() {
      return this.$store.getters.getIsGuest;
    },
    getIsAdmin() {
      return this.$store.getters.getIsAdmin;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('setIsLogIn', { isLogIn: false });
      this.$store.dispatch('setIsUser', { isUser: false });
      this.$store.dispatch('setIsAdmin', { isAdmin: false });
      this.$store.dispatch('setUserId', { userId: null });
      this.$store.dispatch('setIsGuest', { isGuest: true });
      this.$router.push('/userHome');
    },
    redirectToLogIn() {
      this.$store.dispatch('setIsGuest', { isGuest: false });
      this.$router.push('/login');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
