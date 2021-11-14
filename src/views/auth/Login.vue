<template>
  <v-card class="con" flat outlined>
    <v-card-title> Login </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="form.email"
              :error-messages="errors"
              label="E-mail"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required"
          >
            <v-text-field
              v-model="form.password"
              :error-messages="errors"
              label="Password"
              required
              type="password"
            ></v-text-field>
          </validation-provider>

          <v-btn class="mr-4" type="submit" :disabled="invalid"> Login </v-btn>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>


<script>
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/main.js'
import { required, email } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    clear() {
      this.form = { email: '', password: '' }
    },
    async submit() {
      this.$refs.observer.validate()
      try {
        await signInWithEmailAndPassword(auth(), this.form.email, this.form.password)
        this.$router.push(this.$route.query.redirect || '/dashboard')
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.con {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
</style>