import React from 'react'
import styles from '../listingCard/style.module.css'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function Card({ result }) {
    const navigate = useNavigate()
    const handleClick = (id) => {
        navigate(`/viewListing/${id}`)
    }
    return (
        <div onClick={() => { handleClick(result._id) }} key={result._id} className={styles.resultCard}>
            <div className={styles.imgContainer}>
                <img className={styles.imgee} src={result.imageURLs[0]} alt="" />
            </div>
            <div className={styles.resultInfo}>
                <div className={styles.resultName}>{result.name}</div>
                <div className={styles.resultLocation}>
                    <FaMapMarkerAlt className={styles.location} />
                    {result.address}
                </div>
                <div className={styles.resultdiscription}>{result.description.slice(0, 60)}...</div>
                <div className={styles.resultprice}>${result.regularPrice} /Month</div>
                <div className={styles.flex}>
                    <div className={styles.bedrooms}>{result.bathrooms} bathrooms</div>
                    <div className={styles.bedrooms}>{result.bedrooms} bedrooms</div>
                </div>
            </div>
        </div>
    )
}
