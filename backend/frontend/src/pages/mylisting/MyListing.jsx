import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../component/card/Card';

export default function MyListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [listingData, setListingData] = useState(null);
  const [listingDeleteError, setListingDeleteError] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.email) {
      getUser();
    }
  }, [currentUser]);

  useEffect(() => {

    getListing();

  }, [userdata]);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser.email }),
      });
      const data = await res.json();
      setUserdata(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user data', error);
      setLoading(false);
    }
  };
  const getListing = async () => {
    try {
      setListingLoading(true);
      const res = await fetch(`/api/user/getListing/${userdata._id}`, {
        method: 'GET',
      });
      if (res.ok) {
        const Listings = await res.json();
        setListingData(Listings);
      }
      setListingLoading(false);
    } catch (error) {
      console.log(error);
      setListingLoading(false);
    }
  };

  const handleDeleteListing = async (id, e) => {
    e.preventDefault(); // Corrected method name
    if (window.confirm('Are you sure you want to delete This Listing? This action cannot be undone.')) {
      setListingData((prev) => prev.filter((list) => list._id !== id));

      try {
        const res = await fetch(`/api/listing/deleteListing/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          const data = await res.json();
          // Handle success if needed
        } else {
          const errorData = await res.json();
          setListingDeleteError(true);
        }
      } catch (error) {
        console.log(error);
        setListingDeleteError(true);
      }
    }
  };

  return (
    <div className={style.MyListing}>
      {/* 
      <div>{listingLoading ? 'Loading....' : ''}</div> */}
      {listingData && listingData.map((listing) => (
        <div key={listing._id} className={style.list}>
          <Card result={listing} />

          <div className={style.btn}>
            <button className={style.delete_listing} onClick={(e) => handleDeleteListing(listing._id, e)}>DELETE</button>
            <Link to={`/editListing/${listing._id}`}>
              <button className={style.editListing}>EDIT</button>
            </Link>
          </div>
        </div>
      ))}
    </div>

  )
}
