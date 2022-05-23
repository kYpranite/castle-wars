import { getAlliancesDMGOrder, getTeamsDMGOrder } from './module.js'

const allianceTable = document.querySelector(".table-alliance");
const allianceTableBody = document.getElementById("table-alliance-body");
const teamTable = document.querySelector(".table-teams");
const teamTableBody = document.getElementById("table-team-body");
const alliances = await getAlliancesDMGOrder();
const teams = await getTeamsDMGOrder();
const allianceBtn = document.getElementById("alliance-radio");
const teamBtn = document.getElementById("team-radio");
const allianceRowTemplate= document.querySelector("[alliance-row-template]");
const teamRowTemplate = document.querySelector("[team-row-template]");

function populateAllianceTable() {
    var counter = 1;
    alliances.forEach(alliance=>{
        const row = allianceRowTemplate.content.cloneNode(true).children[0];
        row.children[0].textContent = counter;
        row.children[1].textContent = alliance.data().name;
        row.children[2].textContent = alliance.data().damageDealt;
        row.children[3].textContent = alliance.data().HP;
        allianceTableBody.append(row)
        counter++;
    })
}

function populateTeamTables(){
    var counter = 1;
    teams.forEach(team=>{
        const row = teamRowTemplate.content.cloneNode(true).children[0];
        row.children[0].textContent = counter;
        row.children[1].textContent = team.data().name;
        row.children[2].textContent = team.data().allianceName;
        row.children[3].textContent = team.data().damageDealt;
        row.children[4].textContent = (team.data().HP > 0);
        teamTableBody.append(row);
        counter++;
    })
}

teamBtn.addEventListener('click', function(){
    allianceTable.style.display = "none";
    teamTable.style.display = "table";
})
allianceBtn.addEventListener('click', function(){
    allianceTable.style.display = "table";
    teamTable.style.display = "none";
})

populateAllianceTable();
populateTeamTables();
