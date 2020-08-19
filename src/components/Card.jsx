import React from 'react'
import styles from './Card.module.css'
import stars from '../images/shine.png'
import info from '../images/info.png'
import ReactCardFlip from 'react-card-flip'
import nomovie from '../images/nomovie.jpg'

function Card({props}) {


    const poster = props.poster?props.poster:nomovie
    
    
    return (
        <div className={styles.container}>
            <ReactCardFlip isFlipped={props.isFlipped} flipDirection="horizontal" infinite="true">
            <div className={styles.card} style={{backgroundImage:`url(${poster})`}}>
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
                <div className={styles.info} onClick={() => props.flipCard()}>
                <img src={info} className={styles.infoIcon} alt=""/>
                </div>
            </div>
            
            <div className={styles.card} style={{backgroundImage:`url(${poster})`}}>
                <div className={styles.darkBackground}>
                    <div className={styles.info} onClick={() => props.flipCard()}>
                    <img src={info} className={styles.infoIcon} alt=""/>
                    </div>
                    <h5 className={styles.element}><b>{props.original_title}</b></h5>
                    <div className={styles.elementLine} />
                    <p className={styles.element}>{props.overview?props.overview:props.tagline}</p>
                    <div className={styles.elementLine} />
                    <h5 className={styles.element}>Runtime: {props.runtime}'</h5>
                    <div className={styles.elementLine} />
                    <a className={styles.element} href={"https://www.imdb.com/title/"+props.imdb+"/"} target="_blank" rel="noopener noreferrer">IMDB</a>
                    

                </div>
                
            </div>
            
            </ReactCardFlip>
        </div>
        

    )
}

export default Card
