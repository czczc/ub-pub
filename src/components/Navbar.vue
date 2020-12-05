<template>
<nav>
  <v-app-bar app color="primary" dense dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>MicroBooNE Publications</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- https://cdn.materialdesignicons.com/5.4.55/ -->

    <v-btn
      icon
      href="https://microboone.fnal.gov/documents-publications/"
      target="_blank"
      ><v-icon>mdi-skip-backward</v-icon>
    </v-btn>

    <v-btn icon href="https://microboone.fnal.gov/public-notes/" target="_blank"
      ><v-icon>mdi-notebook</v-icon>
    </v-btn>

    <v-btn
      icon
      href="https://microboone.fnal.gov/talks-and-posters/"
      target="_blank"
      ><v-icon>mdi-presentation</v-icon>
    </v-btn>

    <v-btn
      icon
      href="https://microboone-exp.fnal.gov/at_work/future_talks.html"
      target="_blank"
      ><v-icon>mdi-highway</v-icon>
    </v-btn>

    <v-btn
      icon
      href="https://microboone.fnal.gov/microboone-news/"
      target="_blank"
      ><v-icon>mdi-newspaper</v-icon>
    </v-btn>

    <v-btn
      icon
      href="https://inspirehep.net/experiments/1108254"
      target="_blank"
      ><v-icon>mdi-cloud-search</v-icon>
    </v-btn>

    <!-- <v-btn 
        icon
        href="https://github.com/czczc/ub-pub/blob/main/src/assets/publications.json"
        target="_blank"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn> -->
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" dark color="secondary">
      <v-list>
        <v-list-item-group v-for="link in links" :key="link.text">          
          <v-list-item :to="link.route">
            <v-list-item-title>{{link.text}}</v-list-item-title>
            <v-list-item-icon> <v-icon>{{link.icon}}</v-icon> </v-list-item-icon>
          </v-list-item>

          <!-- <v-list-item to="/internal">
            <v-list-item-title>Internal</v-list-item-title>
            <v-list-item-icon> <v-icon>mdi-home-import-outline</v-icon> </v-list-item-icon>
          </v-list-item>
          <v-divider></v-divider> -->

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
        { icon: 'mdi-home', text: 'Home', route: '/' },
        { icon: 'mdi-home-import-outline', text: 'Internal', route: '/internal' },
      ]
    }
  }
}
</script>

