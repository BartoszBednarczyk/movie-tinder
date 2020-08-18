import React from 'react';
import styles from './App.module.css';
import Card from './components/Card'

import Swipeable from "react-swipy"
import background from './images/pattern.jpg'
import reject from './images/reject.png'
import heart from './images/heart.jpg'

import getRandomMovie from './api/index'

const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};
class App extends React.Component {

  state = {
    cards: [{original_title:"First", poster:'https://images-na.ssl-images-amazon.com/images/I/71nsvxFpSTL._AC_SL1200_.jpg', release_date:"2010", genres:"Horror", vote_average:"5.5"},
     {original_title:"Second", poster:'https://images-na.ssl-images-amazon.com/images/I/71nsvxFpSTL._AC_SL1200_.jpg', release_date:"2010", genres:"Horror", vote_average:"5.5"},
    {original_title:"Third", poster:'https://images-na.ssl-images-amazon.com/images/I/71nsvxFpSTL._AC_SL1200_.jpg', release_date:"2010", genres:"Horror", vote_average:"5.5"}],
  };
 
  remove = () =>{
    this.setState(({cards}) => ({
      cards: cards.slice(1, cards.length),
    }));}

  add = () =>{
    this.setState(prev => ({cards: [...prev.cards, {original_title:"new"}]}))
    console.log(this.state.cards)
  }

  swipedLeft = () => {
    console.log("Swiped left")
  }
  swipedRight = () => {
    console.log("Swiped right")
  }

  info = async (direction) => {
    let data
    do {
       data = await getRandomMovie()
    } while (!data.original_title)
    data.release_date = data.release_date.slice(0, -6)
    if (data.poster_path)
    {
      await this.setState(prev => ({cards: [...prev.cards, {original_title: data.original_title, poster:`http://image.tmdb.org/t/p/w400//${data.poster_path}`, release_date: data.release_date, genres: data.genres[0].name, vote_average:data.vote_average}]}))
    } else {
      await this.setState(prev => ({cards: [...prev.cards, {original_title: data.original_title, poster: '', release_date: data.release_date}]}))
    }
    
    console.log(this.state.cards)
  }
 
  render() {
    const {cards} = this.state;
 
    return (
      <div className={styles.container} style={{backgroundImage:`url(${background})`}}>
        
          {cards.length > 0 ? (
            <div>
              <Swipeable
                buttons={({left, right}) => (
                  <div className={styles.details} style={actionsStyles}>
                    <button className={styles.button} onClick={left}><img src={reject}/></button>
                    <button className={styles.button} onClick={right}><img src={heart}/></button>
                  </div>
                )}
                onAfterSwipe={(this.remove)}
                onSwipe={this.info}
                min={250}
                limit={200}
              >
                
                <Card props={cards[0]}></Card>
                
              </Swipeable>
            </div>
          )
          
          : (
            <div zIndex={-2}>No more cards</div>
          )}
        
      </div>
    );
  }
}

export default App;
