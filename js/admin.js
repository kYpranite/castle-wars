const cardTemplate = document.querySelector("[data-card-template]")
const results = document.querySelector(".results")

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        data.forEach(user=>{
            const card = cardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector(".card-header");
            const tableData = card.querySelector("tbody tr").children;
            header.textContent=user.name;
            tableData[0].textContent = user.id;
            tableData[1].textContent = user.website;
            tableData[2].textContent = user.username;
            tableData[3].textContent = true;
            console.log(user)
            results.append(card)
        })
    })