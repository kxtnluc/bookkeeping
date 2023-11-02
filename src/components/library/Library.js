import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import "./Library.css"
import { getLibraryByUserId } from "../../services/libraryService"
import { getBookById } from "../../services/googleBooksService"
import { Button, ButtonGroup, StyledEngineProvider, Typography } from "@mui/material"
import { LibraryList, LibraryReadingList, LibraryReadingListItem } from "./LibraryList"
import { getKeepByBookId } from "../../services/theKeepService"

export const Library = ({currentUser}) => {

    const [userBooks, setUserBooks] = useState([])

    const [readBooks, setReadBooks] = useState([])
    const [readlist, setReadlist] = useState([])
    const [reading, setReading] = useState([])

    // const setFilteredBooks = (lArray) => {

    //     const filterReadBooks = () => {
    //         const userReadBooksArray = lArray.filter((rb) => rb.percentRead === 100)
    
    //         let readBooksArray = []
    //             for (const urb of userReadBooksArray) {
    //                 getKeepByBookId(urb.bookId).then((bObj) => {
    //                     readBooksArray.push(bObj[0])
    //                 })
    //             }
    //         if(readBooksArray !== 0){
    //             setReadBooks(readBooksArray)
    //         }
    //     }

    //     const filterReadlistBooks = () => {
    //         const userReadlistBooksArray = lArray.filter((rl) => rl.percentRead === 0)

    //         let readListBooksArray = []
    //             for (const url of userReadlistBooksArray) {
    //                 getKeepByBookId(url.bookId).then((bObj) => {
    //                     readListBooksArray.push(bObj[0])
    //                 })
    //             }

    //         setReadlist(readListBooksArray)

    //     }

    //     const filterReadingBooksArray = () => {
    //         const userReadingBooksArray = lArray.filter((rr) => rr.percentRead > 0 && rr.percentRead < 100)
            
    //         let readingBooksArray = []
    //             for (const urr of userReadingBooksArray) {
    //                 getKeepByBookId(urr.bookId).then((bObj) => {
    //                     readingBooksArray.push(bObj[0])
    //                 })
    //             }

    //         setReading(readingBooksArray)

    //     }

    //     filterReadBooks()
    //     filterReadlistBooks()
    //     filterReadingBooksArray()

    // }

    const setFilteredBooks = async () => {
        const filterReadBooks = async () => {
          const userReadBooksArray = userBooks.filter((rb) => rb.percentRead === 100);
          const readBooksArray = await Promise.all(
            userReadBooksArray.map(async (urb) => {
              const bObj = await getKeepByBookId(urb.bookId);
              bObj[0].percentRead = urb.percentRead
              return bObj[0];
            })
          );
      
          if (readBooksArray.length > 0) {
            setReadBooks(readBooksArray);
          }
        };
      
        const filterReadlistBooks = async () => {
          const userReadlistBooksArray = userBooks.filter((rl) => rl.percentRead === 0);
          const readListBooksArray = await Promise.all(
            userReadlistBooksArray.map(async (url) => {
              const bObj = await getKeepByBookId(url.bookId);
              bObj[0].percentRead = url.percentRead
              return bObj[0];
              // console.log(url)
              // console.log(bObj[0])
            })
          );
      
          setReadlist(readListBooksArray);
        };
      
        const filterReadingBooksArray = async () => {
          const userReadingBooksArray = userBooks.filter((rr) => rr.percentRead > 0 && rr.percentRead < 100);
          const readingBooksArray = await Promise.all(
            userReadingBooksArray.map(async (urr) => {
              const bObj = await getKeepByBookId(urr.bookId);
              bObj[0].percentRead = urr.percentRead
              return bObj[0];
            })
          );
      
          setReading(readingBooksArray);
        };
      
        // Use Promise.all to wait for all filtering functions to complete
        await Promise.all([filterReadBooks(), filterReadlistBooks(), filterReadingBooksArray()]);
      };

    const getAndSetUserBooks = () => {
        getLibraryByUserId(currentUser.id).then((lArray) => {
            
            setUserBooks(lArray) 
            
        })
    }


    useEffect(() => {
        getAndSetUserBooks()
    }, [currentUser])

    useEffect(() => {
        setFilteredBooks()
    }, [userBooks])


    return (
        <main className="lb-whole">
            <StyledEngineProvider injectFirst>
                <Typography className="lb-header" variant="h1">
                    LIBRARY
                </Typography>
            </StyledEngineProvider>

            <section className="lb-nav">
              <StyledEngineProvider injectFirst>
                <ButtonGroup orientation="vertical" color="success" size="medium" variant="text" aria-label="lb-navbar">

                  <a href="#read-section">
                    <Button className="btn">Read</Button>
                  </a>


                  <a href="#readlist-section">
                    <Button className="btn">Readlist</Button>
                  </a>

                  <a href="#reading-section">
                    <Button className="btn">Reading</Button>
                  </a>

                </ButtonGroup>
              </StyledEngineProvider>
            </section>

            <section id="read-section" className="read-whole">

            <StyledEngineProvider injectFirst>
                <Typography className="lb-read-header" variant="h2">
                    Read
                </Typography>
            </StyledEngineProvider>

            <LibraryList books={readBooks} />

            </section>

            <section id="readlist-section" className="readlist-whole">

            <StyledEngineProvider injectFirst>
                <Typography className="lb-read-header" variant="h2">
                    Readlist
                </Typography>
            </StyledEngineProvider>

                <LibraryList books={readlist}/>

            </section>

            <section id="reading-section" className="reading-whole">

            <StyledEngineProvider injectFirst>
                <Typography className="lb-read-header" variant="h2">
                    Reading
                </Typography>
            </StyledEngineProvider>
            <ul className="lrl-list">
                {reading.map((rr) => {
                  return <LibraryReadingListItem userBooks={userBooks} book={rr} />
                })}

            </ul>
                {/* <LibraryReadingList reading={reading}/> */}
            </section>

        </main>
    )
}