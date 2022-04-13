import { Link, navigate, routes } from '@redwoodjs/router'
import { useRef, useState } from 'react'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useEffect } from 'react'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const emailRef = useRef()
  const pwdRef = useRef()
  const pwd2Ref = useRef()
  const [errorMatch, setError] = useState()
  const lowerCaseLetters = /[a-z]/g
  const upperCaseLetters = /[A-Z]/g
  const numbers = /[0-9]/g
  const minLen = 8
  const [errorLowerCase, setErrorLC] = useState()
  const [errorUpperCase, setErrorUC] = useState()
  const [errorNumber, setErrorNum] = useState()
  const [errorLen, setErrorLen] = useState()

  const onSubmit = async (data) => {
    if (!errorMatch) {
      console.log(data)
      const response = await signUp({ ...data })
      if (response.message) {
        toast(response.message)
      } else if (response.error) {
        toast.error(response.error)
      } else {
        // user is signed in automatically
        toast.success('Welcome!')
      }
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main className="rw-main">
        <Toaster toastOptions={{ duration: 100000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Username
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="email"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
                  </Label>
                  <TextField
                    name="email"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={emailRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                      pattern: {
                        value: /^[^@]+@[^.]+\..+$/,
                        message: 'Please input a valid email',
                      },
                    }}
                  />
                  <FieldError name="email" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className={
                      errorLowerCase ||
                      errorUpperCase ||
                      errorNumber ||
                      errorLen
                        ? 'rw-input rw-input-error'
                        : 'rw-input'
                    }
                    ref={pwdRef}
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                      pattern: {
                        value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                        message:
                          // 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
                          'Check password requirements below',
                      },
                    }}
                    onKeyUp={() => {
                      if (!pwdRef.current.value.match(lowerCaseLetters)) {
                        setErrorLC(true)
                      } else {
                        setErrorLC(false)
                      }
                      if (!pwdRef.current.value.match(upperCaseLetters)) {
                        setErrorUC(true)
                      } else {
                        setErrorUC(false)
                      }
                      if (!pwdRef.current.value.match(numbers)) {
                        setErrorNum(true)
                      } else {
                        setErrorNum(false)
                      }
                      if (pwdRef.current.value.length < minLen) {
                        setErrorLen(true)
                      } else {
                        setErrorLen(false)
                      }
                      // console.log(
                      //   pwdRef.current.value.length,
                      //   errorLowerCase,
                      //   errorUpperCase,
                      //   errorNumber,
                      //   errorLen
                      // )
                    }}
                  />
                  <FieldError name="password" className="rw-field-error" />
                  <Label
                    name="password-re-enter"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Re-enter Password
                  </Label>
                  <PasswordField
                    name="password-re-enter"
                    className={
                      errorMatch ? 'rw-input rw-input-error' : 'rw-input'
                    }
                    ref={pwd2Ref}
                    onKeyUp={() => {
                      if (pwd2Ref.current.value != pwdRef.current.value) {
                        setError('Passwords do no match')
                      } else {
                        setError()
                      }
                    }}
                  />

                  <p className="rw-input-error">{errorMatch}</p>
                  <p>Password must contains:</p>
                  <p className={errorLowerCase ? 'rw-input-error' : 'rw'}>
                    A <b>lowercase</b> letter
                  </p>
                  <p className={errorUpperCase ? 'rw-input-error' : 'rw'}>
                    A <b>capital (uppercase)</b> letter
                  </p>
                  <p className={errorNumber ? 'rw-input-error' : 'rw'}>
                    A <b>number</b>
                  </p>
                  <p className={errorLen ? 'rw-input-error' : 'rw'}>
                    Minimum <b>8 characters</b>
                  </p>

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
