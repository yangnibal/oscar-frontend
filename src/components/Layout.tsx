import React from 'react'
import styles from '../styles/Layout.module.css'

const Layout: React.FC = ({children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header_container}></div>
            <div className={styles.main_container}>
                <div className={styles.sidebar_container}>
                    <div className={styles.sidebar_content + ' ' + styles.sidebar_content__selected}>chat</div>
                </div>
                {children}
            </div>
            
        </div>
    )
}

export default Layout