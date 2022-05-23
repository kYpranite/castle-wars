import { getTeam, delTeam, getTeamsInAlliance, getAlliancesHPOrder, getTeamsDMGOrder, updateTeam, addTeam, getTeamsHPOrder } from './module.js'

const cardTemplate = document.querySelector("[data-card-template]")
const results = document.querySelector(".edit-container")
const inputedResults = document.querySelector(".input-container")
const searchBar = document.getElementById("search-bar")
const submitBtn = document.getElementById("submit-btn")
const periodVal = document.getElementById("period-select")
const teamNameTxt = document.getElementById("team-select")
const sloganTxt = document.getElementById("slogan-select")
const allianceVal = document.getElementById("alliance-select")
const dmgVal = document.getElementById("dmg-select")
const HPVal = document.getElementById("hp-select")

const inputOptions = document.querySelectorAll(".input-options")

const teams = await getTeamsHPOrder(); //this gets all teams

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function addCard(name, period, allianceName, damageDealt, HP, container) {
  const card = cardTemplate.content.cloneNode(true).children[0];
  const header = card.querySelector(".card-header");
  const tableData = card.querySelector("tbody tr").children;
  header.textContent = name;
  tableData[0].textContent = period;
  tableData[1].textContent = allianceName;
  tableData[2].textContent = damageDealt;
  tableData[3].textContent = HP;
  addCardBehavior(card, tableData);
  container.append(card);
}

function addCardBehavior(card) {
  const tableData = card.querySelectorAll("tbody td");
  const tableRow = card.querySelector("tbody tr").children;
  const header = card.querySelector(".card-header");
  let previousDMG=parseFloat(tableRow[2].textContent)
  let previousHP=parseFloat(tableRow[3].textContent)
  console.log(previousDMG);
  tableData.forEach(element => {
    element.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        element.removeAttribute('contenteditable');
        if (element.id === "damageDealt" || element.id === "HP") {
          let dmgToIncrement = parseFloat(tableRow[2].textContent)-previousDMG;
          let hpToIncrement = parseFloat(tableRow[3].textContent)-previousHP;
          //Alliance Name, Team Name, HP, DMG
          updateTeam(tableRow[1].textContent, header.textContent, hpToIncrement, dmgToIncrement);
        }
      }
      element.setAttribute('contenteditable', true);
    })
  })
}


function refreshEditable(container) {
  const tableRows = container.querySelectorAll("tbody tr");
  const tableData = container.querySelectorAll("tbody td");
  console.log(tableRows.length)
  tableRows.forEach(row => {
    console.log(row.children[1].textContent)
    const tableData = row.querySelectorAll("td")
    tableData.forEach(element => {
      element.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          element.removeAttribute('contenteditable');
          if (element.id === "damageDealt" || element.id === "HP") {
            console.log(row.children[2], teamName, row.children[3].textContent, row.children[2].textContent)
          }
        }
        element.setAttribute('contenteditable', true);
      })
    })
  })
}

//display all teams

teams.forEach((doc) => {
  addCard(doc.data().name, doc.data().period, doc.data().allianceName, doc.data().damageDealt, doc.data().HP, results);
});

submitBtn.addEventListener('click', e => {
  let empty = false;
  inputOptions.forEach((selection) => {
    if (selection.value === '' || selection.value === 0) {
      console.log(selection.value)
      empty = true;
    }
  })

  //tried to use return in the loop but it wouldnt work so this will have to do
  if (empty === true) {
    empty = false;
    alert("Please fill out all fields!");
  } else {
    addTeam(allianceVal.value, teamNameTxt.value, HPVal.value, dmgVal.value, periodVal.value, sloganTxt.value)
    addCard(teamNameTxt.value, periodVal.value, allianceVal.value, dmgVal.value, HPVal.value, inputedResults)
    allianceVal.value = 0;
    periodVal.value = 0;
    teamNameTxt.value = '';
    HPVal.value = '';
    dmgVal.value = '';
    sloganTxt.value = '';
  }
  e.preventDefault();
})

searchBar.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    removeElementsByClass("card");
    teams.forEach((doc) => {
      if ((doc.data().name).toUpperCase().includes(searchBar.value.toUpperCase())) {
        addCard(doc.data().name, doc.data().period, doc.data().allianceName, doc.data().damageDealt, doc.data().HP, results);
      }
    })
    if (results.hasChildNodes() === false) {
      const card = cardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector(".card-header");
      header.textContent = "No results found!";
      results.append(card);
    }


    //prevents page from refreshing on enter
    e.preventDefault();
  }
});

