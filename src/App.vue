<template>
  <div id="app">
    <div id="nav">
      <!-- <iframe src="localhost:8005/index" frameborder="0"></iframe> -->
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
      <event-page></event-page>
    </div>
    <router-view/>
  </div>
</template>

<script>
import EventPage from '@/views/EventPageEditing.vue';

export default {
  components: {
    EventPage,
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
