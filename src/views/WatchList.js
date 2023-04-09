import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doc, getDoc, collection, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import WatchListCard from '../components/WatchListCard';


const theme = createTheme();

export default function Album() {

  const [watchList, setWatchList] = useState([])
  

  const viewWatchList = async () =>{
    const WatchList = []
    const subColRef = collection(db, "users", auth.currentUser.uid, "watch_list")
    onSnapshot(subColRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        WatchList.push(doc.data())
      }) 
      setWatchList(WatchList)
      //console.log(WatchList)
    })
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Watch List
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              Saved movies and shows for later
            </Typography>
            <Button onClick={viewWatchList} variant="contained">View Watch List</Button>
          </Container>
        </Box>
        <Container maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {watchList.map((watchList) => (
              <Grid item key={watchList.key} xs={12} sm={6} md={4} lg={3} sx={{ my: 1 }}>
                <WatchListCard
                  watchList={watchList}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
