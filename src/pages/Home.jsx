import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Offerings from '../components/Offerings';
import GalleryTeaser from '../components/GalleryTeaser';
import BlogTeaser from '../components/BlogTeaser';
import Reviews from '../components/Reviews';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Offerings />
            <GalleryTeaser />
            <BlogTeaser />
            <Reviews />
        </>
    );
};

export default Home;
