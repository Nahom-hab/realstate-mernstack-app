import React from 'react'
import styles from './style.module.css'

import Card from '../card/Card'
// import { Link } from 'react-router-dom'

export default function ListingCard({ listing }) {





    return (
        <div className={styles.results}>
            <div className={styles.gridContainer}>
                {/* Display filtered results here */}
                {listing.length > 0 ? (
                    listing.map((result) => (
                        <Card result={result} />
                    ))
                ) : (
                    <div className={styles.resultsPlaceholder}>No results found</div>
                )}
            </div>
        </div>
    )
}
