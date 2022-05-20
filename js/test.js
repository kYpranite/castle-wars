import { getAlliancesHPOrder } from './module.js'

const result1 = await getAlliancesHPOrder()
result1.forEach((doc) =>{
    console.log(doc.data())
})