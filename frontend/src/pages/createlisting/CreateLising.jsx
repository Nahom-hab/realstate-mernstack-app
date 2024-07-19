import React from 'react';
import style from './style.module.css';

export default function CreateListing() {
  return (
    <div className={style.lisingContainer}>
      <h2 className={style.heading}>CREATE LISTING</h2>
      <form>
        <div className={style.listingInputs}>
          <input className={style.textInput} type="text" placeholder="Name" />
          <input className={style.textInput} type="text" placeholder="Description" />
          <input className={style.textInput} type="text" placeholder="Address" />
          
          <div className={style.checkBoxes}>
            <div className={style.checkBox}>
              <input type="checkbox" id="sell" />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className={style.checkBox}>
              <input type="checkbox" id="rent" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className={style.checkBox}>
              <input type="checkbox" id="parking" />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className={style.checkBox}>
              <input type="checkbox" id="furnished" />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className={style.checkBox}>
              <input type="checkbox" id="offer" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className={style.numberInputs}>
            <div>
              <input className={style.numberInput} id="bed" type="text" defaultValue="1" />
              <label className={style.numberLabel} htmlFor="bed">Bedrooms</label>
            </div>
            <div>
              <input className={style.numberInput} id="bath" type="text" defaultValue="1" />
              <label className={style.numberLabel} htmlFor="bath">Bathrooms</label>
            </div>
            <div>
              <input className={style.numberInput} id="price" type="text" defaultValue="1" />
              <label className={style.numberLabel} htmlFor="price">Regular Price</label>
            </div>
            <div>
              <input className={style.numberInput} id="dprice" type="text" defaultValue="1" />
              <label className={style.numberLabel} htmlFor="dprice">Discounted Price</label>
            </div>
          </div>
        </div>
        <p>The first image will be the cover image (max=6)</p>
        <div className={style.flex}>
            <input className={style.fileInput} id="image" type="file" />
            <label className={style.uploadLabel} htmlFor="image">Upload photos</label>

            <button className={style.submitButton}>Upload Listing</button>
        </div>

      </form>
    </div>
  );
}
