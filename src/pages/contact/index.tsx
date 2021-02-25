import React, { useEffect, useState } from 'react'
import { Get } from '../../api'
import MyContactContent from '../../components/contact/MyContactContent'
import OtherContent from '../../components/contact/OtherContent'
import Layout from '../../components/Layout'
import withAuthRequest from '../../hocs/withAuthRequest'
import styles from '../../styles/contact/Contact.module.css'
import { User } from '../../types'

function Contact(){

    const [ toggle, setToggle ] = useState<number>(0)
    const [ myContactList, setMyContactList ] = useState<User[]>([])
    const [ otherList, setOtherList ] = useState<User[]>([])

    useEffect(() => {
        Get({
            endpoint: "users/getfollowers/",
            onSuccess: (res) => {
                setMyContactList(res.data)
            },
            onFailure: (err) => {
                console.log(err)
            }
        })
        Get({
            endpoint: "users/getothers/",
            onSuccess: (res) => {
                setOtherList(res.data)
            },
            onFailure: (err) => {
                console.log(err)
            }
        })
    }, [])

    const onClickMyContact = (id: number) => {

    }

    const onClickOther = (id: number) => {

    }

    const onClickAddButton = (id: number) => {

    }

    const onClickDeleteButton = (id: number) => {

    }

    return(
        <Layout>
            <div className={styles.container}>
                <div className={styles.toggle_content_wrapper}>
                    <div onClick={() => setToggle(0)} className={toggle===0 ? styles.toggle_content + ' ' + styles.toggle_content__selected : styles.toggle_content}>My Contacts</div>
                    <div onClick={() => setToggle(1)} className={toggle===1 ? styles.toggle_content + ' ' + styles.toggle_content__selected : styles.toggle_content}>Others</div>
                </div>
                <div className={styles.search_input_wrapper}>
                    <input 
                        className={styles.search_input}
                        placeholder="Search as name or username..."
                    />
                </div>
                <div className={styles.slide_container}>
                    <div className={toggle===0 ? styles.slide_wrapper + ' ' + styles.slide_wrapper_left : styles.slide_wrapper + ' ' + styles.slide_wrapper_right}>
                        <div className={styles.slide_content}>
                            {myContactList.map((el: User, index: number) => (
                                <MyContactContent 
                                    onClick={() => onClickMyContact(el.id)} 
                                    onClickDeleteButton={() => onClickDeleteButton(el.id)}
                                    {...el} 
                                    key={index}
                                />
                            ))}
                        </div>
                        <div className={styles.slide_content}>
                            {otherList.map((el: User, index: number) => (
                                <OtherContent 
                                    onClick={() => onClickOther(el.id)} 
                                    onClickAddButton={() => onClickAddButton(el.id)}
                                    onClickDeleteButton={() => onClickDeleteButton(el.id)}
                                    {...el} 
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withAuthRequest(Contact)