<template>
    <v-list class="d-flex flex-column justify-md-center pa-50">
     
      <v-list-item-group v-for="task in todolist" :key="task.id" class="d-flex justify-space-between w-100">
        <v-list-item  >
          <!-- Task text -->
          <v-list-item-content>
            <v-list-item-title>{{ task.todo }}</v-list-item-title>
          </v-list-item-content>
  
          <!-- Actions (Edit and Delete) -->
          <v-list-item-action>
            <v-btn icon @click="handleEditTask(task)">
              <v-icon>mdi-pencil</v-icon> 
            </v-btn>
            <v-btn icon @click="handleDeleteTask(task.id)">
              <v-icon>mdi-delete</v-icon> 
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </template>
  
  <script>
  import axios from 'axios';

  
  export default {
    name: 'TodoList',
    props: {
      todolist: Array, 
      showPopup: Boolean, 
      tasktoUpdate: Object 
    },
    methods: {
      // Handle completing a task
      async handleCompleteTask(task) {
        try {
          const res = await axios.put(
            `http://localhost:4000/api/tasks/${task.id}`,
            { ...task }
          );
          this.$emit('update-task', res.data); 
        } catch (err) {
          console.error(err);
        }
      },
  
      // Handle deleting a task
      async handleDeleteTask(id) {
        try {
          await axios.delete(`http://localhost:4000/api/tasks/${id}`);
          this.$emit('delete-task', id); 
        } catch (err) {
          console.error(err);
        }
      },
  
      // Handle editing a task (setting up the task for editing)
      handleEditTask(task) {
        this.$emit('task-to-update', task); 
        this.$emit('show-popup'); 
      }
    }
  };
  </script>
  
  <style scoped>
  .edit {
    cursor: pointer;
  }
  
  .close {
    cursor: pointer;
  }
  </style>
  