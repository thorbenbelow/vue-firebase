<template>
  <v-card class="con" flat outlined>
    <v-card-title> Register </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:10"
          >
            <v-text-field
              v-model="form.name"
              :counter="10"
              :error-messages="errors"
              label="Name"
              required
            ></v-text-field>
          </validation-provider>

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

          <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>


<script>
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/main.js'
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
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
        name: "",
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    clear() {
      this.form = { name: '', email: '', password: '' }
    },
    async submit() {
      this.$refs.observer.validate()
      try {
        await createUserWithEmailAndPassword(auth(), this.form.email, this.form.password)
        // await updateProfile({ displayName: this.form.name })
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