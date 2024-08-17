import React from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>Company</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Our Team</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>Follow Us</h3>
                    <ul className={styles.socialLinks}>
                        <li><a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                        <li><a href="#" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href="#" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                        <li><a href="#" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a></li>
                    </ul>
                </div>
                <div className={styles.languageSelector}>
                    <select>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; 2024 RealEstate Finder. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
