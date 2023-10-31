import { Outlet, Route, Routes } from "react-router-dom"
import { TheKeep } from "../components/home/TheKeep"
import { BookPage } from "../components/book/BookPage"
import { NavBar } from "../components/nav/NavBar"
import { Library } from "../components/library/Library"
import { Profile } from "../components/profile/Profile"
import { ReviewPage } from "../components/Reviews/ReviewPage"
import { WriteReview } from "../components/Reviews/WriteReview"
import { EditReview } from "../components/Reviews/EditReview"
import { EditBook } from "../components/book/EditBook"

export const UserView = ({ currentUser }) => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <div>
                            <NavBar currentUser={currentUser}/>
                        </div>
                        <div>
                            <Outlet />
                        </div>
                    </>
                }
            >
                <Route path='/'>
                    <Route path='/thekeep'>
                        <Route index element={<TheKeep />} />

                        <Route path="book">
                            <Route path=":bookId" element={<BookPage currentUser={currentUser}/>} />
                            <Route path=":bookId/edit" element={<EditBook currentUser={currentUser}/>} />
                        </Route>

                        <Route path="review">
                            <Route path=":reviewId" element={<ReviewPage currentUser={currentUser}/>} />
                            <Route path="writeReview/:keepId" element={<WriteReview currentUser={currentUser}/>} />
                            <Route path="editReview/:reviewId" element={<EditReview currentUser={currentUser}/>} />
                        </Route>

                    </Route>

                    <Route path="/search">
                        <Route index element={<>a</>}/>
                    </Route>
                    
                    <Route path="/library">
                        <Route index element={<Library currentUser={currentUser} />} />   
                    </Route>

                    <Route path="/profile">
                        <Route path=":userId" element={<Profile currentUser={currentUser}/> } />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}