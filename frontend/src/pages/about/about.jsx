import React from 'react';
import styles from './style.module.css';

const About = () => {
    return (
        <div className={styles.about}>
            <section className={styles.hero}>
                <h1>About Us</h1>
                <p>Welcome to RealEstate Finder, where your real estate journey becomes a smooth and successful experience. Established with a vision to transform the real estate landscape, we pride ourselves on offering personalized and professional services tailored to your unique needs. Our commitment is to guide you through every step of buying, selling, or investing in real estate with expertise, integrity, and dedication.</p>
            </section>
            <section className={styles.story}>
                <h2>Our Story</h2>
                <p>Founded in 2010, RealEstate Finder started with a mission to revolutionize the real estate industry. What began as a small local agency has now evolved into a prominent real estate firm known for its exceptional service and innovative approach. Over the years, we have built a reputation for our commitment to transparency, customer satisfaction, and market expertise. Our journey has been marked by countless success stories, happy clients, and a relentless drive to exceed expectations.</p>
                <p>Our team of dedicated professionals brings a wealth of experience and knowledge to every transaction, ensuring that our clients receive the highest level of service. Whether you're looking to buy your dream home, sell a property, or invest in real estate, we are here to provide the guidance and support you need to achieve your goals.</p>
                <p>At RealEstate Finder, our mission is to make the real estate process as smooth and stress-free as possible. We aim to deliver exceptional results by leveraging our deep market knowledge, personalized service, and cutting-edge technology. Our goal is to build lasting relationships with our clients based on trust, integrity, and mutual success.</p>
            </section>
            <section className={styles.values}>
                <div className={styles.valuesList}>
                    <div className={styles.value}>
                        <h3>Integrity</h3>
                        <p>We conduct our business with honesty and transparency, always prioritizing our clients' best interests.</p>
                    </div>
                    <div className={styles.value}>
                        <h3>Excellence</h3>
                        <p>We are committed to delivering high-quality service and surpassing expectations in every transaction.</p>
                    </div>
                    <div className={styles.value}>
                        <h3>Customer Focus</h3>
                        <p>Our clients are central to everything we do. We listen, understand, and tailor our services to meet their needs.</p>
                    </div>
                    <div className={styles.value}>
                        <h3>Innovation</h3>
                        <p>We embrace new technologies and ideas to enhance our services and stay ahead in the ever-evolving real estate market.</p>
                    </div>
                </div>
            </section>
            <section className={styles.team}>
                <h2>Meet the Team</h2>
                <div className={styles.teamMembers}>
                    <div className={styles.member}>
                        <img src="https://img.freepik.com/premium-photo/face-young-confident-software-developer-diversity-programmer_236854-37226.jpg" alt="John Doe" />
                        <h3>John Doe</h3>
                        <p>Founder & CEO</p>
                        <p>With over 20 years in the real estate industry, John has a wealth of experience in both residential and commercial properties. His leadership and vision have been instrumental in shaping the company's success.</p>
                    </div>
                    <div className={styles.member}>
                        <img src="https://t4.ftcdn.net/jpg/03/69/19/81/360_F_369198116_K0sFy2gRTo1lmIf5jVGeQmaIEibjC3NN.jpg" alt="Jane Smith" />
                        <h3>Jane Smith</h3>
                        <p>Chief Operating Officer</p>
                        <p>Jane oversees the day-to-day operations of the business, ensuring that all processes run smoothly and efficiently. Her expertise in operations management helps drive the company's growth and success.</p>
                    </div>
                    <div className={styles.member}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLCcv9zQgU6t-0QVR507J1H-WgyFaf7s9qw&s" alt="Michael Johnson" />
                        <h3>Michael Johnson</h3>
                        <p>Lead Real Estate Agent</p>
                        <p>Michael is a seasoned real estate agent with a keen eye for market trends and a deep understanding of client needs. His dedication and client-centric approach make him a valuable asset to the team.</p>
                    </div>
                    {/* Add more team members as needed */}
                </div>
            </section>
        </div>
    );
};

export default About;
