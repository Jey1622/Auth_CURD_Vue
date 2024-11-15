<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field
          label="Add Task..."
          v-model="task"
          @keyup.enter="addNewTask"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn color="primary" @click="addNewTask">Add Task</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      task: '', 
    };
  },
  props: {
    onTaskAdded: {
      type: Function,
      required: true, 
    },
  },
  methods: {
    addNewTask() {
      if (this.task.trim() === '') {
        return; 
      }

      axios
        .post('http://localhost:4000/api/tasks', { todo: this.task })
        .then((response) => {
          this.addNewTask(response.data); 
          this.task = ''; 
        })
        .catch((err) => {
          console.error('Error adding task:', err);
        });
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
