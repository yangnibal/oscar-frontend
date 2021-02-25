import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import styles from '../styles/Layout.module.css'

interface SidebarContent {
    content: string
    to: string
}

const Layout: React.FC = ({children}, props: RouteComponentProps) => {

    const history = useHistory()

    const [ sidebarContent, setSidebarContent ] = useState<SidebarContent[]>([
        {
            content: "Chat",
            to: "/chat"
        },
        {
            content: "Contact",
            to: "/contact"
        }
    ])
    const [ selectedSidebar, setSelectedSidebar ] = useState<string>("")

    useEffect(() => {
        setSelectedSidebar(window.location.pathname)
    }, [window.location])

    return (
        <div className={styles.container}>
            <div className={styles.header_container}></div>
            <div className={styles.main_container}>
                <div className={styles.sidebar_container}>
                    {sidebarContent.map((el: SidebarContent, index: number) => (
                        <div 
                            className={selectedSidebar===el.to ? styles.sidebar_content + ' ' + styles.sidebar_content__selected : styles.sidebar_content}
                            onClick={() => history.push(el.to)}
                            key={index}
                        >
                            {el.content}
                        </div>
                    ))}
                </div>
                {children}
            </div>
            
        </div>
    )
}

export default Layout