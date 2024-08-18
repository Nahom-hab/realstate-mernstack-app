import React, { useEffect, useState } from 'react';
import style from './styles.module.css';
import { Link } from 'react-router-dom';
import ListingCard from '../../component/listingCard/ListingCard'
import Card from '../../component/card/Card';
import Footer from '../../component/footer/footer';

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [offerData, setOfferData] = useState([])
  const [rentData, setRentData] = useState([])
  const [saleData, setSaleData] = useState([])





  useEffect(() => {

    const fetchofferData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get?offer=true&limit=4`)
        if (res.ok) {
          const Listings = await res.json();
          setOfferData(Listings);
          fetchRentDataData()
        }
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }

    };
    const fetchRentDataData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        if (res.ok) {
          const Listings = await res.json();
          setRentData(Listings);
          fetchsaleDataData()
        }
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }

    };
    const fetchsaleDataData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get?type=sale&limit=4`)
        if (res.ok) {
          const Listings = await res.json();
          setSaleData(Listings);
        }
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    fetchofferData();
  }, [])


  return (
    <div className={style.container}>
      <div className={style.image}>
        {/* Background image with blur and overlay */}
      </div>
      <h1 className={style.title}>
        Find your next
        <span className={style.perfect}> Perfect </span>
        <span className={style.span}> place with ease</span>

        <p className={style.discription}>RealEstate Finder will help you find your home
          fast and easy. Discover a range of properties quickly
          with our intuitive search tools   <Link className={style.start}>Lets start Now...</Link></p>
      </h1>
      <div className={style.recentContainer}>
        <div className={style.recentOffers}>
          <div className={style.text}>
            <h2>Recent offers</h2>
            <Link className={style.link}>show more recent offers</Link>
          </div>

          <div className={style.recentdata}>
            {offerData.length > 0 ? (
              offerData.map((result) => (
                <Card result={result} />
              ))
            ) : ''}
          </div>
        </div>
      </div>

      <div className={style.recentContainer}>
        <div className={style.recentOffers}>
          <div className={style.text}>
            <h2>Recent Places for Rent</h2>
            <Link className={style.link}>show more recent rent places</Link>
          </div>

          <div className={style.recentdata}>
            {rentData.length > 0 ? (
              rentData.map((result) => (
                <Card result={result} />
              ))
            ) : ''}
          </div>
        </div>
      </div>

      <div className={style.recentContainer}>
        <div className={style.recentOffers}>
          <div className={style.text}>
            <h2>Recent places for Sale</h2>
            <Link className={style.link}>show more recent sale places</Link>
          </div>

          <div className={style.recentdata}>
            {saleData.length > 0 ? (
              saleData.map((result) => (
                <Card result={result} />
              ))
            ) : ''}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
