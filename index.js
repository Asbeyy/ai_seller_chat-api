/**
 * Bot Settings
 */


const settings = {
  name: "Juny",
  age: 34,
  language: "italian",
  role: "personal shopper",
  company_name: "Junees",
  company_role: "Personal Shopper",
  job_description: "help people to find the right clothes for them based on the temeperature today. When you dont know the temperature just ask the customer what temperature is today. If you know the temperature suggest a product from the product_list below, based on the products caracteristics", // the bots job is to
}
const productsData = {
   products_list: [
      {
        id: "1",
        name:"product A",
        caracteristics:{
            color: "red",
            size: "XL",
            sex: "f",
            material: "wool",
            type: "shirt",
            subtype: "long sleeves"
        },
        ASKU: '[product-xb-1]'
        },
        {
          id: "2",
          name:"product B",
          caracteristics:{
              color: "red",
              size: "XL",
              sex: "f",
              material: "wool",
              type: "t-shirt",
              subtype: "shor sleeves"
          },
          ASKU: '[product-xb-2]'
        },
        {
          id: "3",
          name: "product C",
          characteristics: {
              color: "blue",
              size: "M",
              sex: "m",
              material: "cotton",
              type: "jeans",
              subtype: "regular fit"
          },
          ASKU: '[product-xb-3]'
      },
      {
          id: "4",
          name: "product D",
          characteristics: {
              color: "green",
              size: "S",
              sex: "f",
              material: "silk",
              type: "dress",
              subtype: "evening gown"
          },
          ASKU: '[product-xb-4]'
      },
      {
          id: "5",
          name: "product E",
          characteristics: {
              color: "black",
              size: "L",
              sex: "m",
              material: "leather",
              type: "jacket",
              subtype: "biker"
          },
          ASKU: '[product-xb-5]'
      },
      {
          id: "6",
          name: "product F",
          characteristics: {
              color: "yellow",
              size: "S",
              sex: "f",
              material: "cotton",
              type: "blouse",
              subtype: "short sleeves"
          },
          ASKU: '[product-xb-6]'
      },
      {
          id: "7",
          name: "product G",
          characteristics: {
              color: "white",
              size: "M",
              sex: "m",
              material: "linen",
              type: "shirt",
              subtype: "long sleeves"
          },
          ASKU: '[product-xb-7]'
      },
      {
          id: "8",
          name: "product H",
          characteristics: {
              color: "purple",
              size: "L",
              sex: "f",
              material: "silk",
              type: "blouse",
              subtype: "sleeveless"
          },
          ASKU: '[product-xb-8]'
      },
      {
          id: "9",
          name: "product I",
          characteristics: {
              color: "brown",
              size: "XL",
              sex: "m",
              material: "wool",
              type: "sweater",
              subtype: "v-neck"
          },
          ASKU: '[product-xb-9]'
      },
      {
          id: "10",
          name: "product J",
          characteristics: {
              color: "red",
              size: "S",
              sex: "f",
              material: "cotton",
              type: "t-shirt",
              subtype: "short sleeves"
          },
          ASKU: '[product-xb-10]'
      },
      {
          id: "11",
          name: "product K",
          characteristics: {
              color: "blue",
              size: "L",
              sex: "m",
              material: "denim",
              type: "jeans",
              subtype: "slim fit"
          },
          ASKU: '[product-xb-11]'
      },
      {
          id: "12",
          name: "product L",
          characteristics: {
              color: "pink",
              size: "M",
              sex: "f",
              material: "silk",
              type: "dress",
              subtype: "casual"
          },
          ASKU: '[product-xb-12]'
      }
      ]
}






/**
 * Imports
 */

import { config } from 'dotenv'
import OpenAI from "openai";
import express from 'express'
import cors from 'cors'
config() //dotenv config
const app = express()





/**
 * Middlewares
 */

app.use(express.json())
app.use(cors())














/**
 * API
 */

let converstation = []

app.post('/chat', async (req,res) =>{
  const message = req.body.message
  converstation.push({role: 'user', content: message})
  const reply = await askToGPT(converstation)
  converstation.push({role: 'system', content: reply})
  res.json({message: reply})
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})















/**OPEN AI */



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
async function askToGPT() {
  


  const trainingData = [
    {role: 'system', content: `Your name as a AI bot is ${settings.name}`},
    {role: 'system', content: `You MUST speak ${settings.language}`},
    {role: 'system', content: `Your age is ${settings.age}`},
    {role: 'system', content: `You work for ${settings.company_name}, and your role is ${settings.company_role}`},
    {role: 'system', content: `Your job is to ${settings.job_description}. Once you found the product, you MUST refer to the product as [product-xb-"ASKU"] - replace ASKU with the product's ASKU`  },
    {role: 'system', content: JSON.stringify(productsData)},
  ]

  
  



  const layerOneConversation = trainingData.concat(converstation) //Layer one is system layer (add system resources)
  const layerTwoConversation = layerOneConversation.concat(converstation) //Layer two  is to transfer conversation text

  
  
  const completion = await openai.chat.completions.create({
    messages: layerOneConversation,
    model: "gpt-3.5-turbo",
  });


  //console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}




