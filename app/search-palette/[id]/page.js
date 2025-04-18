import WholePage from '@/components/WholePage'
import React from 'react'

const Page = async ({params}) => {

    const {id} = await params

    return (
        <>
            <WholePage MovieInfoId={id} />
        </>
    )
}

export default Page

export const metadata = {
    title: "Movie Hunt - Find Movies that you like!",
}