<template>
  <v-dialog v-model="localshowPopup" max-width="500">
    <v-card>
      <v-card-title>Update Task</v-card-title>
      <v-card-text>
        <v-text-field
          label="Update Task..."
          v-model="updatedTask"
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="handleUpdateTask">
          Update
        </v-btn>
        <v-btn color="red darken-1" text @click="closePopup">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateTask',
  props: {
    taskId: {
      type: String,
      required: true
    },
    showPopup: {
      type: Boolean,
      required: true
    },
    closePopup: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      updatedTask: '',
      task: {}
    };
  },
  watch: {
    taskId: {
      immediate: true,
      handler: 'fetchTask'
    }
  },
  mounted() {
    this.fetchTask();
  },
  methods: {
    async fetchTask() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/tasks/${this.taskId}`
        );
        this.task = response.data;
        this.updatedTask = this.task.todo;
      } catch (err) {
        console.error(err);
      }
    },
    async handleUpdateTask() {
      if (!this.updatedTask.trim() || this.updatedTask === this.task.todo) {
        this.closePopup();
      } else {
        try {
          const res = await axios.put(
            `http://localhost:4000/api/tasks/${this.taskId}`,
            { todo: this.updatedTask }
          );
          this.$emit('update-task', res.data); 
          this.closePopup();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>

<style scoped>
.popup-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
