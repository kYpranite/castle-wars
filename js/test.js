import { getTeam, delTeam, getTeamsInAlliance, getAlliancesHPOrder, getTeamsDMGOrder, updateTeam, addTeam } from './module.js'

await addTeam("League of Fowls", "Suh Lover", 23, 2 ,4, "Sexy Suh");
console.log("test")
await getTeam("League of Fowls", "nicksuh")
const result1 = await getTeamsInAlliance("League of Fowls")
result1.forEach((doc) =>{
    console.log(doc.data())
})

