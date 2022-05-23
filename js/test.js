import { getTeam, delTeam, getTeamsInAlliance, getAlliancesHPOrder, getTeamsDMGOrder, updateTeam, addTeam } from './module.js'

await addTeam("League of Fowls", "I hate gays", 0, 0 ,0, "I hate minorities");
console.log("test")
await getTeam("League of Fowls", "nicksuh")
const result1 = await getTeamsInAlliance("League of Fowls")
result1.forEach((doc) =>{
    console.log(doc.data())
})

