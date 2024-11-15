<template>
  <v-container max-width="xs">
    <v-form ref="loginForm" @submit.prevent="handleSubmit" lazy-validation>
      <v-row justify="center" class="mt-8">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-4">
            <v-card-title>
              <span class="text-h5">Login</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.email]"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="[rules.required]"
                outlined
                dense
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" type="submit" block>Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:4000/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        this.$router.push('/tasks');
        alert(response.data.message);
      } catch (error) {
        alert(error.response?.data?.message || 'An error occurred.');
      }
    },
  },
};
</script>


