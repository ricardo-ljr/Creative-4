<template>
  <div class="home">
    <section class="add-button">
      <router-link to="/add-workout" tag="button">Add Workout</router-link>
    </section>
    <section class="workouts">
      <div class="workout-card" v-for="workout in workouts" :key="workout.id">
        <h2>{{ workout.title }}</h2>
        <p>Instructions: {{ workout.description }}</p>
        <p>Sets: {{ workout.sets }}</p>
        <p>Repetitions: {{ workout.repetitions }}</p>
        <button @click="deleteWorkout(workout)">Completed</button>
        <button @click="showForm()">Edit Workout</button>
        <my-modal v-show="modal">
          <div>
            <div class="form">
              <input v-model="title" placeholder="Title..." />
              <input v-model="description" placeholder="Description..." />
              <input v-model="sets" placeholder="Sets..." />
              <input v-model="repetitions" placeholder="Repetions..." />
              <p></p>
              <button
                @click="
                  editWorkout(workout);
                  hideForm();
                "
              >Upload</button>
            </div>
          </div>
        </my-modal>
      </div>
      <div>
        <a href="https://github.com/ricardo-ljr/Creative-4" target="_blank">Github</a>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "Home",

  data() {
    return {
      modal: false,
      workouts: [],
      findWorkout: null
    };
  },
  created() {
    this.getWorkouts();
  },
  methods: {
    showForm() {
      this.modal = true;
    },
    hideForm() {
      this.modal = false;
    },
    navigateTo: function(workout) {
      this.$router.go({
        path: workout
      });
    },
    async getWorkouts() {
      try {
        let response = await axios.get("/api/workout");
        console.log(response._id);
        this.workouts = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editWorkout(workout) {
      try {
        // const formData = new FormData();
        let update = await axios.put("/api/workout/" + workout._id, {
          title: this.title,
          description: this.description,
          sets: this.sets,
          repetitions: this.repetitions
        });
        this.editItem = update.data;
        this.getWorkouts();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteWorkout(workout) {
      try {
        await axios.delete("/api/workout/" + workout._id);
        this.findWorkout = null;
        this.getWorkouts();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.workouts {
  padding: 2px 16px;
}
.workout-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
.workout-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

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

button {
  margin: 5px;
}
</style>
