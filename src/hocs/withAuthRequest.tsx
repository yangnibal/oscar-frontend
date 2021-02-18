import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Get, getToken } from '../api'
import { myUserData } from '../store/myData'

const withAuthRequest = (Component: React.ComponentType<any>) => ({...props}) => {

    const history = useHistory()
    const setMyData = useSetRecoilState(myUserData)

    useEffect(() => {
        if(!getToken()){
            history.push("/account/login")
        } else {
            Get({
                endpoint: "users/me/",
                onSuccess: (res) => {
                    console.log(res)
                    setMyData({...res.data})
                },
                onFailure: (err) => {
                    console.log(err)
                }
            })
        }
    }, [])

    return <Component {...{...props}} />
}

export default withAuthRequest