import React from 'react'
import styles from '../../styles/account/LoginInput.module.css'
import { DefaultInputType } from '../../types'

const LoginInput: React.FC<DefaultInputType> = ({placeholder, value, name, onChange, type}) => {
    return(
        <div className={styles.container}>
            <input 
                className={styles.input}
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
            />
        </div>
    )
}

export default LoginInput