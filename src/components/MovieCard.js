import * as React from 'react';
import './MovieCard.css';
import { useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';


export default function MovieCard({title, backdrop, genres, releaseDate, language, poster, description, rating}) {

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    //backgroundImage: `http://image.tmdb.org/t/p/w1280${backdrop}`,
    border: '1px solid #000',
    borderRadius: '20px',
    boxShadow: '24 white',
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //------------------- Function to remove from Firestore ---------------------
  const removeFromFirebase = async () => {
    await deleteDoc(doc(db, "users", auth.currentUser.uid, 'watch_list'))
    //this.props.currentWatchList()
  }

  //------------------- Function to add to Firestore ---------------------
  const addMovieToFirebase = async () => {
    //console.log('starting firestore process')
    try{
      await setDoc(doc(db, "users", auth.currentUser.uid, "watch_list", title), {
        title: title,
        backdrop: backdrop,
        genres: genres,
        releaseDate: releaseDate,
        language: language,
        poster: `http://image.tmdb.org/t/p/w342${poster}`,
        description: description,
        rating: rating
      })
      console.log('Added to Watch List');
    } 
    catch (error) {
      console.log('Error adding to Watch List')
    }
  }


  return (
    <Card sx={{ 
      height: '100%', 
      display:'flex', 
      maxWidth: 345, 
      margin: '2%', 
      flexDirection: 'column', 
      backgroundColor: '#000e1aff',
      color: '#f7f7f2ff',
      borderColor: '#000e1aff',
      border: '1px solid #000',
      borderRadius: '10px',
      p: 2,
      }}>
      <CardMedia
          component="img"
          height= 'auto'
          image={`http://image.tmdb.org/t/p/w342${poster}`}
          alt="movie poster"
          sx={{
            border: '1px solid #000',
            borderRadius: '10px',
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{color: '#f7f7f2ff'}}>
              Released Date: {releaseDate}
            </Typography>
        </CardContent>
      <CardActions>
          <Button onClick={handleOpen} variant="contained" size="small" color="primary" sx={{backgroundColor: '#003a66ff', color: '#f7f7f2ff'}}>See More</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      {title}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {description}
                  </Typography>
                  <Button onClick={addMovieToFirebase} variant="contained" size="small" color="primary" sx={{marginTop: '3%', backgroundColor: '#003a66ff', color: '#f7f7f2ff'}}>
                    Add to Watch List
                  </Button>
                </Box>
              </Modal>
          <Button onClick={addMovieToFirebase} variant="contained" size="small" sx={{backgroundColor: '#003a66ff', color: '#f7f7f2ff'}}>
            Add to Watch List
          </Button>
      </CardActions>
    </Card>
  );
}