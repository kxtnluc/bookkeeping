import { useEffect, useState } from "react"
import "./Library.css"
import { getLibraryByUserId } from "../../services/libraryService"
import { getBookById } from "../../services/googleBooksService"
import { StyledEngineProvider, Typography } from "@mui/material"
import { LibraryList } from "./LibraryList"
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
              return bObj[0];
            })
          );
      
          setReadlist(readListBooksArray);
        };
      
        const filterReadingBooksArray = async () => {
          const userReadingBooksArray = userBooks.filter((rr) => rr.percentRead > 0 && rr.percentRead < 100);
          const readingBooksArray = await Promise.all(
            userReadingBooksArray.map(async (urr) => {
              const bObj = await getKeepByBookId(urr.bookId);
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

            <section className="read-whole">

            <StyledEngineProvider injectFirst>
                <Typography className="lb-read-header" variant="h2">
                    Read
                </Typography>
            </StyledEngineProvider>

            <LibraryList books={readBooks} />

            </section>

            <section className="readlist-whole">

            <StyledEngineProvider injectFirst>
                <Typography className="lb-read-header" variant="h2">
                    Readlist
                </Typography>
            </StyledEngineProvider>

                <LibraryList books={readlist}/>

            </section>

            <section className="reading-whole">

            <StyledEngineProvider injectFirst>
                <Typography className="lb-read-header" variant="h2">
                    Reading
                </Typography>
            </StyledEngineProvider>

                <LibraryList books={reading}/>
            </section>

        </main>
    )
}