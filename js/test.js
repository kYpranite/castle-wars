import { getTeam, delTeam, getTeamsInAlliance, getAlliancesHPOrder, getTeamsDMGOrder, updateTeam, addTeam } from './module.js'

console.log("test")
await getTeam("League of Fowls", "nicksuh")
const result1 = await getTeamsInAlliance("League of Fowls")
result1.forEach((doc) =>{
    console.log(doc.data())
})

