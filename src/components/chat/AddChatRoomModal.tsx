import React, { useEffect, useState } from 'react'
import { Get } from '../../api'
import styles from '../../styles/chat/Modal.module.css'
import ContactContent from './ContactContent'
import SelectedContent from './SelectedContent'

interface Props {
    setModalHide: () => void
}

interface Contact {
    id: number,
    email: string
    name: string
    username: string
    profile_img: string | null
}

const AddChatRoomModal: React.FC<Props> = ({setModalHide}) => {

    const [ contactList, setContactList ] = useState<Contact[]>([])
    const [ participants, setParticipants ] = useState<Contact[]>([])

    useEffect(() => {
        Get({
            endpoint: "users/getfollowers/",
            onSuccess: (res) => {
                setContactList(res.data)
            },
            onFailure: (err) => {
                console.log(err)
            }
        })
    }, [])

    const onClickContact = (id: number) => {
        const selectedContact = contactList.find((el: Contact) => el.id===id)
        setParticipants(participants => [...participants, selectedContact!])
        setContactList(contactList => contactList.filter((el: Contact) => el.id!==id))
    }

    const onClickDelete = (id: number) => {
        const participant = participants.find((el: Contact) => el.id===id)
        setContactList(contactList => [...contactList, participant!])
        setParticipants(participants => participants.filter((el: Contact) => el.id!==id))
    }

    return(
        <div className={styles.container}>
            <div className={styles.background_container} onClick={setModalHide}/>
            <div className={styles.modal_wrapper}>
                <div className={styles.modal_title}>Create Room</div>
                <div className={styles.input_wrapper}>
                    <input
                        className={styles.input}
                        placeholder="Type room title...(If blank, specified as member name)"
                    />
                </div>
                <div className={styles.input_wrapper}>
                    <input
                        className={styles.input}
                        placeholder="Type simple room description"
                    />
                </div>
                <div className={styles.search_wrapper}>
                    <div className={styles.search_selected_wrapper}>
                        <div className={styles.search_selected}>
                            {participants.map((el: Contact, index: number) => (
                                <SelectedContent 
                                    {...el} 
                                    onClickDelete={() => onClickDelete(el.id)} 
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.search_contact_wrapper}>
                        <div className={styles.search_input_wrapper}>
                            <input
                                className={styles.search_input}
                                placeholder="Search as name or username..."
                            />
                        </div>
                        <div className={styles.contacts_wrapper}>
                            {contactList.map((el: Contact, index: number) => (
                                <ContactContent 
                                    onClick={() => onClickContact(el.id)} 
                                    {...el} 
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddChatRoomModal