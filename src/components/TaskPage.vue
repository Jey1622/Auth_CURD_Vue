<template>
  <v-app>
    <v-main>
        <AddTaks />
     
      <Todolist 
        :todolist="todolist" 
        :showPopup="showPopup"
        :tasktoUpdate="taskToUpdate"
        @task-to-update="taskToUpdate = $event" 
        @show-popup="togglePopup"
        @delete-task="deleteTask" 
        @update-task="updateTask"
      />
      
      <Updatetask 
        v-if="showPopup" 
        :task="taskToUpdate" 
        @close-popup="closePopup" 
        @update-task="updateTask"
      />
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import Todolist from '../views/TodoView.vue';
import Updatetask from '../views/UpdateView.vue';
import AddTaks from '../views/AddTaskView.vue';


export default {
  components: {
    AddTaks,
    Todolist,
    Updatetask
  },
  data() {
    return {
      todolist: [], 
      taskToUpdate: {}, 
      showPopup:false 
    };
  },
  methods: {
    // Fetch tasks when component is mounted
    async fetchTasks() {
      try {
        const res = await axios.get('http://localhost:4000/api/tasks');
        this.todolist = res.data;
      } catch (err) {
        console.error(err);
      }
    },

    // Toggle the visibility of the popup
    togglePopup() {
      this.showPopup = !this.showPopup;
    },

    // Close the popup
    closePopup() {
      this.showPopup = false;
    },

    // Add a new task
    async addTask(newTask) {
      try {
        const res = await axios.post('http://localhost:4000/api/tasks', newTask);
        this.todolist.push(res.data); // Add the new task to the list
      } catch (err) {
        console.error(err);
      }
    },

    // Delete a task
    deleteTask(id) {
      this.todolist = this.todolist.filter((task) => task.id !== id);
    },

    // Update a task
    updateTask(updatedTask) {
      const index = this.todolist.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.$set(this.todolist, index, updatedTask); // Update the task in the list
      }
    },

    // Update task in state
    async handleUpdateTask(task) {
      try {
        const res = await axios.put(`http://localhost:4000/api/tasks/${task.id}`, task);
        this.updateTask(res.data);
        this.closePopup();
      } catch (err) {
        console.error(err);
      }
    }
  },
  mounted() {
    this.fetchTasks(); 
  }
};
</script>
