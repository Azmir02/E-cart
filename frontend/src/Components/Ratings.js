import React from 'react';

const Ratings = ({rating,ratingnumber}) => {
  return (
      <>
        <i class= {rating >=1 ? "fas fa-star" : rating >= .5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
        <i class= {rating >=2 ? "fas fa-star" : rating >= 1.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
        <i class= {rating >=3 ? "fas fa-star" : rating >= 2.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
        <i class= {rating >=4 ? "fas fa-star" : rating >= 3.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
        <i class= {rating >=5 ? "fas fa-star" : rating >= 4.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>

        <h6 style={{color: "#cacaca",fontSize: "13px"}}>Total {ratingnumber} ratings</h6>
      </>
  )
};

export default Ratings;
