import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import RegisterButton from '../../components/account/RegisterButton'
import RegisterContent from '../../components/account/RegisterContent'
import useInputs from '../../hooks/useInputs'
import styles from '../../styles/account/Register.module.css'

interface RegisterProcess {
    title: string,
    content: string
    name: string
    placeholder: string
    type: string
    process: number
}

function Register(){

    const history = useHistory()

    const [input, onChange, reset] = useInputs({
        email: "",
        password: "",
        username: "",
        name: "",
    })

    const [ profileImg, setProfileImg ] = useState(null)

    const [ registerProcess ] = useState<RegisterProcess[]>([
        {
            title: "type your email",
            content: "type your email...",
            name: "email",
            placeholder: "type your email...",
            type: "email",
            process: 0
        },
        {
            title: "type your name",
            content: "type your name...",
            name: "name",
            placeholder: "type your name...",
            type: "text",
            process: 1
        },
        {
            title: "type your username",
            content: "type your username...",
            name: "username",
            placeholder: "type your username...",
            type: "text",
            process: 2
        },
        {
            title: "type your password",
            content: "type your password...",
            name: "password",
            placeholder: "type your password...",
            type: "password",
            process: 3
        },
        {
            title: "select your profile image",
            content: "select your profile image...",
            name: "profileImg",
            placeholder: "select your profile image...",
            type: "file",
            process: 4
        },
    ])
    const [ currentProcess, setCurrentProcess ] = useState<number>(0)

    const onClickNextProcess = () => {
        setCurrentProcess(currentProcess => currentProcess+1)
    }

    const onClickPrevProcess = () => {
        setCurrentProcess(currentProcess => currentProcess-1)
    }


    return (
        <div className={styles.container}>
            <div className={styles.register_container}>
                <div className={styles.register_content_show_wrapper}>
                    <div className={styles.register_content_wrapper + ' ' + styles['process_'+String(currentProcess)]}>
                        {registerProcess.map((el: RegisterProcess, index: number) => (
                            <RegisterContent
                                key={index}
                                {...el}
                                value={input[el.name]}
                                onChange={onChange}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.register_button_wrapper}>
                    <RegisterButton onClickPrev={onClickPrevProcess} onClickNext={onClickNextProcess} currentProcess={currentProcess}/>
                </div>
            </div>
        </div>
    )
}

export default Register