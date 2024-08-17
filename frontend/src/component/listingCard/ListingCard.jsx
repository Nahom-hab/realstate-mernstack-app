import React from 'react'
import styles from './style.module.css'
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa'

export default function ListingCard({ listing }) {
    return (
        <div className={styles.results}>
            <div className={styles.gridContainer}>
                {/* Display filtered results here */}

                {listing.length > 0 ? (
                    listing.map((result) => (
                        <div key={result.id} className={styles.resultCard}>
                            <img src={result.imageURLs[0]} alt="" />
                            <div className={styles.resultInfo}>
                                <div className={styles.resultName}>{result.name}</div>
                                <div className={styles.resultLocation}><FaMapMarkerAlt className={styles.location} />{result.address}</div>
                                <div className={styles.resultdiscription}>{result.description.slice(0, 60)}...</div>
                                <div className={styles.resultprice}>${result.regularPrice} /Month</div>
                                <div className={styles.flex}>
                                    <div className={styles.bedrooms}>{result.bedrooms} bathroom</div>
                                    <div className={styles.bedrooms}>{result.bathrooms} bedrooms</div>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.resultsPlaceholder}>No results found</div>
                )}
            </div>
        </div>
    )
}
