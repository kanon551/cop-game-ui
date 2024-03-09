import React from 'react'
import { styled } from 'styled-components';
import chase from '../assets/racing.jpg';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import {useNavigate} from 'react-router-dom';

// Styled components for styling
const LandingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${chase});
  background-size: cover;
  color: white;
`;

const TextOverlay = styled.div`
  text-align: center;
  max-width: 600px;
`;


const Home = () => {
  const navigate = useNavigate();

  return (
    <LandingContainer>
      <TextOverlay>
        <Typography variant="h3" gutterBottom sx={{fontFamily:'fantasy', letterSpacing:'3px'}}>
           Welcome to the game! Help the cops capture the notorious escape artist.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/selectCops')}>
          Let's Play
        </Button>
      </TextOverlay>
    </LandingContainer>
  )
}

export default Home
