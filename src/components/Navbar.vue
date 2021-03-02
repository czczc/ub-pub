<template>
  <nav>
    <v-app-bar app color="primary" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>MicroBooNE Publications</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-for="link in links" :key="link.route">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              :to="link.route"
              v-bind="attrs"
              v-on="on"
              ><v-icon>{{ link.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ link.text }}</span>
        </v-tooltip>
      </div>

      <v-divider vertical></v-divider>

      <!-- https://cdn.materialdesignicons.com/5.4.55/ -->

      <div v-for="link in externals" :key="link.url">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              :href="link.url"
              target="_blank"
              v-bind="attrs"
              v-on="on"
              ><v-icon>{{ link.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ link.text }}</span>
        </v-tooltip>
      </div>

      <!-- <v-btn 
        icon
        href="https://github.com/czczc/ub-pub/blob/main/src/assets/publications.json"
        target="_blank"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" dark color="secondary">
      <v-img 
        :src="require('../assets/uboone.png')"
        class="my-3 mx-5" />
      <v-list>
        <v-list-item-group v-for="link in links" :key="link.text">
          <v-list-item :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-home", text: "Publications", route: "/" },
        {
          icon: "mdi-home-import-outline",
          text: "In Analysis",
          route: "/internal",
        },
      ],
      externals: [
        {
          url: "https://microboone.fnal.gov/documents-publications/",
          icon: "mdi-skip-backward",
          text: "Previous Version",
        },
        {
          url: "https://microboone.fnal.gov/public-notes/",
          icon: "mdi-notebook",
          text: "Public Notes",
        },
        {
          url: "https://microboone.fnal.gov/talks-and-posters/",
          icon: "mdi-presentation",
          text: "Past Talks",
        },
        {
          url: "https://microboone-exp.fnal.gov/at_work/future_talks.html",
          icon: "mdi-highway",
          text: "Future Talks",
        },
        {
          url: "https://microboone.fnal.gov/microboone-news/",
          icon: "mdi-newspaper",
          text: "Media News",
        },
        {
          url: "https://inspirehep.net/experiments/1108254",
          icon: "mdi-cloud-search",
          text: "Search on Inspire",
        },
      ],
    };
  },
};
</script>

