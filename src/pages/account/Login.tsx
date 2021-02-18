import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AccountButton from '../../components/account/AccountButton'
import LoginInput from '../../components/account/LoginInput'
import useInputs from '../../hooks/useInputs'
import styles from '../../styles/account/Login.module.css'
import { DefaultInputType } from '../../types'

function Login(){

    const history = useHistory()

    const [input, onChange, reset] = useInputs({
        email: "",
        password: ""
    })

    const [ inputValues ] = useState<DefaultInputType[]>([
        {
            placeholder: "type your email...",
            name: "email",
            type: "email"
        },
        {
            placeholder: "type your password...",
            name: "password",
            type: "password"
        }
    ])

    return(
        <div className={styles.container}>
            <div className={styles.login_container}>
                {inputValues.map((el: DefaultInputType, index: number) => (
                    <LoginInput 
                        key={index} 
                        {...el} 
                        value={input[el.name!]}
                        onChange={onChange}
                    />
                ))}
                <AccountButton label={"log in"}/>
                <AccountButton label={"sign in with google"}/>
                <AccountButton label={"have no account? sign up now"} onClick={() => history.push("/account/register")}/>
            </div>
        </div>
    )
}

export default Login