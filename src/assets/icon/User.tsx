import React, { HTMLAttributes } from 'react'
import { Icon } from './style'

export const User: React.FC<HTMLAttributes<HTMLSpanElement>> = ({
  ...rest
}) => {
  return (
    <Icon {...rest}>
      <svg
        width="64"
        height="79"
        viewBox="0 0 64 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.11 52.78C47.05 52.78 59.81 55.04 59.81 64.08C59.81 73.12 47.13 75.45 32.11 75.45C17.17 75.45 4.42004 73.21 4.42004 64.16C4.42004 55.12 17.09 52.78 32.11 52.78Z"
          stroke="#1F3341"
          strokeWidth="7"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.11 39.8799C22.31 39.8799 14.36 31.9299 14.36 22.1299C14.36 12.3299 22.31 4.37988 32.11 4.37988C41.91 4.37988 49.86 12.3299 49.86 22.1299C49.9 31.8999 42.01 39.8399 32.24 39.8799C32.2 39.8799 32.15 39.8799 32.11 39.8799Z"
          stroke="#99B876"
          strokeWidth="7"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        width="60"
        height="73"
        viewBox="0 0 60 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29.75 48.0017C13.71 48.0017 0 50.4817 0 60.3917C0 70.3017 13.62 72.8717 29.75 72.8717C45.8 72.8717 59.5 70.3917 59.5 60.4817C59.5 50.5717 45.89 48.0017 29.75 48.0017Z"
          fill="#1F3341"
        />
        <path
          d="M29.75 38.5617C40.48 38.7017 49.29 30.1217 49.43 19.3917C49.43 19.3517 49.43 19.3217 49.43 19.2817C49.35 8.55169 40.58 -0.0783108 29.85 0.0016892C29.82 0.0016892 29.78 0.0016892 29.75 0.0016892C19.02 -0.138311 10.21 8.44167 10.07 19.1717C10.07 19.2017 10.07 19.2417 10.07 19.2717C10.15 30.0017 18.92 38.6317 29.65 38.5517C29.68 38.5617 29.71 38.5617 29.75 38.5617Z"
          fill="#99B876"
        />
      </svg>
    </Icon>
  )
}
export default User
