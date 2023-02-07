import React from 'react'

export default function Header(props) {
    return (
        <div className="">
            <h1 className='text-center py-3'>
                {props.children}
            </h1>
        </div>
    )
}
