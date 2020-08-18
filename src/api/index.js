import axios from 'axios'


const getRandomMovie = async () => {
        var i = Math.floor(Math.random()*40000+1);
        const data = await fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=2d628dbe1c47856c455a348a26e35fca`).then(data => data.json()).then(data => data)
        return data
        
        
        // await console.log(data.original_title)
        // return data.original_title
    
}

export default getRandomMovie