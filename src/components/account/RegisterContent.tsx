import { type } from 'os'
import React, { useEffect } from 'react'
import styles from '../../styles/account/RegisterContent.module.css'
import UserDefault from '../../assets/user-default-colored.svg'

interface Props {
    title: string,
    content: string,
    name: string
    placeholder: string
    value?: string,
    type: string
    onChange?: () => void
    onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    profileImgPreview?: string
}

const RegisterContent: React.FC<Props> = ({title, content, name, placeholder, value, type, onChange, onFileChange, profileImgPreview}) => {

    return(
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.input_wrapper}>
                <input
                    className={styles.input}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    id={name}
                    onChange={type==="file" ? onFileChange : onChange}
                    style={type==="file" ? {display: 'none'} : {}}
                />
                {type==="file" && (
                    <label className={styles.label} htmlFor={name}>
                        {profileImgPreview ? 
                        <img className={styles.img} src={profileImgPreview} alt=""/>
                        :
                        <img className={styles.img} style={{padding: "15px", boxSizing: "border-box"}} src={UserDefault} alt=""/>
                        }
                    </label>
                )}
            </div>
        </div>
    )
}

export default RegisterContent