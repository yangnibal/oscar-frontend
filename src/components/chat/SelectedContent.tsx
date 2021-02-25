import React from 'react'
import styles from '../../styles/chat/Modal.module.css'
import UserDefault from '../../assets/user-default-colored.svg'
import X from '../../assets/x.svg'
import { defaultUrl } from '../../api'

interface Props {
    profile_img: string | null
    username: string
    onClickDelete: () => void
}

const SelectedContent: React.FC<Props> = ({profile_img, username, onClickDelete}) => {
    return(
        <div className={styles.selected_content}>
            <section style={{display: "flex", alignItems: "center"}}>
                <div className={styles.profile_img_wrapper}>
                    <img src={defaultUrl+profile_img?.replace("/", "") || UserDefault} alt="" className={styles.profile_img}/>
                </div>
                <div className={styles.selected_username}>{username}</div>
            </section>
            <div className={styles.delete_icon_wrapper} onClick={onClickDelete}>
                <img src={X} alt="" className={styles.delete_icon}/>
            </div>
        </div>
    )
}

export default SelectedContent