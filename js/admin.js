import { calcAllianceHP, calcAllianceDMG, delTeam, updateTeam, addTeam, getTeamsHPOrder } from './module.js'

/* Elements */

const cardTemplate = document.querySelector("[data-card-template]");
const results = document.querySelector(".edit-container");
const brand = document.querySelector(".brand-name");
const inputedResults = document.querySelector(".input-container");
const searchBar = document.getElementById("search-bar");
const submitBtn = document.getElementById("submit-btn");
const periodVal = document.getElementById("period-select");
const teamNameTxt = document.getElementById("team-select");
const sloganTxt = document.getElementById("slogan-select");
const allianceVal = document.getElementById("alliance-select");
const dmgVal = document.getElementById("dmg-select");
const HPVal = document.getElementById("hp-select");


const inputOptions = document.querySelectorAll(".input-options")

const teams = await getTeamsHPOrder(); //this gets all teams

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

/* redirects user when they click on the castle wars in top left*/
brand.addEventListener('click', function(){
  window.location.href = "/";
})

function addCard(name, period, allianceName, damageDealt, HP, container) {
  /* card object is a copy of the card template. it returns a document fragment so you get the first item of its children to get the element itself*/
  const card = cardTemplate.content.cloneNode(true).children[0];
  const deleteBtn = card.querySelectorAll(".btn")[0];
  deleteBtn.style.display = "none";
  /* hides delete button on input screen cards */
  const header = card.querySelector(".card-header");
  const tableData = card.querySelector("tbody tr").children;
  header.textContent = name;
  tableData[0].textContent = period;
  tableData[1].textContent = allianceName;
  tableData[2].textContent = damageDealt;
  tableData[3].textContent = HP;
  if (container === results){
    addCardBehavior(card);
  }
  container.append(card);
}

function addCardBehavior(card) {
  const deleteBtn = card.querySelectorAll(".btn")[0];
  //adds back the delete button
  deleteBtn.style.display = "block";
  const tableData = card.querySelectorAll("tbody td");
  const tableRow = card.querySelector("tbody tr").children;
  const header = card.querySelector(".card-header");
  // saves the previous dmg and hp so it can know how much to increment by
  let previousDMG=parseFloat(tableRow[2].textContent);
  console.log(previousDMG)
  let previousHP=parseFloat(tableRow[3].textContent);
  tableData.forEach(element => {
    // makes only damage dealt and HP contenteditable
    if (element.id === "damageDealt" || element.id === "HP") {
      element.setAttribute('contenteditable', true);
    }
    element.addEventListener('keypress', e => {
      //makes it so that when you press enter when editing, it will stop editing and save the content
      if (e.key === 'Enter') {
        e.preventDefault();
        //removes the attribute so you are no longer editing
        element.removeAttribute('contenteditable');
        console.log(previousDMG)
        let dmgToIncrement = parseFloat(tableRow[2].textContent)-previousDMG;
        let hpToIncrement = parseFloat(tableRow[3].textContent)-previousHP;
        //Alliance Name, Team Name, HP, DMG
        updateTeam(tableRow[1].textContent, header.textContent, hpToIncrement, dmgToIncrement);
        calcAllianceHP(tableRow[1].textContent);
        calcAllianceDMG(tableRow[1].textContent);
        previousHP = parseFloat(tableRow[3].textContent);
        previousDMG = parseFloat(tableRow[2].textContent);
        console.log(previousDMG);   
      }
      //adds back the removed attributes
      element.setAttribute('contenteditable', true);
    })
  })

  deleteBtn.addEventListener('click', function(){
    delTeam(tableRow[1].textContent, header.textContent);
    card.classList.add("delete");
    removeElementsByClass("delete");
  })
}



//display all teams

teams.forEach((doc) => {
  addCard(doc.data().name, doc.data().period, doc.data().allianceName, doc.data().damageDealt, doc.data().HP, results);
});

submitBtn.addEventListener('click', e=>{
  let empty = false;
  inputOptions.forEach((selection) => {
    if (selection.value === '' || selection.value === '0') {
      empty = true;
    }
  })

  //tried to use return in the loop but it wouldnt work so this will have to do
  if (empty === true) {
    empty = false;
    alert("Please fill out all fields!");
  }else {
    addTeam(allianceVal.value, teamNameTxt.value, parseFloat(HPVal.value), parseFloat(dmgVal.value), periodVal.value, sloganTxt.value);
    calcAllianceHP(allianceVal.value);
    calcAllianceDMG(allianceVal.value);
    addCard(teamNameTxt.value, periodVal.value, allianceVal.value, parseFloat(dmgVal.value), parseFloat(HPVal.value), inputedResults);
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

