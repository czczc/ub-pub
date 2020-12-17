### About the publication webpage

This web app is still a work in progress.

### Features 
* **Searchable**: You can do instant search through the search bar to filter the list.
* **Sortable**: You can sort the rows by clicking on the column header
* **groupable**: If the column header has a "group" button, then this field can be grouped by clicking on that button.
* **Citation**: The bibliography information of each article can be automatically retrieved from [Inspire](https://inspirehep.net/) when clicking on the `status` link. A `.bib` file for all the displayed rows (you can use the search bar to filter the list) can be downloaded using the buttons on the top right corner. A caching mechanism is implemented so that the Inspire database is only hit once if needed.
* **Timeline**: For the internal page, a timeline of various stages can be displayed when clicking on the `last updated` link.

### How to enter new entries

The web app is set up such that all information is save in a single json file, which can be considered as a simple document-based database. Once this json file is updated, the github pages will be automatically rebuilt through travis-CI. Then, the web server pulls new pages from the github every hour at 30 minutes. So any new content effectively refreshes every hour.

The json file that need to be updated is
* published articles:  https://github.com/czczc/ub-pub/blob/main/src/assets/publications.json
* internal analysis: https://github.com/czczc/ub-pub/blob/main/src/assets/analysis.json
The fields are mostly self-explanatory or can be inferred from the other existing entries. This file can be edited directly in the browser (using the pen icon that says "edit this file" ) and then committed. The best way to add a new entry is to copy an old entry, paste onto the top, and start editing from there.

The most often error one could encouter is forgetting or adding extra commas in the json file, since the json format is quite strict in that way (e.g. the last element before the closing bracket can not have a comma). One way to avoid these errors is to use an online validator, such as [this one](https://jsonformatter.curiousconcept.com/#), to ensure everything is entered correctly before committing.

For the internal analysis, the `status` field can log multiple stages as the analysis proceeds. For example, the following entry logs two stages with their starting dates (starting date is required, other dates are optional).
```json
"status": [
    {"stage": "5", "dateStart": "2020-10-23", "dateEnd": "", "dateDue": "2020-12-15", "whatIsDue":"1st Ref reply"},
    {"stage": "4", "dateStart": "2020-10-02", "dateEnd": "", "dateDue": "", "whatIsDue":""}
]
```
Currently, the status stages are defined as follows:
0. Analysis: from the analysis (once it's mature enough toward a publication) started until before the official EB review started (EB is assigned in this stage).
1. EB / Group review: from the official EB review started until the group conveners sign off.
2. Style Review
3. 1st collaboration review
4. 2nd collaboration review
5. Journal review: from the paper submitted to arXiv until the paper is published.

Each stage can also have a "dateDue" and a "whatIsDue" field, which is meant to be used to remind the upcoming deadlines. For example, during the "Analysis" stage, you could have a "Assign EB" deadline, or a "internal note due" deadline, etc. The due date and content will show up in the status and timeline display on the web page.


### How to run it on a local server

For people who are not afraid of technical stuff, you can also run the app on your local computer. This way you can update the json file and preview the content before you push the changes to the github. You need to have [NodeJS](https://nodejs.org/en/) installed on your local computer first. Then, after cloning this git repo, do

```bash
npm install
npm run serve    
```
You should then be able to visit http://localhost:8080/ and see the webpage. You can then preview any changes you made, and after you commit and push the changes, and the new content will show up within one hour.

Finally, the web app is developed using [Vue.js](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/en/). 






