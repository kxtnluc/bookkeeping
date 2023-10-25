/*  App.js
import { Box, Button, Tooltip } from '@mui/material';
import './App.css';
import * as React from 'react';
import Slider from '@mui/material/Slider';
import { StyledEngineProvider } from '@mui/material';


function App() {


  return (
    <div className="App">
      <Box sx={{ width: 400 }}>
        <StyledEngineProvider injectFirst>
          <Slider defaultValue={30} />
          <Slider className="slider" defaultValue={30} />
          <Button variant='contained'>Test One</Button>
          <Button className='button'>Test Two</Button>
        </StyledEngineProvider>
      </Box>
    </div>
  );
}

export default App;
 */


/* Code for getting the selflink object version of the book after fetching list of books-----

const bookItem = bArray.items[0]

getBookBySelfLink(bookItem.selfLink).then((bookObj) => {
    console.log(bookObj)
    setBook(bookObj)
}
) 

*/