<template>
  <v-card flat class="mb-4">
    <v-card-title>
      Published / Preprint Articles
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-btn-toggle class="ml-5" v-model="toggle_exclusive">
        <v-btn small @click="bibAll('bibtex')">
          .bib
        </v-btn>
        <v-btn small @click="bibAll('latex-us')">
          .tex
        </v-btn>
      </v-btn-toggle>
      
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      @current-items="getFiltered"
      :footer-props="{ 'items-per-page-options': [-1, 20] }"
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
        <a href="#" @click.prevent="bib(item)">{{ citeStr(item) }}</a>
      </template>
    </v-data-table>

    <v-dialog v-model="showDialog" width="600" eager>
      <v-card flat>
        <v-card-title> BibTeX (from INSPIRE-HEP) </v-card-title>
        <v-card-text>
          <div style="white-space: pre-wrap">{{ currentBibtex }}</div>
        </v-card-text>
      </v-card>
    </v-dialog>

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
        { text: "Status / BibTeX", value: "cite", groupable: false },
        { text: "Year", value: "year" },
      ],
      items: Publications,
      filteredItems: Publications,
      showDialog: false,
      currentBibtex: "",
      toggle_exclusive: "",
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
      // retrieve inspire id from json: x.metadata.control_number
    },

    getFiltered(e) {
      this.filteredItems = e;
    },

    bib(item) {
      if (item.bibtex) {
        this.currentBibtex = item.bibtex;
        this.showDialog = true;
      } else {
        fetch(`https://inspirehep.net/api/arxiv/${item.arXiv}?format=bibtex`)
          .then((res) => res.text())
          .then((data) => {
            item.bibtex = data;
            this.currentBibtex = data;
            this.showDialog = true;
            // console.log(data);
          });
      }
    },

    bibAll(exportFormat) {
      let fetches = [];
      let fetchItemIndex = [];
      let fetchedText = [];
      let suffix = {
        "bibtex": ".bib",
        "latex-eu": ".tex",
        "latex-us": ".tex",
        "json": ".json",
      };
      // caching results so only query once if needed
      for (let [index, item] of this.filteredItems.entries()) {
        if (item[exportFormat]) continue;
        let x = fetch(`https://inspirehep.net/api/arxiv/${item.arXiv}?format=${exportFormat}`);
        fetches.push(x);      
        fetchItemIndex.push(index);
        console.log('feching ' + item.arXiv + ' from inspire');
      }

      let self = this;
      let text = ''
      Promise.all(fetches).then(values => {
        for (let res of values) {
          fetchedText.push(res.text()); 
        }
        Promise.all(fetchedText).then(values => {
          for (let [index, data] of values.entries()) {
            let i = fetchItemIndex[index];
            self.filteredItems[i][exportFormat] = data;
          }
          for (let item of self.filteredItems) {
            text += (item[exportFormat] + '\n');
          }
          download("microboone"+suffix[exportFormat], text);
        });
      });

    },

  },
};

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

</script>
