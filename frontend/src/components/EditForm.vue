<template>
  <div>
    <div class="form">
      <input v-model="title" placeholder="Title..." />
      <input v-model="description" placeholder="Description..." />
      <input v-model="sets" placeholder="Sets..." />
      <input v-model="repetitions" placeholder="Repetions..." />
      <p></p>
      <button @click="editWorkout(id)">Upload</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      newtitle: "",
      newdescription: "",
      newsets: null,
      newrepetitions: null,
      editItem: null
    };
  },
  created: function() {
    this.getWorkouts();
  },
  methods: {
    async getWorkouts() {
      try {
        let response = await axios.get("/api/workout" + this.$route.params.id);
        console.log(response._id);
        this.workouts = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editWorkout(id) {
      try {
        // const formData = new FormData();
        let workout = await axios.put("/api/workout" + id, {
          newtitle: this.title,
          newdescription: this.description,
          newsets: this.sets,
          newrepetitions: this.repetitions
        });
        this.editItem = workout.data;
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
