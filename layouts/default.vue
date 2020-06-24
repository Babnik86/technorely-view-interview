<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-left>
      <v-toolbar-title><nuxt-link v-if="$nuxt.$route.path !== '/'" to="/">TV Shows</nuxt-link> <span v-else>TV Shows</span></v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container
        fluid>
        <nuxt/>
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({  }),
}
</script>

<style>

</style>

