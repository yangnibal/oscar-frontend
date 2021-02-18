import { type } from 'os'
import React, { useEffect } from 'react'
import styles from '../../styles/account/RegisterContent.module.css'

interface Props {
    title: string,
    content: string,
    name: string
    placeholder: string
    value?: string,
    type: string
    onChange?: () => void
}

const RegisterContent: React.FC<Props> = ({title, content, name, placeholder, value, type, onChange}) => {

    return(
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
            <input
                className={styles.input}
                name={name}
                placeholder={placeholder}
                value={value}
                type={type}
                id={name}
                onChange={onChange}
                style={type==="file" ? {display: 'none'} : {}}
            />
            {type==="file" && (
                <label className={styles.label} htmlFor={type}>
                    <img className={styles.img}/>
                </label>
            )}
        </div>
    )
}

export default RegisterContent