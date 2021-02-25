import React from 'react'
import styles from '../../styles/chat/Modal.module.css'
import UserDefault from '../../assets/user-default.svg'
import { defaultUrl } from '../../api'

interface Props {
    id: number
    onClick: () => void
    name: string
    username: string
    email: string
    profile_img: string | null
}

const ContactContent: React.FC<Props> = ({id, onClick, name, username, email, profile_img}) => {
    return(
        <div className={styles.contact_content} onClick={onClick}>
            <div className={styles.profile_img_wrapper}>
                <img src={defaultUrl+profile_img?.replace("/", "") || UserDefault} alt="" className={styles.profile_img}/>
            </div>
            <div className={styles.contact_username}>{username}</div>
            <div className={styles.contact_name}>({name})</div>
            <div className={styles.contact_email}>{email}</div>
        </div>
    )
}

export default ContactContent