import { useState } from "react"
import './Rating.css'

function fillStarArray(amount) {
    const stars = new Array(5).fill(false)
    for (let i = 0; i < stars.length; i++) {
        if (i < amount - 1) stars[i] = true
    } 

    return stars
}

export default function ({ stars, onRate }) {
    const [ratingStars, setRatingStars] = useState(stars)

    return (
        <div className='starsWrapper'>
            { 
                ratingStars.map((star, id) => {
                    return (
                        <img 
                            src={ star ? 'star.png' : 'starTemplate.png' } 
                            key={id}
                            onMouseEnter={ () => setRatingStars(fillStarArray(id + 2)) }
                            onMouseLeave={ () => setRatingStars(stars) }
                            onClick={ () => onRate(id + 1) }
                        >    
                        </img>
                    )
                }) 
            }
        </div>
    )
}
