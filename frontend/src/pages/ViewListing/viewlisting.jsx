import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { useParams } from 'react-router-dom';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa';

export default function ViewListing() {
  const [listing, setListing] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/getlisting/${params.id}`);
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchListing();
  }, [params.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (listing && listing.imageURLs ? (prevIndex + 1) % listing.imageURLs.length : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, [listing]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (listing && listing.imageURLs ? (prevIndex + 1) % listing.imageURLs.length : 0));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (listing && listing.imageURLs ? (prevIndex - 1 + listing.imageURLs.length) % listing.imageURLs.length : 0));
  };

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.listingContainer}>
     
      <div className={style.imageSlider}>
        <button onClick={prevImage} className={style.navButton}>Previous</button>
        <img src={listing.imageURLs[currentImageIndex]} alt={`Listing ${currentImageIndex}`} className={style.image} />
        <button onClick={nextImage} className={style.navButton}>Next</button>
      </div>
      <div className={style.listingDetails}>
        <div className={style.title}>{listing.name}{listing.type?` - $${listing.regularPrice}/Month`:''}</div>
            
            <p className={style.address}>
              <FaMapMarkerAlt className={style.location} />
              {listing.address}
            </p>

            <div className={style.flex}>
              <div className={style.type}> {listing.type?'For Rent':'For Sale'}</div>
              <div className={style.price}>$ {listing.regularPrice}</div>
            </div>

            <p className={style.discription}>Description: <span>{listing.description}</span> </p>
       
        <div className={style.things}>
          <p><FaBed  className={style.icon}/> {listing.bedrooms} bed</p>
          <p> <FaBath  className={style.icon}/> {listing.bathrooms} bath</p>
          <p> <FaParking  className={style.icon}/> {listing.furnished ? 'Parking' : 'No Parking'}</p>
          <p> <FaChair  className={style.icon}/>{listing.parking ? 'Furnished' : 'No Furnished'}</p>  
        </div>
       
        {listing.offer && <p>Discounted Price:{listing.discountedPrice}</p>}
      </div>
    </div>
  );
}
