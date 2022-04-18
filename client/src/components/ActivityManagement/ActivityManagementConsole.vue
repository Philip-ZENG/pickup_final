<template>
  <section>
    <div class="container-fluid p-4 bg-primary text-white">
      <h1>Activity Management</h1>
   </div>
   <br>
   <div class="row">
      <div class="col-sm-5 p-3">
        <h1>Title</h1>
      </div>
      <div class="col-sm-7 p-3">
        <h2>{{ title }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-3">
        <h1>Time</h1>
      </div>
      <div class="col-sm-7 p-3">
        <h2>{{ time }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-5 p-3">
        <h1>Location</h1>
      </div>
      <div class="col-sm-7 p-3">
        <h2>{{ location }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-3">
        <h1>Type</h1>
      </div>
      <div class="col-sm-7 p-3">
        <h2>{{ type }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-3">
        <h1>Max Capacity</h1>
      </div>
      <div class="col-sm-7 p-3">
        <h2>{{ max_capacity }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-3">
        <h1>Quota Left</h1>
      </div>
      <div class="col-sm-7 p-3">
        <h2>{{ quota_left }}</h2>
      </div>
    </div >
    <div class="row">
      <div class="col-sm-5 p-3">
        <h1>Description</h1>
      </div>
      <div class="col-sm-7 p-3">
        <h2>{{ description }}</h2>
      </div>
    </div >
    <member-list></member-list>
    <div class="row">
      <div class="col-sm-5 p-3">
        <h1>Actions</h1>
      </div>
      <div class="col-sm-7 p-3">
        <button class="btn btn-primary m-2 " type="button" @click="quitActivity">Quit</button>
        <button class="btn btn-primary m-2" type="button" @click="toActivityList">Back</button>
        <div v-if="showTerminate">
          <button class="btn btn-danger" type="button" @click="terminate">
            Terminate
          </button>
        </div>
      </div>
    </div >

  </section>
</template>
<script>
import MemberList from './MemberList.vue';

export default {
  /** Manager Functionality
   * *Change manager: OK
   * *Quit from the activity : OK
   * *Terminate the activity: OK
   * *Delete member : OK
   * *Activate activity
   * *Deactivate activity
   * *Go back to activity list page: OK
   */
  /** Member Functionality
   * *Quit from the activity: OK
   * *Go back to activity list page: OK
   */
  components: {
    'member-list': MemberList,
  },
  props: {
    title: { type: String, required: true },
    time: { type: String, required: true },
    quota_left: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    max_capacity: { type: Number, required: true },
    description: { type: String, required: true },
  },
  inject: [
    // Data
    'userId',
    'userRole',
    'activityInfo',
    // Methods
    'deleteMember',
    'terminateActivity',
  ],
  computed: {
    /**
     * @description
     * Return the activity data, since loading takes time, we need to use a dummy data to prevent
     * the error of accessing undefined attributes
     */
    activityData() {
      if (this.activityInfo.length === 1) {
        return this.activityInfo[0];
      }
      return this.activityInfo[1];
    },
    /**
     * @description
     * Show the terminate button if the user is the manager
     */
    showTerminate() {
      return this.userRole[0] === 'MANAGER';
    },
  },
  methods: {
    /**
     * @description
     * Navigate back to the activity list page of the user
     */
    toActivityList() {
      // eslint-disable-next-line
      this.$router.push('/activityList');
    },
    /**
     * @description
     * Quit from the activity
     */
    quitActivity() {
      // Check whether the manager is the user
      if (this.userRole[0] === 'MANAGER') {
        alert(
          'Set another member as Manager for this activity before yuo quit. Or if you want to terminate the activity, press the "Terminate" button',
        );
      } else {
        // eslint-disable-next-line
        if (confirm('Are you sure that you want to quit this activity?')) {
          this.deletMember(this.userId);
        }
      }
    },
    /**
     * @description
     * Terminate the activity
     */
    terminate() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to terminate this activity?')) {
        this.terminateActivity();
      }
    },
  },
};
</script>
