import React from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'
// import { Link } from 'react-router-dom'

export default function ListingCard({ listing }) {
    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/viewListing/${id}`)
    }


    return (
        <div className={styles.results}>
            <div className={styles.gridContainer}>
                {/* Display filtered results here */}
                {listing.length > 0 ? (
                    listing.map((result) => (
                        // <Link to={`viewListing/${result._id}`}>
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
                        // </Link>
                    ))
                ) : (
                    <div className={styles.resultsPlaceholder}>No results found</div>
                )}
            </div>
        </div>
    )
}
