import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { getFirestore, collection, getDocs, getDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'

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
console.log("test");
const db = getFirestore(app);

//will overrite existing team, probably use this for updating as well
async function addTeam( allianceName, teamName, inputHP, inputDamageDealt, inputPeriod, inputSlogan){
    //client side alliance name check to avoid read pricing
    if(!(allianceName == "League of Fowls" || allianceName == "Aquatic Alliance" || allianceName == "Chitin Coalition" || allianceName == "Land Animals United") )
    {
        console.log("alliance not found")
        return 1;
    }

    const teamRef = doc(db, "alliances", allianceName, "Teams", teamName)
    setDoc(teamRef,{
        HP: inputHP,
        damageDealt: inputDamageDealt,
        period: inputPeriod,
        slogan: inputSlogan
    })
}

async function getTeam(allianceName, teamName){
    const teamRef = doc(db, "alliances", allianceName, "Teams", teamName)
    const teamSnap = await getDoc(teamRef)

    if(!teamSnap.exists())
    {
        console.log("Team not found")
        return 1;
    }
    return teamSnap.data()
}


addTeam("Land Animals United", "female lovers8379", 2, 11 ,1 ,"We love females")
const result = await getTeam("Land Animals United", "female lovers8379")
console.log(result )

