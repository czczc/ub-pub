<template>
  <v-app>
    <v-app-bar app color="primary" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>MicroBooNE Publications</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- https://cdn.materialdesignicons.com/5.4.55/ -->

      <v-btn
        icon
        href="https://inspirehep.net/experiments/1108254"
        target="_blank"
      >
        <v-icon>mdi-cloud-search</v-icon>
      </v-btn>

      <!-- <v-btn 
        icon
        href="https://github.com/czczc/ub-pub/blob/main/src/assets/publications.json"
        target="_blank"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <Pub />
    </v-main>
  </v-app>
</template>

<script>
import Pub from "./components/Pub";

export default {
  name: "App",

  components: {
    Pub,
  },

  data: () => ({
    //
  }),
};
</script>
