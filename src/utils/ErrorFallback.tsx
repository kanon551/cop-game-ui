import { useErrorBoundary } from "react-error-boundary";
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import { useEffect } from "react";


export const ErrorCard = styled('div')({
  display: 'flex',
  borderRadius: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  // boxShadow: '9px 9px 18px #bec8e4, -9px -9px 18px #fff',
  flexDirection: 'column',
  boxSizing: 'border-box',
  textAlign: 'center',
  padding: '24px',
  overflow: 'hidden',
  whiteSpace: 'normal',
  marginTop: "16px",
  position: 'relative',
  fontSize: '18px',
  fontWeight: '500',
  color: 'rgba(0,0,0,.93)',
  letterSpacing: '4.24px'
});

export const ErrorBlock = styled('div')({
  width: 'auto',
  minWidth: '270px',
  height: 'auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid black',
  borderRadius: '10px',
});

const ImageWrapper = styled('div')({
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2vh'
});

const CardImage = styled('img')({
  width: "-webkit-fill-available",
  height: '-webkit-fill-available',
  borderRadius: '8px',
  objectFit: 'cover',
  border: '4px solid #fff',
});

export const ErrorDesc = styled('div')({
  fontWeight: 300,
  fontSize: '1rem',
  marginTop: '2vh',
  marginBottom: '2vh'
});

const StyledButton = styled(Button)((props) => ({
  background: "#e4ebf5",
  padding: '1.5vh',
  fontWeight: 600,
  borderRadius: '25px',
  // boxShadow: "3px 3px 9px #bec8e4,-3px -3px 9px #fff",
  opacity: 1,
  pointerEvents: 'auto',
  '&.MuiButtonBase-root': {
    background: "#e4ebf5 !important",
  }
}));


export const ErrorFallback = ({ error }: { error: Error }) => {
  const { resetBoundary } = useErrorBoundary();

  // Convert the error to a string before rendering
  const errorString = error.toString();
  console.log(error)


  return (
    <ErrorBlock>
      <div style={{
        width: '85px',
        height: '85px',
        borderRadius: '50%',
        display: 'flex',
        position: 'absolute',
        top: '-50px',
        left: '0px',
        alignItems: 'center',
        justifyContent: 'center',
        background:'white',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 4px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px'
      }}>
      </div>
      <ErrorCard>
        ERROR OCCURED !
        <ImageWrapper>
          <CardImage src='https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?w=1380&t=st=1701763719~exp=1701764319~hmac=0d8f0d5c8ae25c81c75e2cec60c12a78cbe4fb3644c842b9f2a8b3742ee20d36' alt="img" draggable="false" />
        </ImageWrapper>
        <ErrorDesc>
          Something went wrong , Please try again after some time
        </ErrorDesc>
      </ErrorCard>

    </ErrorBlock>
  );
};