import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import testData from './TestData.json'assert {type: "json"}

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
})


app.get('/getPost', (req, res) => {
  const data = testData.wordList
  let randomList = [];
  let counter = [];

  do {
    for(let i = 0; i < 20; i++) {
      let randomNum = Math.floor(Math.random()*data.length);
      if (!randomList.includes(data[randomNum])){  // Check if we have already this data in randomList then adding it
        randomList.push(data[randomNum])
      }else if(!counter.includes(data[randomNum].pos)){ // Adding 4 unique pos into counter 
        counter.push(data[randomNum].pos)
      }
    }
    // Loop stops once counter.length = 4 "means once we get our 4 unique pos in randomList"
    // and randomList.length is already 10
  } while ( randomList.length !== 10 && counter.length !== 4) 

  res.status(200).json(randomList.slice(0,10)) // Slice to get only 10 unique words
})

app.post('/postRank', (req, res) => {
  const data = testData.scoresList
  const score = Object.keys(req.body)
  
  let lowerScore = []
  for( let i of data){
    if(score > i){
      lowerScore.push(i)
    }
  }
  // To get the Rank use this formula : Percentile = (number of values below score) / (total number of scores) * 100
  let rank = lowerScore.length / data.length * 100
  res.status(201).json(rank)
})


