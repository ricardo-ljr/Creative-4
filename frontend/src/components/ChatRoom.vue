<template>
  <div>
    <h1>Gym Chat - This is a place where you can chat with your fellow gymmates.</h1>
    <br />
    <h2>**WORK IN PROGRESS**</h2>
    <div id="app">
      <div v-if="state == 0">
        <h3>Welcome! Please put your name in</h3>
        <form @submit.prevent="setUsername">
          <input type="text" placeholder="Username..." v-model="username" />
          <input type="submit" value="Join" />
        </form>
        <button @click="continueWithoutUsername">Join as a Guest</button>
      </div>
      <div v-if="state == 1">
        <ul id="chatbox">
          <li v-for="message in messages" v-bind:key="message">
            <b>{{ message.user }}:</b>
            {{ message.message }}
          </li>
        </ul>
        <form @submit.prevent="sendMessage">
          <input type="text" placeholder="Message..." v-model="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
var socket = null;
export default {
  data() {
    return {
      messages: [],
      message: "",
      username: "",
      state: 0,
      socket: io()
    };
  },
  methods: {
    sendMessage: function() {
      socket.emit("message", this.message);
      for (let i = 0; i < this.messages.length; i++) {
        console.log(this.messages[i]);
      }
      this.message = "";
    },
    setUsername: function() {
      socket.emit("join", this.username);
      this.username = "";
      this.state = 1;
    },
    continueWithoutUsername: function() {
      socket.emit("join", null);
      this.state = 1;
    }
  },
  created: function() {
    socket = io();
  },
  mounted: function() {
    socket.on("message", function(message) {
      this.messages.push(message);
      this.$nextTick(function() {
        var messageBox = document.getElementById("chatbox");
        messageBox.scrollTop = messageBox.scrollHeight;
      });
    });
  }
};
</script>

<style scoped>
#chatbox {
  height: 200px;
  max-width: 400px;
  overflow-y: scroll;
}
</style>
