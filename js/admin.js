import { getTeam, delTeam, getTeamsInAlliance, getAlliancesHPOrder, getTeamsDMGOrder, updateTeam, addTeam, getTeamsHPOrder } from './module.js'

const cardTemplate = document.querySelector("[data-card-template]")
const results = document.querySelector(".results")
const searchBar = document.getElementById("search-bar")
const teams = await getTeamsHPOrder();

function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      removeElementsByClass("card");
      teams.forEach((doc) =>{
        if ((doc.data().name).includes(searchBar.value)){
          const card = cardTemplate.content.cloneNode(true).children[0];
          const header = card.querySelector(".card-header");
          const tableData = card.querySelector("tbody tr").children;
          header.textContent=doc.data().name;
          tableData[0].textContent = doc.data().period;
          tableData[1].textContent = doc.data().allianceName;
          tableData[2].textContent = doc.data().damageDealt;
          tableData[3].textContent = doc.data().HP;
          results.append(card);
        }
    })
    if (results.hasChildNodes() === false){
      const card = cardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector(".card-header");
      header.textContent = "No results found!";
      results.append(card);
    }

    e.preventDefault();
  }
});


        // const card = cardTemplate.content.cloneNode(true).children[0];
        // const header = card.querySelector(".card-header");
        // const tableData = card.querySelector("tbody tr").children;
        // header.textContent=doc.data().name;
        // tableData[0].textContent = doc.data().period;
        // tableData[1].textContent = doc.data().allianceName;
        // tableData[2].textContent = doc.data().damageDealt;
        // tableData[3].textContent = doc.data().HP;;
        // results.append(card)  