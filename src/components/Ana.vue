<template>
  <v-card flat class="mb-4">
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
        <v-item v-for="(item, index) in stages" :key="index">
          <v-chip small class="mr-1 caption"
            slot-scope="{ active, toggle }"
            :input-value="active"
            @click="toggle"
          >
            {{ index }}: {{ item }}
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

      <template v-slot:item.contact="{ item }">
        {{ contact(item) }}
      </template>

      <template v-slot:item.EB="{ item }">
        {{ eb(item) }}
      </template>

      <template v-slot:item.status="{ item }">
        <span class="darken-1">{{ stage(item) }}</span>
      </template>

      <template v-slot:item.updated="{ item }">
        <v-dialog width="600">
          <template v-slot:activator="{ on }">
            <v-btn text style="text-decoration: underline" v-on="on">
              {{ updated(item) }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Timeline ({{item.title}})
            </v-card-title>

            <v-timeline
              align-top
              dense
              v-for="step in item.status"
              :key="step.stage"
            >
              <v-timeline-item>
                <v-layout pt-3>
                  <v-flex md3 class="teal--text darken-1">
                    {{ stageText(step) }}
                  </v-flex>
                  <v-flex md3>
                    <span>Start</span><br />
                    {{ step.dateStart }}
                  </v-flex>
                  <v-flex md3>
                    <span>End</span><br />
                    {{ step.dateEnd }}
                  </v-flex>
                  <v-flex md3>
                    <span>Due</span><br />
                    {{ step.dateDue }}
                  </v-flex>
                </v-layout>
              </v-timeline-item>
            </v-timeline>
            <v-simple-table style="border-top:1px">
              <tbody>
                <tr>
                  <td>Contact</td><td>{{contact(item)}}</td>
                </tr>
                <tr>
                  <td>EB</td><td>{{eb(item)}}</td>
                </tr>
                <tr>
                  <td>Reading Institute</td><td>{{ri(item)}}</td>
                </tr>
              </tbody>
            </v-simple-table>

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
        "EB Rev", // 0
        "Group Rev", // 1
        "Style Rev", //2
        "1st Collab Rev", // 3
        "2nd Collab Rev", // 4
        "Journal Rev", // 5
      ]
    };
  },

  computed: {
    stageDef() {
      let info = {};
      for (const [i, v] of this.stages.entries()) {
        info[i] = v;
      }
      return info;
    }
  },

  methods: {
    stage(item) {
      let code = item["status"][0]["stage"];
      let dateEnd = item["status"][0]["dateEnd"];
      let dateDue = item["status"][0]["dateDue"];
      let text = `${code}) ${this.stageDef[code]}`;
      if (dateEnd && dateEnd != "") {
        text += " ended";
      }
      else if (dateDue && dateDue != "") {
        text += " due";
      }
      else {
        text += " started";
      }
      return text;
    },

    updated(item) {
      let text = item["status"][0]["dateStart"];
      let dateEnd = item["status"][0]["dateEnd"];
      if (dateEnd && dateEnd != "") {
        text = dateEnd;
      }
      return text;
    },

    eb(item) {
      return item.EB.join(", ");
    },

    contact(item) {
      return item.contact.join(", ");
    },

    ri(item) {
      let text = "";
      if (item.RI) {
        text = item.RI.join(", ");
      }
      return text;
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