<template>
  <div>
    <div class="form">
      <input v-model="title" placeholder="Title..." />
      <input v-model="description" placeholder="Description..." />
      <input v-model="sets" placeholder="Sets..." />
      <input v-model="repetitions" placeholder="Repetions..." />
      <p></p>
      <button @click="addWorkout">Upload</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      description: "",
      sets: null,
      repetitions: null,
      addItem: null
    };
  },
  methods: {
    async addWorkout() {
      try {
        // const formData = new FormData();
        let workout = await axios.post("/api/workout", {
          title: this.title,
          description: this.description,
          sets: this.sets,
          repetitions: this.repetitions
        });
        this.addItem = workout.data;
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
input,
textarea,
select {
  font-size: 18px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background: transparent;
  border: none;
  border-bottom: 1px dashed #83a4c5;
  width: 275px;
  text-align: center;
  outline: none;
  padding: 15px 5px 15px 15px;
  font-style: italic;
}

.form {
  margin: 0 auto;
  width: 550px;
  font-size: 16px;
  padding: 30px 30px 15px 30px;
}
</style>
