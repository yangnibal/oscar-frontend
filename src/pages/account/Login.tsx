import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Post } from '../../api'
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
            placeholder: "Type your email...",
            name: "email",
            type: "email"
        },
        {
            placeholder: "Type your password...",
            name: "password",
            type: "password"
        }
    ])

    const onClickLogin = () => {

        let formData = new FormData()
        formData.append("email", input.email)
        formData.append("password", input.password)

        Post({
            endpoint: "users/login/",
            data: formData,
            onSuccess: (res) => {
                localStorage.setItem("token", res.data.token)
                history.push("/chat")
            },
            onFailure: (err) => {
                console.log(err)
            }
        })
    }

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
                <AccountButton 
                    label={"log in"} 
                    onClick={onClickLogin}
                />
                <AccountButton 
                    label={"sign in with google"}
                />
                <AccountButton 
                    label={"have no account? sign up now"} 
                    onClick={() => history.push("/account/register")}
                />
            </div>
        </div>
    )
}

export default Login