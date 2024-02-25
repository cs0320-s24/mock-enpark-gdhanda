import { Dispatch, SetStateAction } from 'react';
import "../styles/main.css";


interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export function LoginButton(props: loginProps) {

  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  if (props.isLoggedIn) {
    return (
      <button className='login-button' aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    )
  } else {
    return (
      <button className='login-button' aria-label='Login' onClick={authenticate}>Login</button>
    )
  }
}