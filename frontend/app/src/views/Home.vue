<template>
  <div class="home">
    <font-awesome-icon icon="utensils" size="10x" />
    <p v-on:click="getResponse()">{{ data }}</p>
    <p v-on:click="getTime()">{{ time }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      data: "Click me",
      time: "Click me too"
    };
  },
  methods: {
    getResponse() {
      axios
        .get("http://localhost:5000/helloworld")
        .then((res) => {
          this.data = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getTime() {
      axios
        .get("http://localhost:5000/time")
        .then((res) => {
          this.time = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};
</script>
