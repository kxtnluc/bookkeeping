import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, StyledEngineProvider, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { forwardRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeFromKeep, updateKeepEntry } from '../../services/theKeepService';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const EditBook = () => {

    const [openModal, setOpenModal] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    const [book, setBook] = useState({
        id: location.state.id,
        bookName: location.state.bookName,
        bookId: location.state.bookId,
        bookDescription: location.state.bookDescription,
        bookAuthor: location.state.bookAuthor,
        bookImg: location.state.bookImg
    })

    const handleOpen = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleStateChange = (e) => {
        const stateCopy = { ...book }
        stateCopy[e.target.name] = e.target.value
        setBook(stateCopy)
    }

    const handleImgChange = (e) => {

        let files = e.target.files

        let reader = new FileReader()
        reader.readAsDataURL(files[0])

        reader.onload = (e) => {
            console.warn("img data ", e.target.result)
            const stateCopy = { ...book }
            stateCopy["bookImg"] = e.target.result
            setBook(stateCopy)
        }

    }

    const handleSubmit = () => {
        updateKeepEntry(book)
        navigate(`/thekeep/book/${book.bookId}`)
    }

    const handleDelete = () => {
        console.log('deleting. . .')
        removeFromKeep(book.id)
        navigate(`/thekeep`)
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <>
            <main className="ebp-whole">
                <section className="ebp-top">
                    <article className="ebp-cover-rating-container">
                        <div className="ebp-cover">
                            <img
                                className="ebp-cover-img"
                                width={320}
                                height={480}
                                alt=""
                                src={book.bookImg}
                            />
                        </div>
                    </article>
                    <article className="ebp-title-status-desc-container">
                        <div className="ebp-title-author-status">
                            <StyledEngineProvider injectFirst>
                                <TextField name='bookName' onChange={handleStateChange} variant='standard' className="ebp-title" value={book.bookName} />

                                <TextField name='bookAuthor' onChange={handleStateChange} variant='standard' value={book.bookAuthor} className="ebp-author ebp-author-edit" />
                            </StyledEngineProvider>
                        </div>
                        <StyledEngineProvider injectFirst>
                            <TextField onChange={handleStateChange} name='bookDescription' multiline rows={11} className="ebp-desc"
                                value={book.bookDescription}
                            />
                        </StyledEngineProvider>
                    </article>
                </section>
                <section className='ebp-button-section'>
                    <article className='edp-img'>
                        <StyledEngineProvider injectFirst>
                            <Button name='bookImg' component="label" startIcon={<CloudUploadIcon />} className='edp-img-btn' variant="contained">
                                Upload File
                                <VisuallyHiddenInput name='bookImg' onChange={handleImgChange} accept="image/png, image/jpeg" type="file" />
                            </Button>
                        </StyledEngineProvider>
                    </article>
                    <article className='edp-submit'>
                        <StyledEngineProvider injectFirst>
                            <Button onClick={handleSubmit} className='edp-sub-btn' variant='contained'>Submit</Button>
                            <Button
                                onClick={handleOpen}
                                color='error'
                                className='edp-del-btn'
                                variant='outlined'
                            >
                                DELETE
                            </Button>
                            <Dialog
                                open={openModal}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Delete This Entry From The Keep?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Deleting this entry could mess up other user's libraries and result in errors. It could also become unretrivable after deletion, so make sure you know what your doing, and make sure this book is attached to no other libraries before deleting!
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button variant='contained' color='error' onClick={handleDelete}>DELETE !</Button>
                                </DialogActions>
                            </Dialog>

                        </StyledEngineProvider>
                    </article>
                </section>
            </main>
        </>
    )
}