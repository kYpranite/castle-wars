import { getAlliancesDMGOrder, getTeamsDMGOrder, calcAllianceHP, calcAllianceDMG } from './module.js'
let currentDisplay = 0;
const allianceTable = document.querySelector(".table-alliance");
const allianceTableBody = document.getElementById("table-alliance-body");
const teamTable = document.querySelector(".table-teams");
const teamTableBody = document.getElementById("table-team-body");
const alliances = await getAlliancesDMGOrder();
const teams = await getTeamsDMGOrder();
const allianceBtn = document.getElementById("alliance-radio");
const teamBtn = document.getElementById("team-radio");
const allianceRowTemplate = document.querySelector("[alliance-row-template]");
const teamRowTemplate = document.querySelector("[team-row-template]");
const searchBar = document.getElementById("search-bar");

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function populateAllianceTable() {
    var counter = 1;
    alliances.forEach(alliance => {
        calcAllianceHP(alliance.data().name);
        calcAllianceDMG(alliance.data().name);
        console.log(searchBar.value.toUpperCase());
        if ((alliance.data().name).toUpperCase().includes(searchBar.value.toUpperCase())) {
            const row = allianceRowTemplate.content.cloneNode(true).children[0];
            row.children[0].textContent = counter;
            row.children[1].textContent = alliance.data().name;
            row.children[2].textContent = alliance.data().damageDealt;
            row.children[3].textContent = alliance.data().HP;
            allianceTableBody.append(row)
            counter++;
        }
    })
}

function populateTeamTable() {
    var counter = 1;
    teams.forEach(team => {
        if ((team.data().name).toUpperCase().includes(searchBar.value.toUpperCase())) {
            const row = teamRowTemplate.content.cloneNode(true).children[0];
            row.children[0].textContent = counter;
            row.children[1].textContent = team.data().name;
            row.children[2].textContent = team.data().allianceName;
            row.children[3].textContent = team.data().damageDealt;
            row.children[4].textContent = (team.data().HP > 0);
            teamTableBody.append(row);
            counter++;
        }
    })
}

//1 means that team table currently displayed, 0 means alliance

teamBtn.addEventListener('click', function () {
    allianceTable.style.display = "none";
    teamTable.style.display = "table";
    currentDisplay = 1;
})
allianceBtn.addEventListener('click', function () {
    allianceTable.style.display = "table";
    teamTable.style.display = "none";
    currentDisplay = 0;
})

searchBar.addEventListener('keypress', e => {
    // if (searchBar.value === null){
    //     searchBar.value = '';
    // };
    if (e.key === 'Enter') {
        removeElementsByClass("table-row");
        populateAllianceTable();
        populateTeamTable();
        //prevents page from refreshing on enter
        e.preventDefault();
    }
});



populateAllianceTable();
populateTeamTable();
