import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WOW from "wowjs";

const LandingPage = () => {
    const icoStartDate = new Date("December 14, 2025 00:00:00").getTime();
    const icoEndDate = new Date("January 13, 2026 23:59:59").getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [icoStatus, setIcoStatus] = useState("PRE_LIVE");



    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = icoStartDate - now;

            // ✅ ICO has started
            if (distance <= 0) {
                clearInterval(timer);
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
                setIcoStatus("LIVE");
                return;
            }

            // ⏳ Pre-start countdown
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((distance / (1000 * 60)) % 60),
                seconds: Math.floor((distance / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);







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
                        <div className="ico-timer text-white mt-1 w-50 d-flex justify-content-center flex-column align-items-center p-2 rounded mx-auto">

                            {/* Status Badge */}
                            <div className="ico-badge live">
                                {icoStatus === "PRE_LIVE" && "ICO ROUND 1 STARTS IN"}
                                {icoStatus === "LIVE" && "ICO ROUND 1 IS LIVE"}
                                {icoStatus === "ENDED" && "ICO ROUND 1 ENDED"}
                            </div>

                            {/* PRE-LIVE countdown */}
                            {icoStatus === "PRE_LIVE" && (
                                <>
                                    <div className="d-flex gap-3 mt-3">
                                        <div><strong>{timeLeft.days}</strong> Days</div>
                                        <div><strong>{timeLeft.hours}</strong> Hrs</div>
                                        <div><strong>{timeLeft.minutes}</strong> Min</div>
                                        <div><strong>{timeLeft.seconds}</strong> Sec</div>
                                    </div>
                                    <p className="d-block my-4 text-white">
                                        Ends on <span>13th January 2026</span>
                                    </p>
                                </>

                            )}

                            {/* LIVE state */}
                            {icoStatus === "LIVE" && (
                                <>
                                    <div className="d-flex gap-3 mt-3">
                                        <div><strong>0</strong> Days</div>
                                        <div><strong>0</strong> Hrs</div>
                                        <div><strong>0</strong> Min</div>
                                        <div><strong>0</strong> Sec</div>
                                    </div>

                                    <small className="d-block my-4">
                                        Ends on <strong>13th January 2026</strong>
                                    </small>
                                </>
                            )}

                            {/* ENDED */}
                            {icoStatus === "ENDED" && (
                                <h6 className="mt-3 text-danger">ICO Round 1 has ended</h6>
                            )}

                        </div>


                        <div class="row banner-content-area justify-content-between">
                            <div class="col-12 col-md-6 col-lg-6 banner-content">
                                <div class="banner-cont-info text-white "
                                    data-wow-delay=".3s">
                                    <h1 class="text-white">Powering the Digital Economy with Y-Coin</h1>
                                    <p class="text-white">A secure, user-friendly platform for seamless cryptocurrency trading.
                                    </p>
                                    <Link class="crp-btn text-white px-5" to="/staking"> Get Started </Link>
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
                                            <h4> // Staggered Release </h4>
                                            <p> Each phase gradually introduces Y Coins, preventing market flooding and encouraging sustained
                                                growth. </p>
                                        </div>
                                    </div>
                                    <img src="assets/img/ocf_img_1.svg" class="img-fluid" alt="" />
                                </div>
                            </div>

                            <div class="col-lg-7">
                                <div class="crp-inv-col">
                                    <div class="crp-inv-col-row">
                                        <div class="crp-inv-col-cont">
                                            <h4> // Stake-Driven Incentives </h4>
                                            <p> Early participants can stake purchased tokens to earn additional Y Coins, aligning long-term
                                                investment incentives.</p>
                                        </div>
                                    </div>
                                    <img src="assets/img/ocf_img_2.svg" class="img-fluid" alt="" />
                                </div>
                            </div>


                            <div class="col-lg-7">
                                <div class="crp-inv-col">
                                    <div class="crp-inv-col-row">
                                        <div class="crp-inv-col-cont">
                                            <h4> // Scarcity & Value </h4>
                                            <p>Limited initial availability ensures that Y Coin remains valuable, supporting higher trading
                                                interest and adoption.
                                                .</p>
                                        </div>
                                    </div>
                                    <img src="assets/img/ocf_img_3.svg" class="img-fluid" alt="" />
                                </div>
                            </div>

                            <div class="col-lg-5">
                                <div class="crp-inv-col">
                                    <div class="crp-inv-col-row">
                                        <div class="crp-inv-col-cont">
                                            <h4> // Strategic Investor Benefits</h4>
                                            <p>Early access and staking rewards prioritize long-term supporters, reducing sell-off risk postlisting.</p>
                                        </div>
                                    </div>
                                    <img src="assets/img/ocf_img_4.svg" class="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* y-coins token sale section */}
                <div class="token-sale-section my-5 py-5">

                    {/* <!-- Heading --> */}
                    <h2 class="fw-bold mb-3 text-center">Y-COIN TOKEN SALE STRUCTURE</h2>

                    {/* <!-- Paragraph --> */}
                    <p class="mb-4 text-center">
                        Y Coin’s token sale is designed to balance early investor access, strategic
                        staking incentives, and gradual market introduction.<br /> Only a limited portion of
                        the total lifetime supply is available during the sale, creating scarcity while
                        rewarding long-term holders.
                    </p>

                    {/* <!-- Table --> */}
                    <div class="table-responsive">
                        <table class="table table-bordered token-sale-table">
                            <thead>
                                <tr>
                                    <th>Round</th>
                                    <th>Duration</th>
                                    <th>Supply (% of Lifetime)</th>
                                    <th>Price (USD)</th>
                                    <th>Stake Lock-In</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Phase 1 – Early Access</td>
                                    <td>30 Days</td>
                                    <td>5%</td>
                                    <td>$5</td>
                                    <td>10 Months</td>
                                    <td>Strategic investing; staking blocks applied</td>
                                </tr>
                                <tr>
                                    <td>Phase 2 – Main Sale</td>
                                    <td>30 Days</td>
                                    <td>5%</td>
                                    <td>$7</td>
                                    <td>6 Months</td>
                                    <td>Public round; pre-registration required; staking blocks applied</td>
                                </tr>
                                <tr>
                                    <td>Phase 3 – Final Round</td>
                                    <td>45 Days</td>
                                    <td>10%</td>
                                    <td>$10</td>
                                    <td>No Lock-In</td>
                                    <td>Final round before exchange listing; focused on trading volume</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>


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
                                <h3> Tokenomics and Scarcity Model</h3>
                            </div>
                        </div>
                        <div class="row g-4 mt-4 mx-auto justify-content-center">

                            {/* <!-- Card 1 --> */}
                            <div class="col-md-4">
                                <div class="allocation-card p-3 shadow-sm">
                                    <div class="sale-item">
                                        <div class="sale-item-color">
                                            <span></span>
                                        </div>
                                        <div class="sale-item-cont">
                                            <strong>20%</strong>
                                            <small>Public Sale & Prelaunch</small>
                                            <small>Immediate availability
                                                for early investors.
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="allocation-card p-3 shadow-sm">
                                    <div class="sale-item">
                                        <div class="sale-item-color color-green">
                                            <span></span>
                                        </div>
                                        <div class="sale-item-cont">
                                            <strong>10%</strong>
                                            <small>Reserved Allocation</small>
                                            <small>This portion is reserved .
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Card 2 --> */}
                            <div class="col-md-4">
                                <div class="allocation-card p-3 shadow-sm">
                                    <div class="sale-item">
                                        <div class="sale-item-color color-green">
                                            <span></span>
                                        </div>
                                        <div class="sale-item-cont">
                                            <strong>70%</strong>
                                            <small>Staking Rewards</small>
                                            <small>Gradual release via
                                                YENTREX staking
                                                protocols.
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* <div class="chart-container d-flex flex-wrap pb-110 mb-pb-60 mb-pt-20">
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
                                                    <strong>0%</strong>
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
                        </div> */}
                    </div>
                </div>


                {/* <!-- WHAT MAKES US DIFFERENT sc --> */}
                <div id="differences" class="crp-happenning-container overflow-hidden">
                    <div class="container">
                        <div class="row ">
                            <div class="col-12 col-md-12 col-lg-8 mb-pb-0">
                                <div class="crp-inventment-content  " >
                                    <h2> ECOSYSTEM <br />
                                        <sapn class="text-gradient border-bottom">UTILITIES</sapn>
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
                                        <h3>Marketplace Vision</h3>
                                        <p>Y-Coin aims to be more than a trading                                          token — it will fuel a dedicated YENTREX
                                            E-Commerce Marketplace.
                                        </p>
                                        <ul>
                                            <li className='text-start'>Accept Y-Coin at fair market value for
                                                product purchases.</li>
                                            <li className='text-start'>Offer clothing, electronics, and
                                                lifestyle goods from multiple brands.</li>
                                        </ul>
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
                                        <h3> Billing System</h3>
                                        <p>Y-Coin will be usable in partnered
                                            retail stores across select regions.
                                            These stores will accept Y-Coin as
                                            final payment for goods.
                                        </p>
                                        <ul>
                                            <li className='text-start'>YENTREX
                                                will provide prepaid liquidity to
                                                participating stores, ensuring
                                                smooth acceptance.</li>
                                            <li className='text-start'>Stores may also
                                                earn yield on YCN holdings under the
                                                Secure Holdings Program.
                                            </li>
                                        </ul>
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
                                        <h3> Hybrid Trade Terminals </h3>
                                        <p>Y-Coin is designed for use in future Hybrid
                                            Trade Terminals that integrate both crypto and
                                            forex markets.
                                        </p>
                                        <ul >
                                            <li className='text-start'>Seamlessly switch between crypto and fiat
                                                markets.</li>
                                            <li className='text-start'>Use Y-Coin as a universal settlement asset
                                                across terminal trades.</li>
                                        </ul>
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
                                                <h3>December 14, 2025</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>ICO First Round</h5>
                                                    <p>For 1 month and rate 5$</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row">
                                        <div class="road-map-event event "
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>January 11, 2026</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>Yentrex Exchange Launching</h5>
                                                    <p>For Stacking and Trading</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row">
                                        <div class="road-map-event event wow bounceInLeft"
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>February 14, 2026</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>ICO Second Round</h5>
                                                    <p>For 1 month and rate 7$<br />
                                                        With Stacking and Trading with Flexi Mobile application.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row circle-row2">
                                        <div class="road-map-event event "
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>April 20, 2026</h3>
                                                <div class="timeline-cont-info">
                                                    {/* <h5>Start Development</h5> */}
                                                    <p>E-Commerce WebSite Lunching with best Earning project and Y-Coin Utility.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row circle-row2">
                                        <div class="road-map-event event wow bounceInLeft"
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>June 14, 2026</h3>
                                                <div class="timeline-cont-info">
                                                    <h5>ICO Third Round</h5>
                                                    <p>For 45 Days and rate 10$<br />
                                                        With Stacking, Trading, E-Commerce WebSite and Y-Coin Utility.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="road-map-row circle-row2">
                                        <div class="road-map-event event "
                                            data-wow-delay=".5s">
                                            <div class="content">
                                                <h3>September 15, 2026</h3>
                                                <div class="timeline-cont-info">
                                                    {/* <h5>Launch The Platform</h5> */}
                                                    <p>E-Commerce Product Selling Project (PSP) Lunching for Public Utility Standard Flexi Computer and Mobile Application.</p>
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