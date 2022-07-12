import React, {useState} from 'react'
import Question from './Question'

import { getData } from '../api/api'
import { Typography , Button , Grid , Tab , Box , Container} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import QuizIcon from '@mui/icons-material/Quiz';

const Questions = () => {
  const [words , setWords] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage , setPostPerPage] = useState(1);


  // Sending get request to the server to get the Questions
  const handleContinue = async () => {
    const { data } = await getData()
    setWords(prevWords => prevWords.concat(data))
  }

  // To get 1 questions per page, we need do the following
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentWords = words.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <> 
        <Box sx={{ width: '100%', bgcolor: 'background.paper' , typography: 'body1'}}>
          <TabContext value="1" >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList  centered>
                <Tab icon={<QuizIcon/>} label="Questions" value="1" href='/questions'/>
                <Tab icon={<MilitaryTechIcon/>} label="Ranking" value="2"  disabled/>
              </TabList>
            </Box>
            <Container >
            <TabPanel value="1" >
      { words?.length ? ( 
            <Grid item xs={12}>
              <Question words={currentWords} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
            </Grid>)
        :  ( 
            <Grid item xs={12}>
              <Typography variant="h6">This is "Part of speech" activity, Note that there is 10 questions you need to check if the word is noun, verb, adjective or adverb</Typography>
              <Typography variant="h6">Press "Continue" once you're ready</Typography>
              <Button variant="contained" endIcon={<SendIcon />} onClick={handleContinue}>Continue ..</Button>
            </Grid>
        )}
            </TabPanel>
            </Container>
          </TabContext>
        </Box>
    </>
  )
}

export default Questions