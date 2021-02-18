import React from 'react'
import styles from '../../styles/account/AccountButton.module.css'

interface Props{
    label: string
    onClick?: () => void
}

const AccountButton: React.FC<Props> = ({label, onClick}) => {
    return(
        <div className={styles.container} onClick={onClick}>
            <div className={styles.label}>{label}</div>
        </div>
    )
}

export default AccountButton