import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Get } from '../../api'
import Layout from '../../components/Layout'
import withAuthRequest from '../../hocs/withAuthRequest'

function User(props: RouteComponentProps<{ id: string }>){

    useEffect(() => {
        Get({
            endpoint: `users/${props.match.params.id}`,
            onSuccess: (res) => {
                console.log(res)
            },
            onFailure: (err) => {
                console.log(err)
            }
        })
    }, [props.match.params.id])

    return(
        <Layout>

        </Layout>
    )
}

export default withAuthRequest(User)