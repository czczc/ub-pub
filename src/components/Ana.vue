<template>
  <v-card>
    <v-card-title>
      Internal Analysis
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-card-text>
      <v-item-group>
        <!-- <v-subheader>Stages</v-subheader> -->
        <v-item v-for="item in stages" :key="item.stage">
          <v-chip
            slot-scope="{ active, toggle }"
            :input-value="active"
            @click="toggle"
          >
            {{ item.stage }}: {{ item.desc }}
          </v-chip>
        </v-item>
      </v-item-group>
    </v-card-text>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      item-key="docId"
      sort-by="docId"
      sort-desc
      show-group-by
      class="elevation-1"
    >
      <template v-slot:item.docId="{ item }">
        <a
          :href="
            'https://microboone-docdb.fnal.gov/cgi-bin/private/ShowDocument?docid=' +
            item.docId
          "
          >{{ item.docId }}</a
        >
      </template>

      <template v-slot:item.EB="{ item }">
        {{ eb(item) }}
      </template>

      <template v-slot:item.status="{ item }">
        {{ stage(item) }}
      </template>

      <template v-slot:item.updated="{ item }">
        <v-dialog width="500">
          <template v-slot:activator="{ on }">
            <v-btn text style="text-decoration: underline;" v-on="on">
              {{ updated(item) }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Timeline
            </v-card-title>

            <v-timeline
              align-top
              dense
              v-for="step in item.status"
              :key="step.stage"
            >
              <v-timeline-item >
                <v-layout pt-3>
                  <v-flex xs3>
                    <strong>{{ step.dateStart }}</strong>
                  </v-flex>
                  <v-flex>
                    {{ stageText(step) }}
                  </v-flex>       
                </v-layout>
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Analysis from "../assets/analysis.json";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "doc-#",
          align: "start",
          value: "docId",
          groupable: false,
        },
        { text: "Title", value: "title", groupable: false },
        { text: "Group", value: "group" },
        { text: "Contact", value: "contact", groupable: false },
        { text: "EB", value: "EB", groupable: false },
        { text: "Journal", value: "journal" },
        { text: "Status", value: "status", groupable: false },
        { text: "Last Updated", value: "updated", groupable: false },
      ],
      items: Analysis,
      stages: [
        { stage: 1, desc: "EB established" },
        { stage: 2, desc: "Int-Note Rev" },
        { stage: 3, desc: "1st Collab Rev" },
        { stage: 4, desc: "2nd Collab Rev" },
        { stage: 5, desc: "arXiv Submitted" },
      ],
      stageDef: {
        1: "EB established",
        2: "Int-Note Rev",
        3: "1st Collab Rev",
        4: "2nd Collab Rev",
        5: "arXiv Submitted",
      },
    };
  },

  methods: {
    stage(item) {
      let code = item["status"][0]["stage"];
      return `${code} (${this.stageDef[code]})`;
    },

    updated(item) {
      return item["status"][0]["dateStart"];
    },

    eb(item) {
      return item.EB.join(", ");
    },

    stageText(step) {
      return `${this.stageDef[step.stage]}`;
    },

    info() {
      //http://export.arxiv.org/api/query?id_list=2006.00108
      //   https://inspirehep.net/experiments/1108254
    },
  },
};
</script>