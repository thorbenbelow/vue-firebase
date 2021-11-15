<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn link to="/" icon><v-icon>mdi-home-outline</v-icon></v-btn>
      <v-toolbar-title>Secret Santa</v-toolbar-title>
      <v-spacer />
      <v-btn link to="/login" v-if="!user" outlined color="pink" class="mr-2"
        >Login</v-btn
      >
      <v-btn link to="/register" v-if="!user" text color="pink">Register</v-btn>
      <v-btn icon v-if="user"><v-icon>mdi-bell-outline</v-icon></v-btn>
      <v-btn link to="/new" icon v-if="user"><v-icon>mdi-plus</v-icon></v-btn>
      <v-menu offset-y v-if="user">
        <template v-slot:activator="{ attrs, on }">
          <v-btn icon v-on="on" v-bind="attrs"
            ><v-icon>mdi-account-circle-outline</v-icon></v-btn
          >
        </template>
        <v-list dense flat>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title> Logged in as </v-list-item-title>
              <v-list-item-subtitle>
                {{ user.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="(item, index) in loginMenu"
            :key="index"
            link
            :to="item.to"
            active-class="pink--text text--accent-4"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logout">
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Merle ❤</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { auth } from '@/main.js'
import { signOut } from 'firebase/auth'

export default {
  data: () => ({
    user: auth().currentUser,
    loginMenu: [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Settings', to: '/settings' },
    ]
  }),
  watch: {
    $route() {
      this.user = auth().currentUser;
    }
  },
  methods: {
    async logout() {
      try {
        await signOut(auth());
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .v-list-item--active::before,
.v-btn--active::before {
  background-color: transparent;
}
</style>