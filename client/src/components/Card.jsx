import React from 'react';
import { Link } from 'react-router-dom';
const Card = ({ name, location }) => {
  // const {name,paypalID} = props.data;
  return (<div className='d-flex justify-content-center'>
    <div
      className='w-75 h-0 border-dark border text-dark p-2 m-1 rounded container animate__animated animate__slideInLeft'>

      <p className='text-dark'>{name} <span className="badge text-bg-info">{location}</span></p>

      <a href={`/organizations/${name}`} className='btn btn-outline-success btn-sm px-4 pt-1 text-dark'>Donate</a>
    </div>
  </div >);
};

export default Card;
