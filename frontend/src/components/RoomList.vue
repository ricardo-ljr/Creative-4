<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Room List
      </h2>
      <b-table striped hover :fields="fields" :items="rooms">
        <template slot="actions" slot-scope="row">
          <b-btn size="sm" @click.stop="join(row._id)">Join</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" v-bind:key="error">
          {{ error.message }}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "BookList",
  data() {
    return {
      fields: {
        room_name: { label: "Room Name", sortable: true, class: "text-center" },
        actions: { label: "Action", class: "text-center" }
      },
      rooms: [],
      errors: []
    };
  },
  created() {
    axios
      .get(`http://localhost:3000/api/room`)
      .then(response => {
        console.log(response.data);
        this.rooms = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    join(id) {
      this.$router.push({
        name: "JoinRoom",
        params: { id: id }
      });
    }
  }
};
</script>
