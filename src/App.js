import React from 'react';
import styles from './App.module.css';
import Card from './components/Card'
import ListElement from './components/ListElement'

import Swipeable from "react-swipy"
import background from './images/pattern.jpg'
import reject from './images/reject.png'
import heart from './images/heart.jpg'

import getRandomMovie from './api/index'
import hamburger from './hamburgers.module.css'
import cx from 'classnames'

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};


class App extends React.Component {

  state = {
    cards: [],
    hamburgerToggle: false,
    hamburgerClass: cx(hamburger.hamburger, hamburger.hamburgerElastic),
    saved: []
  };

  flipCard = () => {
      var current = this.state.cards
      current[0].isFlipped = !current[0].isFlipped
      this.setState(()=>({cards: current}))
  }
  swapCard = () => {
    
    var current = this.state.cards
    current[0].isFlipped = false
    this.setState(()=>({cards: current}))
  }
 
  remove = () =>{
    this.setState(({cards}) => ({
      cards: cards.slice(1, cards.length),
    }));}

  add = () =>{
    this.setState(prev => ({cards: [...prev.cards, {original_title:"new"}]}))
    
  }

  swipedLeft = () => {
    
  }
  swipedRight = () => {
    
    var current = this.state.cards[0]
    this.setState(prev => ({saved: [...prev.saved, current]}))
    
    setTimeout(() => {
      this.setState(()=>({elements: this.state.saved.map((item, i) => <ListElement key={i} props={item}/>)}))
    }, 100);
  }

  connect = (test) =>{
    test==='left'?this.swipedLeft():this.swipedRight()
    this.swapCard()
    this.info()
  }

  hamburgerToggle = () =>{

    this.setState(prev => ({
      hamburgerToggle: !prev.hamburgerToggle
    }))
  }

  info = async (direction) => {
    let data
    do {
       data = await getRandomMovie()
    } while (!data.original_title)
    data.release_date = data.release_date.slice(0, -6)
    if (data.poster_path)
    {
      await this.setState(prev => ({cards:
         [...prev.cards, 
          {original_title: data.title, 
            poster:`http://image.tmdb.org/t/p/w400//${data.poster_path}`, 
            release_date: data.release_date, 
            genres: data.genres[0]?data.genres[0].name:"", 
            vote_average:data.vote_average, 
            isFlipped: false, 
            flipCard: ()=>this.flipCard(),
            overview: data.overview,
            tagline: data.tagline,
            runtime: data.runtime,
            imdb: data.imdb_id}]}))
    } else {
      await this.setState(prev => ({cards: 
        [...prev.cards, 
          {original_title: data.title, 
            poster: '', 
            release_date: data.release_date, 
            genres: data.genres[0]?data.genres[0].name:"", 
            vote_average:data.vote_average, 
            isFlipped: false, 
            flipCard: ()=>this.flipCard(),
            overview: data.overview,
            tagline: data.tagline,
            runtime: data.runtime,
            imdb: data.imdb_id}]}))
    }

    this.state.cards.length < 6 ? this.info() : console.log("")
    
    
  }
 
  componentDidMount(){
    this.info()
  };

  render() {
    const {cards} = this.state;
 
    return (
      <div className={styles.container} style={{backgroundImage:`url(${background})`}}>
        
          {cards.length > 4 ? (
            <div>
              <div className={styles.thirdWrapper}>
            <Card props={cards[2]} zindex={-3}/>
              </div>
              <div className={styles.secondWrapper}>
            <Card props={cards[1]} zindex={-2}/>
              </div>
            <div className={styles.wrapper}>
              <Swipeable
                buttons={({left, right}) => (
                  <div className={styles.details} style={actionsStyles}>
                    <button className={styles.button} onClick={left}><img alt="Dislike button" src={reject}/></button>
                    <button className={styles.button} onClick={right}><img alt="Like button" src={heart}/></button>
                  </div>
                )}
                onAfterSwipe={(this.remove)}
                onSwipe={this.connect}
                min={250}
                limit={200}
              >
                
                <Card props={cards[0]} zindex={0}></Card>
                
              </Swipeable>
              
            </div>
            
            <div className={styles.burger}>
            <button onClick={this.hamburgerToggle} className={this.state.hamburgerToggle?cx(hamburger.hamburger, hamburger.hamburgerElastic, hamburger.isActive):cx(hamburger.hamburger, hamburger.hamburgerElastic)} type="button">
            <span className={hamburger.hamburgerBox}>
            <span className={hamburger.hamburgerInner}></span>
            </span>
            </button>
            </div>
            <div className={this.state.hamburgerToggle?cx(styles.menu, styles.animate, styles.in):cx(styles.menu, styles.animate, styles.out)}>
            {this.state.elements}
            </div>
            </div>
          )
          
          : (
            <div className={styles.flexContainer}>
              <ClimbingBoxLoader color={"yellow"}></ClimbingBoxLoader>
            </div>
          )}
        
        
      </div>
    );
  }
}

export default App;
