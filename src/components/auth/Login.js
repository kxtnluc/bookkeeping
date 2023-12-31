import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
// import "./Login.css"
import { getUserByEmail } from "../../services/userService"
import { Button, StyledEngineProvider, TextField } from "@mui/material"
import { green } from "@mui/material/colors"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "bookkeep_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/thekeep")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">BooKKeeping</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <TextField
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <StyledEngineProvider injectFirst>
                <Button className="signin-btn" variant="outlined" type="submit">Sign in</Button>
              </StyledEngineProvider>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}

