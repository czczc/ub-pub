<template>
  <v-card flat class="mb-4">
    <v-card-title
      > Published / Preprint Articles
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      item-key="arXiv"
      sort-by="arXiv"
      sort-desc
      show-group-by
      class="elevation-1"
    >
      <template v-slot:item.arXiv="{ item }">
        <a :href="'https://arxiv.org/abs/' + item.arXiv">{{ item.arXiv }}</a>
      </template>

      <template v-slot:item.cite="{ item }">
        {{ citeStr(item) }}
      </template>
    </v-data-table>
  </v-card>

</template>

<script>
import Publications from "../assets/publications.json";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "arXiv",
          align: "start",
          value: "arXiv",
          groupable: false,
        },
        { text: "Title", value: "title", groupable: false },
        { text: "Journal", value: "journal" },
        { text: "Status / Cite", value: "cite", groupable: false },
        { text: "Year", value: "year" },
      ],
      items: Publications,
    };
  },

  methods: {
    citeStr(item) {
      if (item.status == "published") {
        return item.cite;
      } else {
        return item.status;
      }
    },

    info() {
      //http://export.arxiv.org/api/query?id_list=2006.00108
      //   https://inspirehep.net/experiments/1108254
    },
  },
};
</script>