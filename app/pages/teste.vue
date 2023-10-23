<template>
  <div class="hello">
    <input type="text" v-model="id" />
    <button v-on:click="validate()">Send</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    axios({
      method: "GET",
      url: "https://localhost/session",
      withCredentials: true,
    }).then(
      (result) => {
        this.id = result.data.id;
      },
      (error) => {
        console.error(error.response.data);
      }
    );
  },
  methods: {
    validate() {
      axios({
        method: "POST",
        url: "https://localhost/session",
        data: { session: this.id },
        headers: { "content-type": "application/json" },
        withCredentials: true,
      })
        .then((result) => {
          alert(JSON.stringify(result.data));
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },
  },
};
</script>

<style scoped></style>
