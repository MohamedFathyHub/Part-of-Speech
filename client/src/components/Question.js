import React , {useState , useEffect} from 'react';
import { postData } from '../api/api';
import { useNavigate } from 'react-router-dom';

import { Container , Button , Grid, Typography, FormControl ,RadioGroup, FormControlLabel , Radio , Alert , Snackbar , Box } from '@mui/material';
import LinearProgressWithLabel from './styles';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import { labels } from './styles';


const Question = ({ words , setcurrentPage , currentPage}) => {
  const navigate = useNavigate();

  const [value, setValue] = useState([]);
  const [correctValue, setCorrectValue] = useState('');
  const [progress , setProgress] = useState(0);
  const [score , setScore] = useState(0);
  const [rank , setRank] = useState(0);
  const [rating, setRating] = useState(0);

  // Alert States
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  // Post request to get the rank based on the score
  useEffect(() => {
    async function fetchData(){
      const {data} = await postData(score)
      setRank(data)
    }
    fetchData();
  },[score]);

  // Rating component
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  // Disabling alerts once alert is closed
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
    setOpenInfo(false);
  };

  const handleRadioChange = (e) => {
    setValue(e.target.value);
  };

  // onSubmit need to check 3 conditions and change ( score - Progress - rating - currentPage - alert(success/failed/info))
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === correctValue) {
      setcurrentPage(currentPage + 1);
      setScore((prevScore) => prevScore + 10)
      setRating((prevScore) => prevScore + 0.5)
      setOpenSuccess(true);
      setProgress((prevProgress)=> prevProgress + 10)
    } else if (!value.length) {
      setOpenInfo(true);
    } else if (value !== correctValue){
      setOpenError(true);
      setcurrentPage(currentPage + 1);
      setProgress((prevProgress)=> prevProgress + 10)
    } 
  };
  return (
    <> 
      <Container>
      { words?.map( word =>
        <Grid item xs={12} key={word?.id} style={{marginLeft: "30%"}}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>Answer the following Question :</Typography>
          <Typography variant="h5" gutterBottom>{`"${word?.word}" is a...`}</Typography>
          <FormControl variant="standard">
            <RadioGroup row value={value} onChange={handleRadioChange}>
              <FormControlLabel value="adjective" control={<Radio />} label="Adjective" />
              <FormControlLabel value="adverb" control={<Radio />} label="Adverb" />
              <FormControlLabel value="noun" control={<Radio />} label="Noun" />
              <FormControlLabel value="verb" control={<Radio />} label="Verb" />
            </RadioGroup>
            <Button variant="contained" type="submit" endIcon={<SendIcon />} onClick={() => (setCorrectValue(word?.pos))} >Continue ..</Button>
          </FormControl>
          <Container  sx={{ width: '100%' }}>
            <Snackbar open={openSuccess} autoHideDuration={1000} onClose={handleClose}>
              <Alert onClose={handleClose} variant="filled" severity="success">
                That's the correct answer..
              </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={1000} onClose={handleClose}>
              <Alert onClose={handleClose} variant="filled" severity="error" >
                Sorry, This is the wrong answer..
              </Alert>
            </Snackbar>
            <Snackbar open={openInfo} autoHideDuration={1000} onClose={handleClose}>
              <Alert onClose={handleClose} variant="filled" severity="info">
                You forgot to choose an answer..
              </Alert>
            </Snackbar>

          </Container>
        </form>
      </Grid>
)}
    {progress === 100 && (
        <Container style={{ marginLeft: '19%' }} spacing={10}>
            <Typography variant="h5" gutterBottom>
              {`Congratulations your score is ${score}% and your Rank is ${Math.round(rank)}`}
            </Typography>
          <Button 
            color='secondary' 
            variant="contained" 
            startIcon={<AutorenewIcon/>} 
            onClick={()=>navigate('/')} 
            style={{ marginLeft: '20%' }} >
              Retry
          </Button>
        </Container>

    )}
      <Box style={{ marginLeft: '38%' }}>
        <Rating
          size='large'
          readOnly
          value={rating}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {rating !== null && (
          <Box sx={{ ml: 2 }}>{labels[rating]}</Box>
        )}
      </Box>
      <LinearProgressWithLabel variant='determinate' value ={progress} />
    </Container> 
    </>
  )
}

export default Question