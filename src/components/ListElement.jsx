import React from 'react'

import styles from './ListElement.module.css'

import nomovie from '../images/nomovie.jpg'

function ListElement(props) {

    const poster = props.props.poster?props.props.poster:nomovie

    return (
        <div>
            <div className={styles.container}>
                <img src={poster} alt=""/>
                <div>
                    <h5>{props.props.original_title}</h5>
                    <a className={styles.element} href={"https://www.imdb.com/title/"+props.props.imdb+"/"} target="_blank" rel="noopener noreferrer">IMDB</a>
                </div>
            </div>
            <div className={styles.divider}></div>
        </div>
        
    )
}

export default ListElement
