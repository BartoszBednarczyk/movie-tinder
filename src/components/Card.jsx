import React from 'react'
import Zoom from 'react-reveal/Zoom'
import styles from './Card.module.css'
import stars from '../images/shine.png'
import info from '../images/info.png'

function Card({props}) {

    
    return (
        <div className={styles.container}>
            <div className={styles.card} style={{backgroundImage:`url(${props.poster})`}}>
                <div className={styles.votes}>
                    <img src={stars} alt=""/>
                    <p><b>{props.vote_average?props.vote_average:"?"}</b></p>
                </div>
                <div className={styles.title}>
                    <div className={styles.tags}>
                        <p className={styles.tag}>{props.release_date}</p>
                        <p className={styles.tag}>{props.genres}</p>
                    </div>
                    <h1>{props.original_title}</h1>
                </div>
                <div className={styles.info}>
                <img src={info} className={styles.infoIcon} alt=""/>
            </div>
            </div>
            
            
        </div>
        

    )
}

export default Card
