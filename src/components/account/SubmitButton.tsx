import React from 'react'
import styles from '../../styles/account/SubmitButton.module.css'

interface Props {
    label: string
    onClick?: () => void
    disable: boolean
}

const SubmitButton: React.FC<Props> = ({label, onClick, disable}) => {
    return(
        <div className={disable ? styles.container + ' ' + styles.container_disable : styles.container + ' ' + styles.container_not_disable} onClick={onClick}>
            <div className={styles.label} style={!disable ? {color: "#ffffff"} : {}}>{label}</div>
        </div>
    )
}

export default SubmitButton