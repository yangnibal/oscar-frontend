import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Delete, Get, Post } from '../../api'
import MyContactContent from '../../components/contact/MyContactContent'
import OtherContent from '../../components/contact/OtherContent'
import Layout from '../../components/Layout'
import withAuthRequest from '../../hocs/withAuthRequest'
import styles from '../../styles/contact/Contact.module.css'
import { User } from '../../types'

function Contact(){

    const history = useHistory()

    const [ toggle, setToggle ] = useState<number>(0)
    const [ myContactList, setMyContactList ] = useState<User[]>([])
    const [ otherList, setOtherList ] = useState<User[]>([
        {
            name: "test1",
            username: "test1",
            profile_img: null,
            email: "test1",
            id: 1
        },
        {
            name: "testtest2",
            username: "testtest2",
            profile_img: null,
            email: "testtest2",
            id: 1
        },
        {
            name: "testtesttest3",
            username: "testtesttest3",
            profile_img: null,
            email: "testtesttest3",
            id: 1
        },
        {
            name: "test1",
            username: "test1",
            profile_img: null,
            email: "test1",
            id: 1
        },
        {
            name: "testtest2",
            username: "testtest2",
            profile_img: null,
            email: "testtest2",
            id: 1
        },
        {
            name: "testtesttest3",
            username: "testtesttest3",
            profile_img: null,
            email: "testtesttest3",
            id: 1
        },
        {
            name: "test1",
            username: "test1",
            profile_img: null,
            email: "test1",
            id: 1
        },
        {
            name: "testtest2",
            username: "testtest2",
            profile_img: null,
            email: "testtest2",
            id: 1
        },
        {
            name: "testtesttest3",
            username: "testtesttest3",
            profile_img: null,
            email: "testtesttest3",
            id: 1
        },
        {
            name: "test1",
            username: "test1",
            profile_img: null,
            email: "test1",
            id: 1
        },
        {
            name: "testtest2",
            username: "testtest2",
            profile_img: null,
            email: "testtest2",
            id: 1
        },
        {
            name: "testtesttest3",
            username: "testtesttest3",
            profile_img: null,
            email: "testtesttest3",
            id: 1
        },
        {
            name: "test1",
            username: "test1",
            profile_img: null,
            email: "test1",
            id: 1
        },
        {
            name: "testtest2",
            username: "testtest2",
            profile_img: null,
            email: "testtest2",
            id: 1
        },
        {
            name: "testtesttest3",
            username: "testtesttest3",
            profile_img: null,
            email: "testtesttest3",
            id: 1
        },

    ])
    
    const [ keyword, setKeyword ] = useState<string>("")

    const slideContainer = useRef<HTMLDivElement>(null)
    const slideWrapper = useRef<HTMLDivElement>(null)

    const getContactByKeyword = (keyword?: string) => {
        Get({
            endpoint: `users/getfollowers/?keyword=${keyword}`,
            onSuccess: (res) => {
                setMyContactList(res.data)
            },
            onFailure: (err) => {
                console.log(err)
            }
        })
        Get({
            endpoint: `users/getothers/?keyword=${keyword}`,
            onSuccess: (res) => {
                //res.data.filter((el: User) => !otherList.find((el2: User) => el2.id===el.id))
                setOtherList(res.data)
            },
            onFailure: (err) => {
                console.log(err)
            }
        })
    }

    const onContactFadeOut = () => {

    }

    useEffect(() => {
        if(slideContainer.current && slideWrapper.current){
            const wrapperHeight = slideWrapper.current.clientHeight
            slideContainer.current.style.height = String(wrapperHeight) + 'px'
        }
    }, [slideContainer.current, slideWrapper.current?.clientHeight])

    useEffect(() => {
        getContactByKeyword(keyword)
    }, [keyword])

    const onClickMyContact = (id: number) => {
        history.push(`/user/${id}`)
    }

    const onClickOther = (id: number) => {
        history.push(`/user/${id}`)
    }

    const onClickAddButton = (id: number) => {

        let formData = new FormData()

        Post({
            endpoint: "",
            data: formData,
            onSuccess: (res) => {
                console.log(res)
            },
            onFailure: (err) => {
                console.log(err)
            }
        })
    }

    const onClickDeleteButton = (id: number) => {
        Delete({
            endpoint: "",
            onSuccess: (res) => {
                console.log(res)
            },
            onFailure: (err) => {
                console.log(err)
            }
        })
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
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div className={styles.slide_container} ref={slideContainer}>
                    <div className={toggle===0 ? styles.slide_wrapper + ' ' + styles.slide_wrapper_left : styles.slide_wrapper + ' ' + styles.slide_wrapper_right} ref={slideWrapper}>
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