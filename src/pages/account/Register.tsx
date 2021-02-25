import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SubmitButton from '../../components/account/SubmitButton'
import RegisterButton from '../../components/account/RegisterButton'
import RegisterContent from '../../components/account/RegisterContent'
import useInputs from '../../hooks/useInputs'
import styles from '../../styles/account/Register.module.css'
import { Post } from '../../api'

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

    const [ profileImg, setProfileImg ] = useState<any>(null)
    const [ profileImgPreview, setProfileImgPreview ] = useState<string>("")
    const [ isDisable, setIsDisable ] = useState(true)
    const [ registerProcess ] = useState<RegisterProcess[]>([
        {
            title: "Type your email",
            content: "Type your email...",
            name: "email",
            placeholder: "Type your email...",
            type: "email",
            process: 0
        },
        {
            title: "Type your name",
            content: "Type your name...",
            name: "name",
            placeholder: "Type your name...",
            type: "text",
            process: 1
        },
        {
            title: "Type your username",
            content: "Type your username...",
            name: "username",
            placeholder: "Type your username...",
            type: "text",
            process: 2
        },
        {
            title: "Type your password",
            content: "Type your password...",
            name: "password",
            placeholder: "Type your password...",
            type: "password",
            process: 3
        },
        {
            title: "Select your profile image",
            content: "Select your profile image...",
            name: "profileImg",
            placeholder: "Select your profile image...",
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

    const onClickSubmit = () => {

        let formData = new FormData()
        formData.append("email", input.email)
        formData.append("password", input.password)
        formData.append("username", input.username)
        formData.append("name", input.name)
        profileImg && formData.append("profile_img", profileImg!)

        Post({
            endpoint: "users/",
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

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader()

        reader.onloadend = () => {
            setProfileImgPreview(reader.result!.toString())
        }

        if(e.target.files){
            setProfileImg(e.target.files[0])
            reader.readAsDataURL(e.target.files[0])
        }
    }

    useEffect(() => {
        if(input.email && input.password && input.name && input.username){
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    }, [input])

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
                                onFileChange={onFileChange}
                                profileImgPreview={profileImgPreview}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.register_button_wrapper}>
                    <RegisterButton onClickPrev={onClickPrevProcess} onClickNext={onClickNextProcess} currentProcess={currentProcess}/>
                </div>
                <SubmitButton label={"submit"} onClick={onClickSubmit} disable={isDisable}/>
            </div>
        </div>
    )
}

export default Register