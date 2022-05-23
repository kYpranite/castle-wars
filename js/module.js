/* FUNNY DOCUMENTATION

Team document Fields
- name: string
- allianceName: string
- HP: double
- damageDealt: double
- period: double
- slogan: string

Alliance document fields
- name: string
- HP: double
- damageDealt: double
- Teams: subcollection of team documents

addTeam(allianceName, teamName, inputHP, inputDamageDealt, inputPeriod, inputSlogan)
- allianceName, teamName, inputSlogan are strings, rest are numbers
- creates a new team with the inputted values
- returns 1 if the alliance is not found

updateTeam(allianceName, teamName, HP, DMG)
- increments the HP and DMG of the specified team
- works with 0(no increment) and negative numbers(decrement)
- returns 1 if no team found

delTeam(allianceName, teamName)
- deletes the team named (teamName) that is a member of (allianceName)
- returns 1 if no team found

getTeam(allianceName, teamName)
- gets the specified team
- returns the team document as an object. u can access values with .HP, .damageDealt, etc.
- returns 1 if no team found

getAlliance(allianceName)
- gets the specified alliance
- returns the alliance document as an object.

getTeamsInAlliance(allianceName)
- returns all the teams in the specified alliance
- returns 1 if alliance not found
- return value is a querySnapshot. iterate through with .forEach or call the .doc property for an array of objects.
- used in the calculate methods if u want examples on how to use

getTeamsHPOrder(numTeams = -1)
- returns a list of teams in HP order, greatest hp to least hp
- returns all teams by default, paramter will specify how many teams to return
- return value is a querySnapshot

getTeamsDMGOrder(numTeams = -1)
- similar to above but in damageDealt order

getAlliancesHPOrder(numAlliances = -1)
- similiar but alliance hp

getAlliancesDMGOrder(numAlliances = -1)
- similar but alliance damageDealt

calcAllianceHP(allianceName)
- updates the HP field of the specified alliance 
- returns 1 if alliance not found

calcAllianceDMG(allianceName)
- same as above but for allianceDamage

*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { getFirestore, collection, deleteDoc, limit, getDocs, getDoc, increment, setDoc, doc, query, where, collectionGroup, orderBy, updateDoc } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyD7zyFs0nG8lHlAa8BKcQaGxbZWlGZ7Hrk",
  authDomain: "castle-wars-a9248.firebaseapp.com",
  projectId: "castle-wars-a9248",
  storageBucket: "castle-wars-a9248.appspot.com",
  messagingSenderId: "901398153467",
  appId: "1:901398153467:web:c67536e08ba34632e6c85e",
  measurementId: "G-XPHFFDE4Z9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//will overrite existing team, probably use this for updating as well
export async function addTeam( allianceName, teamName, inputHP, inputDamageDealt, inputPeriod, inputSlogan){
    if(!(allianceName == "League of Fowls" || allianceName == "Aquatic Alliance" || allianceName == "Chitin Coalition" || allianceName == "Land Animals United") )
    {
        console.log("alliance not found")
        return 1;
    }

    const teamRef = doc(db, "alliances", allianceName, "Teams", teamName)
    await setDoc(teamRef,{
        name: teamName,
        allianceName: allianceName,
        HP: inputHP,
        damageDealt: inputDamageDealt,
        period: inputPeriod,
        slogan: inputSlogan
    })
}

export async function updateTeam(allianceName, teamName, HP, DMG)
{
    const teamRef = doc(db, "alliances", allianceName, "Teams", teamName)
    const teamDoc = await getDoc(teamRef);
    if(!teamDoc.exists())
    {
        return 1
    }
    await updateDoc(teamRef, {
        HP: increment(HP),
        damageDealt: increment(DMG)
    })

}

export async function delTeam(allianceName, teamName)
{
    const teamRef = doc(db, "alliances", allianceName, "Teams", teamName)
    const teamDoc = await getDoc(teamRef)
    if(!teamDoc.exists())
    {
        return 1
    }
    await deleteDoc(teamRef);
           
}
// }

export async function getTeam(allianceName, teamName){
    const teamRef = doc(db, "alliances", allianceName, "Teams", teamName)
    const teamSnap = await getDoc(teamRef)

    if(!teamSnap.exists())
    {
        console.log("Team not found")
        return 1;
    }
    return teamSnap.data()
}

export async function getAlliance(allianceName){
    const allianceRef = doc(db, "alliances", allianceName);
    const allianceSnap = await getDoc(allianceRef)

    if(!allianceSnap.exists())
    {
        console.log("Alliance not founds")
        return 1;
    }
    return allianceSnap.data();
}

export async function getTeamsInAlliance(allianceName){
    if(!(allianceName == "League of Fowls" || allianceName == "Aquatic Alliance" || allianceName == "Chitin Coalition" || allianceName == "Land Animals United") )
    {
        console.log("alliance not found")
        return 1;
    }
    const q = query(collection(db, "alliances", allianceName, "Teams"));
    const querySnapshot = await getDocs(q)
    return querySnapshot
}

//use .docs to get array of documents, or iterate with forEach
export async function getTeamsHPOrder(numTeams = -1){
    let teams
    if(numTeams == -1)
    {
        teams = query(collectionGroup(db, "Teams"), orderBy("HP", "desc"));
    }
    else
    {
        teams = query(collectionGroup(db, "Teams"), orderBy("HP", "desc"), limit(numTeams));
    }
    const teamSnapshot = await getDocs(teams);
    // teamSnapshot.forEach((doc) => {
    //     console.log(doc.data());
    // })
    return teamSnapshot; 
}

export async function getTeamsDMGOrder(numTeams = -1){
    let teams
    if(numTeams == -1)
    {
        teams = query(collectionGroup(db, "Teams"), orderBy("damageDealt", "desc"));
    }
    else
    {
        teams = query(collectionGroup(db, "Teams"), orderBy("damageDealt", "desc"), limit(numTeams));
    }
    const teamSnapshot = await getDocs(teams);
    // teamSnapshot.forEach((doc) => {
    //     console.log(doc.data());
    // })
    return teamSnapshot; 
}

export async function getAlliancesHPOrder(numAlliances = -1){
    let alliances
    if(numAlliances == -1)
    {
        alliances = query(collection(db, "alliances"), orderBy("HP", "desc"));
    }
    else
    {
        alliances = query(collection(db, "alliances"), orderBy("HP", "desc"), limit(numAlliances));
    }
    const alliancesSnapshot = await getDocs(alliances);
    // teamSnapshot.forEach((doc) => {
    //     console.log(doc.data());
    // })
    return alliancesSnapshot; 
}

export async function getAlliancesDMGOrder(numAlliances = -1){
    let alliances
    if(numAlliances == -1)
    {
        alliances = query(collection(db, "alliances"), orderBy("damageDealt", "desc"));
    }
    else
    {
        alliances = query(collection(db, "alliances"), orderBy("damageDealt", "desc"), limit(numAlliances));
    }
    const alliancesSnapshot = await getDocs(alliances);
    // teamSnapshot.forEach((doc) => {
    //     console.log(doc.data());
    // })
    return alliancesSnapshot; 
}

export async function calcAllianceHP(allianceName){
    let teams = await getTeamsInAlliance(allianceName)
    if(teams != 1)
    {
        let sum = 0;
        teams.forEach((doc) =>{
            sum += doc.data().HP
        })
        const allianceRef = doc(db, "alliances", allianceName)
        await updateDoc(allianceRef,{
            HP: sum
        })
    }
    else
    {
        return 1
    }
}

export async function calcAllianceDMG(allianceName){
    let teams = await getTeamsInAlliance(allianceName)
    if(teams != 1)
    {
        let sum = 0;
        teams.forEach((doc) =>{
            sum += doc.data().damageDealt
        })
        const allianceRef = doc(db, "alliances", allianceName)
        await updateDoc(allianceRef,{
            damageDealt: sum
        })
    }
    else
    {
        return 1
    }
}

// testing shid
// await calcAllianceHP("Aquatic Alliance");
// addTeam("Land Animals United", "female lovers8379", 2, 110 ,1 ,"We love females")
// const result = await getTeam("Land Animals United", "female lovers8379")
// const result1 = await getAlliance("League of Fowls");
// const result2 = await getTeamsHPOrder()
// const result3 = await getTeamsDMGOrder()

// await delTeam("Land Animals United", "female lovers8379")
// const result4 = await getTeamsDMGOrder();
// const result5 = await getAlliancesDMGOrder();
// const result6 = await getTeamsInAlliance("Chitin Coalition")
// result2.forEach((doc) => {
//     console.log(doc.data());
// })
// result3.forEach((doc) => {
//     console.log(doc.data());
// })
// result4.forEach((doc) => {
//     console.log(doc.data());
// })
// result5.forEach((doc) => {
//     console.log(doc.data());
// })
// result2.forEach((doc) => {
//     console.log(doc.data());
// })

