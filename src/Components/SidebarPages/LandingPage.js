import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WOW from "wowjs";

const LandingPage = () => {

    useEffect(() => {
        new WOW.WOW().init();
    }, []);
    return (
        <>
            <div id="wrapper" class="overflow-hidden">
                <nav class="navbar navbar-expand-lg navbar-dark position-fixed header-container ">
                    <div class="container">
                        <div class="d-flex align-items-center justify-content-between w-100">
                            <div class="logo">
                                <Link to="/"><img src="assets/img/logo.svg" alt="" width="216" height="39" /></Link>
                            </div>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <div class="main-menu">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item ">
                                        <a class="nav-link active" href="#">Home</a>
                                    </li>
                                    <li class="nav-item" ><a class="nav-link " href="#about">About Us</a></li>
                                    <li class="nav-item"><Link class="nav-link" to="/staking"> Fixed Staking </Link></li>
                                    <li class="nav-item"><a class="nav-link" href="#tokonomics"> Tokonomics </a></li>
                                    <li class="nav-item"><a class="nav-link" href="#differences"> Differences </a></li>
                                    <li class="nav-item"><a class="nav-link" href="#roadmap"> Roadmap </a></li>
                                    <li class="nav-item"><a class="nav-link" href="#partners"> Partners </a></li>
                                    <li class="nav-item"><a class="nav-link" target='_blank' href="/assets/img/whitepaper.pdf">WhitePaper </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* <!-- hero sec --> */}
                <div id="home" class="banner-container">
                    <div class="container">
                        <div class="row banner-content-area justify-content-between">
                            <div class="col-12 col-md-6 col-lg-6 banner-content">
                                <div class="banner-cont-info text-white "
                                    data-wow-delay=".3s">
                                    <h1 class="text-white">Powering the Digital Economy with Y-Coin</h1>
                                    <p class="text-white">A secure, user-friendly platform for seamless cryptocurrency trading.
                                    </p>
                                    <a class="crp-btn text-white px-5" href="#"> Get Started </a>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-6">
                                {/* <!-- <div class="banner-cont-img "  data-wow-delay=".3s">
                            <img src="assets/img/banner/hero-banner.png" alt="">
                        </div> --> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- about sec --> */}
                <div id="about" class="invented-container overflow-hidden">
                    <div class="container">
                        <div class="row invented-area pt-100 pb-100 g-5 mb-pt-45 justify-content-between">
                            <div class="col-12 col-md-6 col-lg-6">
                                <div class="wow fadeInLeft" data-wow-delay="0.3s">
                                    <img src="assets/img/about/about.svg" alt="" class="w-100" />
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-6 invented-cont "
                            >
                                <h3>About Us</h3>
                                <h2 class="text-gradient"> Who We Are</h2>
                                <p>At our core, we are committed to revolutionizing the digital finance landscape through secure, innovative, and user-centric cryptocurrency solutions.</p>
                                <p>Mission & Vision : Our mission is to empower individuals and businesses with seamless access to decentralized financial opportunities, enabling financial freedom beyond traditional boundaries. We aim to create a transparent, trustworthy ecosystem where users can trade, invest, and grow with confidence. Guided by a vision to accelerate global crypto adoption, we continually strive to deliver cutting-edge technology, unmatched reliability, and intuitive experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- feature sec --> */}
                <section id="features" class="crp-inventment-container overflow-hidden ocf_sec pt-20 pb-90 mb-pb-20 ">
                    <div class="container">
                        <div class="row ">
                            <div class="col-12 col-md-12 col-lg-8 mb-pb-0">
                                <div class="crp-inventment-content pt-110 mb-pt-40  " >
                                    <h2>OUR CORE<br />
                                        <sapn class="text-gradient border-bottom"> FEATURES</sapn>
                                    </h2>
                                    <p>Discover a powerful suite of features designed to enhance your crypto journey with speed, security, and simplicity. From real-time market insights to seamless trading tools, our platform empowers users with everything they need to navigate digital assets confidently. Experience cutting-edge functionality built for both beginners and expert traders.</p>

                                </div>
                            </div>
                        </div>
                        <div class=" row g-3 gxp_row pt-40 ">
                            <div class="col-lg-5">
                                <div class="crp-inv-col">
                                    <div class="crp-inv-col-row">
                                        <div class="crp-inv-col-cont">
                                            <h4> // Auto-Staking </h4>
                                            <p> Auto Staking lets users earn passive rewards automatically without any manual steps. Your tokens compound in the background, helping you grow your holdings effortlessly. </p>
                                        </div>
                                    </div>
                                    <img src="assets/img/ocf_img_1.svg" class="img-fluid" alt="" />
                                </div>
                            </div>

                            <div class="col-lg-7">
                                <div class="crp-inv-col">
                                    <div class="crp-inv-col-row">
                                        <div class="crp-inv-col-cont">
                                            <h4> // API Integrations for Developers </h4>
                                            <p> Our APIs give developers secure, real-time access to market data and trading functions. Build bots, tools, or custom apps with ease and high performance.</p>
                                        </div>
                                    </div>
                                    <img src="assets/img/ocf_img_2.svg" class="img-fluid" alt="" />
                                </div>
                            </div>


                            <div class="col-lg-7">
                                <div class="crp-inv-col">
                                    <div class="crp-inv-col-row">
                                        <div class="crp-inv-col-cont">
                                            <h4> // Burn Mechanism </h4>
                                            <p>The burn mechanism reduces token supply over time, increasing scarcity and supporting long-term value. It maintains a healthy and transparent token economy.</p>
                                        </div>
                                    </div>
                                    <img src="assets/img/ocf_img_3.svg" class="img-fluid" alt="" />
                                </div>
                            </div>

                            <div class="col-lg-5">
                                <div class="crp-inv-col">
                                    <div class="crp-inv-col-row">
                                        <div class="crp-inv-col-cont">
                                            <h4> // Fund Insurance</h4>
                                            <p>Fund Insurance protects user assets from unforeseen risks, offering added security and confidence. It ensures safer trading and strengthens platform trust.</p>
                                        </div>
                                    </div>
                                    <img src="assets/img/ocf_img_4.svg" class="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- TOKEN DETAILS Sec --> */}
                <div id="tokonomics" class="tkm_details bg-white">
                    <div class="container pt-100 pb-90 mb-pt-50 mb-pb-50">
                        <div class="row pb-40">
                            <div class="col-12 sm-title text-center " >
                                <h2>TOKENOMICS : <br /> <span class="text-gradient border-bottom" >TOKEN DETAILS </span></h2>
                            </div>
                        </div>
                        <div class="row pb-50 mb-pb-20">
                            <div class="col-12 token-title text-center">
                                <h3>Token Sale</h3>
                            </div>
                        </div>
                        <div class="row pb-70 justify-content-center">
                            <div class="col-12 col-md-6 mb-pt-40 " >
                                <div class="pre-sale-area">
                                    {/* <!-- <div class="sale-title">
                                <h4>main sale</h4>
                            </div> --> */}
                                    <div>
                                        <div class="pre-sale">
                                            <div class="row">
                                                <div class="sale-col col-12 col-md-6">
                                                    <div class="sale-date">
                                                        <h5>Token Name</h5>
                                                        <small>Yentrex Token</small>
                                                    </div>
                                                </div>
                                                <div class="sale-col col-12 col-md-6">
                                                    <div class="sale-date">
                                                        <h5>Total Supply</h5>
                                                        <small>10 Million </small>
                                                    </div>
                                                </div>
                                                <div class="sale-col col-12 col-md-12">
                                                    <div class="sale-date">
                                                        <small>A portion of the total token supply is often allocated as reserved
                                                            tokens. These tokens are set aside for the development</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row pb-50 mb-pb-20">
                            <div class="col-12 token-title text-center">
                                <h3>  Token allocation & funds distribution </h3>
                            </div>
                        </div>
                        <div class="chart-container d-flex flex-wrap pb-110 mb-pb-60 mb-pt-20">
                            <div class="chart-col" >
                                <div
                                    class="chart-token d-flex flex-wrap align-items-center justify-content-sm-center justify-content-lg-start mb-50">
                                    <div class="chart-cycle">
                                        <canvas id="chart1" width="300" height="300"></canvas>
                                        <div class="chart-icon"></div>
                                    </div>
                                    <div class="chart-point">
                                        <div>
                                            <div class="sale-item">
                                                <div class="sale-item-color">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>10%</strong>
                                                    <small>Top Cummunity</small>
                                                </div>
                                            </div>
                                            <div class="sale-item">
                                                <div class="sale-item-color color-green">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>08%</strong>
                                                    <small>Reserved Fund</small>
                                                </div>
                                            </div>
                                            <div class="sale-item">
                                                <div class="sale-item-color color-blue">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>12%</strong>
                                                    <small>Advisor Team</small>
                                                </div>
                                            </div>
                                            <div class="sale-item">
                                                <div class="sale-item-color color-yellow">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>50%</strong>
                                                    <small>Sold Globaly</small>
                                                </div>
                                            </div>
                                            <div class="sale-item">
                                                <div class="sale-item-color color-burnt">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>20%</strong>
                                                    <small>Financial</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3>Token Distribution</h3>
                            </div>
                            <div class="chart-col" >
                                <div
                                    class="chart-token d-flex flex-wrap align-items-center order-lg-2 justify-content-lg-end justify-content-sm-center justify-content-md-center mb-pt-10 mb-50">
                                    <div class="chart-cycle d-flex order-lg-2">
                                        <div class="chart-cycle">
                                            <canvas id="chart2" width="300" height="300"></canvas>
                                            <div class="chart-icon"></div>
                                        </div>
                                    </div>
                                    <div class="chart-point d-flex order-lg-1">
                                        <div class="sale-right-text">
                                            <div class="sale-item">
                                                <div class="sale-item-color">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>20%</strong>
                                                    <small>Top Cummunity</small>
                                                </div>
                                            </div>
                                            <div class="sale-item">
                                                <div class="sale-item-color color-green">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>50%</strong>
                                                    <small>Reserved Fund</small>
                                                </div>
                                            </div>
                                            <div class="sale-item">
                                                <div class="sale-item-color color-blue">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>25%</strong>
                                                    <small>Advisor Team</small>
                                                </div>
                                            </div>
                                            <div class="sale-item">
                                                <div class="sale-item-color color-yellow">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>15%</strong>
                                                    <small>Sold Globaly</small>
                                                </div>
                                            </div>
                                            <div class="sale-item">
                                                <div class="sale-item-color color-burnt">
                                                    <span></span>
                                                </div>
                                                <div class="sale-item-cont">
                                                    <strong>7%</strong>
                                                    <small>Financial</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 class="text-end">Sale Contribution</h3>
                            </div>
                        </div>
                    </div>
                </div>



                {/* <!-- WHAT MAKES US DIFFERENT sc --> */}
                <div id="differences" class="crp-happenning-container overflow-hidden">
                    <div class="container">
                        <div class="row ">
                            <div class="col-12 col-md-12 col-lg-8 mb-pb-0">
                                <div class="crp-inventment-content  " >
                                    <h2> WHAT MAKES US <br />
                                        <sapn class="text-gradient border-bottom"> DIFFERENT </sapn>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div class="row service-area pt-70">
                            <div class="col-12 col-md-12 col-lg-4 mb-40 service"
                                data-wow-delay=".3s"
                                style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.3s', animationName: 'zoomIn' }}>
                                <div class="service-info  h-100 ">
                                    <div class="service-icon">
                                        <img src="assets/img/wmd_1.svg" alt="" width="118" height="120" />
                                    </div>
                                    <div class="service-cont">
                                        <h3>Advantages</h3>
                                        <p>Our platform offers top-notch security, a smooth user experience, and advanced crypto features. Every element is designed to maximize user value and growth.
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-lg-4 mb-40 service"
                                style={{ visibility: 'visible', animationDuration: '1s', animationName: 'zoomIn' }}>
                                <div class="service-info h-100">
                                    <div class="service-icon">
                                        <img src="assets/img/wmd_2.svg" alt="" width="118" height="120" />
                                    </div>
                                    <div class="service-cont">
                                        <h3> Edge </h3>
                                        <p>We provide faster transactions, deeper liquidity, and intuitive tools. Users enjoy lower fees, stronger protection, and a smoother trading experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-12 col-lg-4 mb-40 service"
                                data-wow-delay="0.5s"
                                style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.5s', animationName: 'zoomIn' }}>
                                <div class="service-info  h-100">
                                    <div class="service-icon">
                                        <img src="assets/img/wmd_3.svg" alt="" width="118" height="120" />
                                    </div>
                                    <div class="service-cont">
                                        <h3> Innovation </h3>
                                        <p>We integrate cutting-edge blockchain solutions and evolving features like automation and smart security, keeping users ahead in the crypto world.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <!-- roadmap --> */}
                <div id="roadmap" class="roadmap-container roadmap_bg">
                    <div class="container pt-110 pb-80 mb-pt-60 mb-pb-25">
                        <div class="row">
                            <div class="col-12 big-title text-center "  >
                                <h2> ROADMAP TO <br />
                                    <sapn class="text-gradient border-bottom"> REVOLUTION </sapn>
                                </h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="road-map-timeline">
                                <ul class="road-map-tl-event list-unstyled">
                                    <li class="road-map-row">
                                        <div class="road-map-event event wow bounceInLeft"
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>January 10, 2025</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>Idea Generation</h5>
                                                    <p>Brainstorm and refine innovative cryptocurrency concepts to solve real market problems.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row">
                                        <div class="road-map-event event "
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>February 15, 2025</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>Market Research</h5>
                                                    <p>Analyze trends, competitors, and user needs to validate the project’s potential.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row">
                                        <div class="road-map-event event wow bounceInLeft"
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>March 25, 2025</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>Business Plan</h5>
                                                    <p>Create a clear roadmap with goals, strategies, and monetization models for success.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row circle-row2">
                                        <div class="road-map-event event "
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>April 05, 2025</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>Start Development</h5>
                                                    <p>Begin building the platform with secure, scalable, and feature-rich technology.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row circle-row2">
                                        <div class="road-map-event event wow bounceInLeft"
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>May 20, 2025</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>Pre Sale Launch</h5>
                                                    <p>Offer early access to investors and supporters to fund and promote the project.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row circle-row2">
                                        <div class="road-map-event event "
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>June 15, 2025</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>Launch The Platform</h5>
                                                    <p>Go live with the fully functional platform, delivering value to users worldwide.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="partners" class="partner">
                    <div class="container">
                        <div class="row pt-110 pb-40 mb-pt-60 mb-pb-10">
                            <div class="big-title  text-center "  >
                                <h2> OUR AWESOME <br />
                                    <sapn class="text-gradient border-bottom"> PARTNERS </sapn>
                                </h2>
                            </div>
                        </div>
                        <div class="row justify-content-center pb-60 partner-area mb-pb-20 "
                            data-wow-delay=".5s">
                            <div class="col-6 col-md-3 col-lg-2 mb-50 partner-logo">
                                <a href="#">
                                    <img src="assets/img/client/1.png" alt="" />
                                </a>
                            </div>
                            <div class="col-6 col-md-3 col-lg-2 mb-50 partner-logo">
                                <a href="#">
                                    <img src="assets/img/client/2.png" alt="" />
                                </a>
                            </div>
                            <div class="col-6 col-md-3 col-lg-2 mb-50 partner-logo">
                                <a href="#">
                                    <img src="assets/img/client/3.png" alt="" />
                                </a>
                            </div>
                            <div class="col-6 col-md-3 col-lg-2 mb-50 partner-logo">
                                <a href="#">
                                    <img src="assets/img/client/5.png" alt="" />
                                </a>
                            </div>
                            <div class="col-6 col-md-3 col-lg-2 mb-50 partner-logo">
                                <a href="#">
                                    <img src="assets/img/client/1.png" alt="" />
                                </a>
                            </div>
                            <div class="col-6 col-md-3 col-lg-2 mb-50 partner-logo">
                                <a href="#">
                                    <img src="assets/img/client/2.png" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="cta" class="" >
                    <div class="container">
                        <div class="row">
                            <div class="newsletter-content  bg-gradient"  >
                                <h2>GET STARTED WITH Y-COIN IN 5 <br />
                                    MINUTES, FOR FREE</h2>
                                <p>
                                    Experience seamless onboarding and dive into the world of crypto instantly.
                                    Start trading, exploring, and growing your portfolio without any hassle.
                                </p>
                                <div class="form-group newsletter-field">
                                    <a href="#" class="btn btn-custom"> Get Started </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <footer class="footer-container">
                    <div class="container">
                        <div class="row pb-40 mb-pb-20 footer-top-content overflow-hidden">
                            <div class="col-12 col-md-6 col-lg-6 footer-col "
                            >
                                <div class="footer-cryptu">
                                    <div class="footer-logo">
                                        <img src="assets/img/logo.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-6 footer-col  ">
                                <ul class=" d-flex flex-wrap social-link ms-auto justify-content-end">
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i class="fab fa-whatsapp"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex flex-wrap justify-content-between footer-bottom-content">
                                    <p class="order-2 order-lg-1 mx-auto">&copy; Copyright 2025 <a href="#"> Yentrex </a> All  Rights Reserved.</p>
                                    {/* <ul class="d-flex flex-wrap order-1 order-sm-1 order-md-1 order-lg-2">
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Support</a></li>
                            </ul>  */}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

                <a class="backtop" href="#wrapper"><i class="far fa-long-arrow-up"></i></a>
            </div>
        </>
    )
}

export default LandingPage