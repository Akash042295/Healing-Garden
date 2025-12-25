import React from 'react';
import { Link } from 'react-router-dom';

const MainContent = () => {
    return (
        <main>
            <div className="background">
                <div className="center-image">
                    <img src="assets/medicine.jpg" alt="Herbal Center" /> 
                </div>
                
                <section className="hero">
                    <h2>Welcome to the Virtual Herbal Garden</h2>
                    <p>Explore medicinal plants, discover ancient healing secrets, and experience a 3D herbal garden.</p>
                </section>
                
                <section className="buttons">
                    <Link to="/healing-facts" className="btn">
                        <img src="assets/tulsi.png" alt="Herbal Healing Facts" />
                        <span>Herbal Healing Facts</span>
                    </Link>
                    <Link to="/healing-plants" className="btn">
                        <img src="assets/lavender.jpg" alt="Explore Healing Plants" />
                        <span>Explore Healing Plants</span>
                    </Link>
                    <Link to="/virtual-tour" className="btn">
                        <img src="assets/dandelion.jpg" alt="Virtual Garden Tour" />
                        <span>Virtual Garden Tour</span>
                    </Link>
                    <Link to="/courses" className="btn">
                        <img src="assets/leaf1.jpg" alt="Courses on Medicine" />
                        <span>Courses on Medicine</span>
                    </Link>
                    <Link to="/doctor-consultant" className="btn">
                        <img src="assets/leaf2.jpg" alt="Doctor Consultant" />
                        <span>Doctor Consultant</span>
                    </Link>
                </section>
            </div>
        </main>
    );
};

export default MainContent;