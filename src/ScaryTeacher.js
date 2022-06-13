import React, {useRef, useEffect, useState} from "react";
import ReactGA from "react-ga4";
import viewportAction from "viewport-action";

ReactGA.initialize("G-K9SVV8GQNZ");

const options = {
    // How long the handler will wait after the original event stops triggering.
    // wait: 100,
    // Whether to unbind the handler after executed for the first time.
    once: true,
};

var Landed = true,
    Home = true,
    about = true,
    Mint = true,
    Roadmap = true,
    Community = true;

export default function ScaryTeacher() {
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [category, setCategory] = useState("mint.znkgames.com");

    useEffect(() => setTimeout(() => setIsPageLoaded(true), 3000), []);

    useEffect(() => {
        if (isPageLoaded) {
            console.log("page loaded");
            attachEvents();
        }
    }, [isPageLoaded]);

    const attachEvents = () => {
        viewportAction.add(
            "#container",
            function (e) {
                if (Landed) {
                    ReactGA.event({
                        category: category,
                        action: "1:  Landed on Page",
                        label: window.location.ref,
                    });
                    console.log("Landed on Page");
                    Landed = false;
                }
            },
            options
        );
        viewportAction.add(
            "#home",
            function (e) {
                if (Home) {
                    ReactGA.event({
                        category: category,
                        action: "2:  Showing Home",
                        label: window.location.ref,
                    });
                    console.log("Start Showing:1");
                    Home = false;
                    // Remove handler
                    // e.removeHandler();
                }
            },
            options
        );
        viewportAction.add("#about", function (e) {
            if (about) {
                ReactGA.event({
                    category: category,
                    action: "3:  Showing About",
                    label: window.location.ref,
                });
                console.log("Start Showing:2");
                about = false;
            }
        });
        viewportAction.add("#mint--section", function (e) {
            if (Mint) {
                ReactGA.event({
                    category: category,
                    action: "4:  Showing Mint",
                    label: window.location.ref,
                });
                console.log("Start Showing:3");
                Mint = false;
            }
        });
        viewportAction.add("#roadmap", function (e) {
            if (Roadmap) {
                ReactGA.event({
                    category: category,
                    action: "5:  Showing Roadmap",
                    label: window.location.ref,
                });
                console.log("Start Showing:4");
                Roadmap = false;
            }
        });
        viewportAction.add("#community", function (e) {
            if (Community) {
                ReactGA.event({
                    category: category,
                    action: "6:  Showing Community",
                    label: window.location.ref,
                });
                console.log("Start Showing:5");
                Community = false;
            }
        });
    };

    const homeRef = useRef();
    const goToHome = () => {
        homeRef.current.scrollIntoView({behavior: "smooth"});
        console.log("Clicked on Home");
        ReactGA.event({
            category: category,
            action: "  Click On Home",
            label: window.location.ref,
        });
    };
    const aboutRef = useRef();
    const goToAbout = () => {
        aboutRef.current.scrollIntoView({behavior: "smooth"});
        console.log("Clicked on About");
        ReactGA.event({
            category: category,
            action: "  Click On About",
            label: window.location.ref,
        });
    };
    const roadmapRef = useRef();
    const goToRoadmap = () => {
        roadmapRef.current.scrollIntoView({behavior: "smooth"});
        console.log("Clicked on RoadMap");
        ReactGA.event({
            category: category,
            action: " Click On Roadmap",
            label: window.location.ref,
        });
    };
    const joinRef = useRef();
    const goToJoin = () => {
        joinRef.current.scrollIntoView({behavior: "smooth"});
        console.log("Clicked on Join");
        ReactGA.event({
            category: category,
            action: " Click On Join",
            label: window.location.href,
        });
    };
    const playGame = () => {
        console.log("Clicked on Play Game");
        ReactGA.event({
            category: category,
            action: " Click On Play Game",
            label: window.location.href,
        });
    };
    const joinTheComunity = () => {
        joinRef.current.scrollIntoView({behavior: "smooth"});
        console.log("Clicked on Join");
        console.log("Clicked on Join The Comunity");
        ReactGA.event({
            category: category,
            action: " Click On Join the Community",
            label: window.location.href,
        });
    };
    const swipe = () => {
        console.log("Clicked on Swipe Button");
        ReactGA.event({
            category: category,
            action: " Click On Swipe",
            label: window.location.href,
        });
    };
    const mintNow = () => {
        console.log("Clicked on Mint Now");
        ReactGA.event({
            category: category,
            action: " Click On Mint Now",
            label: window.location.href,
        });
    };
    const discordIcon = () => {
        console.log("Clicked on Discord Icon");
        ReactGA.event({
            category: category,
            action: " Click On Discord",
            label: window.location.href,
        });
    };
    const facebookIcon = () => {
        console.log("Clicked on Facebook Icon");
        ReactGA.event({
            category: category,
            action: " Click On Facebook",
            label: window.location.href,
        });
    };
    const youtubeIcon = () => {
        console.log("Clicked on Youtube Icon");
        ReactGA.event({
            category: category,
            action: " Click On Youtube",
            label: window.location.href,
        });
    };
    const twitterIcon = () => {
        console.log("Clicked on Twitter Icon");
        ReactGA.event({
            category: category,
            action: " Click On Twitter",
            label: window.location.href,
        });
    };
    const privacyPolicy = () => {
        console.log("Clicked on Privacy Policy");
        ReactGA.event({
            category: category,
            action: " Click On Privacy Policy",
            label: window.location.href,
        });
    };
    const terms = () => {
        console.log("Clicked on Terms and Conditions");
        ReactGA.event({
            category: category,
            action: " Click On Terms and Conditions",
            label: window.location.href,
        });
    };
    return (
        <>
            <header>
                <div className="" id="container">
                    <nav className="navbar fixed-top navbar-expand-xl navbar-default py-xl-4">
                        <div className="container d-flex justify-content-between">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a
                                        className="nav-link px-2"
                                        role="button"
                                        onClick={discordIcon}
                                        href="https://discord.gg/Ptx8heAZZd"
                                        target="_blank"
                                    >
                                        <img src="img/ico-discord.svg" alt="..."/>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link px-2"
                                        role="button"
                                        onClick={twitterIcon}
                                        href="https://twitter.com/TeacherScary"
                                        target="_blank"
                                    >
                                        <img src="img/ico-twitter.svg" alt="..."/>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link px-2"
                                        role="button"
                                        onClick={youtubeIcon}
                                        href="https://www.youtube.com/channel/UC6z4RnDkI5DALyx3M1qEmPQ"
                                        target="_blank"
                                    >
                                        <img src="img/ico-youtube.svg" alt="..."/>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link px-2"
                                        role="button"
                                        onClick={facebookIcon}
                                        href="https://www.facebook.com/Scary-Teacher-104953160859907"
                                        target="_blank"
                                    >
                                        <img src="img/ico-facebook.svg" alt="..."/>
                                    </a>
                                </li>
                            </ul>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#mainMenu"
                                aria-controls="mainMenu"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="mainMenu">
                                <ul className="navbar-nav ml-auto font-outfit navbar__main text-center text-xl-left mb-4 mb-xl-0">
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={goToHome} role="button">
                                            Home
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={goToAbout} role="button">
                                            About
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={goToRoadmap} role="button">
                                            Roadmap
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={goToJoin} role="button">
                                            Join
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link btn btn-success"
                                            // onClick={playGame}
                                            href="http://onelink.to/5unqss"
                                            target="_blank"
                                        >
                                            Play Game
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <section className="overflow-hidden mb-5 " ref={homeRef} id="home">
                <div className="container">
                    <div className="row">
                        <div className="row align-items-center">
                            <div className="col-xl-6 order-xl-2">
                                <div className="px-3 pl-md-5 pr-md-0 overflow-hidden">
                                    <h1 className="font-frijole mt-5 mb-5 first__title">
                                        <span className="text-success">Scary</span> <br/>
                                        Teacher
                                    </h1>
                                    <p className="h3 font-outfit mb-4 text-gray animate__animated animate__fadeInUp">
                                        Welcome to the
                                        <span className="text-white">
                      {" "}
                                            World of Scary Teacher,
                    </span>{" "}
                                        a hit game residing on mobile market. Miss T (aka Scary
                                        Teacher) has been threatening kids, giving physical
                                        punishment and at times torturing kids. She has a history of
                                        relocating in various neighbourhoods to keep an eye on her
                                        <span className="text-white"> ‘favourite students’.</span>
                                    </p>
                                    <p className="h3 mb-0 font-outfit text-gray animate__animated animate__fadeInUp">
                                        From the world of mobile phones, this time she has decided
                                        to enter the metaverse in search of new students!
                                    </p>
                                    <figure className="text-right mr-4">
                                        <img src="img/head-arrow.svg" alt="..."/>
                                    </figure>
                                </div>
                            </div>
                            <div className="col-xl-6 order-xl-1">
                                <figure className="mb-0 my-5 first__pic">
                                    <img
                                        src="img/first-block.png"
                                        alt="..."
                                        className="img-fluid"
                                    />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden mb-5" ref={aboutRef} id="about">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-7">
                            <h2 className="font-frijole text-success mb-5 mt-5 pt-4 second__title">
                                About Miss T
                            </h2>
                            <p className="h3 text-gray font-outfit mb-4 wow animate__animated animate__fadeInUp">
                                Main antagonist in our game is{" "}
                                <span className="text-white">Miss T,</span> a loud and obnoxious
                                yet quite dumb at times woman who has an unapologetically
                                selfish nature. If she has a passion for something, and she will
                                have it, no matter the price. There is a sleek arrogance to her
                                character whose self-love knows no bounds.{" "}
                                <span className="text-white">Miss T,</span> is seen as a cold,
                                cruel and extremely vain person who has it out for children in
                                particular. <br/>
                                Lets join our hands together on our discord community to take
                                over the threat of <span className="text-white">Miss T,</span>
                            </p>
                            <p className="font-outfit mt-5 mb-5 text-mob-center">
                                <a
                                    onClick={joinTheComunity}
                                    role="button"
                                    className="btn btn-success font-outfit large__btn"
                                >
                                    Join the Community
                                </a>
                            </p>
                        </div>
                        <div className="col-xl-5">
                            <figure className="mb-0 second__pic">
                                <img
                                    src="img/second-block.png"
                                    alt="..."
                                    className="img-fluid"
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden pb-5" id="mint--section">
                <div className="container">
                    <h2 className="font-frijole mb-5 text-center text-success third__title">
            <span>
              <span className="title__lines">NFTS AND METAVERSE</span>
            </span>
                    </h2>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <p className="h3 mb-5 font-outfit text-center wow animate__animated animate__fadeInUp">
                                Now, this
                                <span className="text-white"> Scary Teacher's</span> Teacher has
                                relocated to metaverse and planning to release 9,999 versions of
                                her. With so many<span className="text-white"> Miss Ts</span>{" "}
                                frolicking around the metaverse, we need to act fast! Its time
                                to tame the threat and own all
                                <span className="text-white"> NFTs </span>
                                of <span className="text-white"> Miss Ts</span> so that we can
                                teach them a lesson. Intelligence suggests that following are
                                some of the <span className="text-white"> NFTs </span> being
                                released by her:
                            </p>
                        </div>
                    </div>
                    <div className="carusel__block">
                        <div className="swiper mySwiper">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <figure className="mb-0">
                                        <img src="img/bg-carusel-first.png" alt="..."/>
                                        <img src="img/teacher-01.png" alt="..."/>
                                    </figure>
                                </div>
                                <div className="swiper-slide">
                                    <figure className="mb-0">
                                        <img src="img/bg-carusel-second.png" alt="..."/>
                                        <img src="img/teacher-02.png" alt="..."/>
                                    </figure>
                                </div>
                                <div className="swiper-slide">
                                    <figure className="mb-0">
                                        <img src="img/bg-carusel-third.png" alt="..."/>
                                        <img src="img/teacher-03.png" alt="..."/>
                                    </figure>
                                </div>
                                <div className="swiper-slide">
                                    <figure className="mb-0">
                                        <img src="img/bg-carusel-fouth.png" alt="..."/>
                                        <img src="img/teacher-04.png" alt="..."/>
                                    </figure>
                                </div>
                                <div className="swiper-slide">
                                    <figure className="mb-0">
                                        <img src="img/bg-carusel-first.png" alt="..."/>
                                        <img src="img/teacher-01.png" alt="..."/>
                                    </figure>
                                </div>
                                <div className="swiper-slide">
                                    <figure className="mb-0">
                                        <img src="img/bg-carusel-second.png" alt="..."/>
                                        <img src="img/teacher-02.png" alt="..."/>
                                    </figure>
                                </div>
                                <div className="swiper-slide">
                                    <figure className="mb-0">
                                        <img src="img/bg-carusel-third.png" alt="..."/>
                                        <img src="img/teacher-03.png" alt="..."/>
                                    </figure>
                                </div>
                                <div className="swiper-slide">
                                    <figure className="mb-0">
                                        <img src="img/bg-carusel-fouth.png" alt="..."/>
                                        <img src="img/teacher-04.png" alt="..."/>
                                    </figure>
                                </div>
                            </div>
                        </div>

                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </div>
                    <p className="mt-5 mb-0 text-center">
                        <button
                            disabled
                            // onClick={mintNow}
                            className="btn btn-success font-outfit large__btn"
                        >
                            Mint: Coming Soon
                        </button>
                    </p>
                </div>
            </section>

            <section id="roadmap">
                <div className="board-block" ref={roadmapRef}>
                    <div className="container">
                        <h2 className="font-mrb text-center">The Roadmap</h2>
                        <div className="row">
                            <div className="col-xl-8 offset-xl-2">
                                <div
                                    className="media media-board font-theswarm  wow animate__animated animate__fadeInUp">
                                    <img src="img/board-circle.svg" className="mr-5" alt="..."/>
                                    <div className="media-body">
                                        <h5 className="mt-0 mb-5">
                                            <span className="text-success">Q1, 2022</span> (Jan - Mar)
                                        </h5>

                                        <h6 className="h5 text-success">Whitelist Promotion</h6>
                                        <p>
                                            Members will be requested to join our whitelist to get
                                            advantage of price as low as{" "}
                                            <span className="text-success">0.05 ETH</span> per NFT!
                                            There will be more rewards for joining the whitelist. Stay
                                            tuned in our discord server to get more updates
                                        </p>

                                        <h6 className="h5 text-success">Pre Sale</h6>
                                        <p>
                                            A limited number of NFTs will be released exclusively for
                                            members in whitelist. Price will be{" "}
                                            <span className="text-success">0.05 ETH</span>. Date will be
                                            announced soon
                                        </p>

                                        <h6 className="h5 text-success">Public Sale</h6>
                                        <p>
                                            <span className="text-success">9,999 NFTs </span> will be
                                            released for public sale on our website. Price will be
                                            <span className="text-success"> 0.08 ETH.</span> Date will be
                                            announced soon
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="media media-board font-theswarm  wow animate__animated animate__fadeInUp">
                                    <img src="img/board-circle.svg" className="mr-5" alt="..."/>
                                    <div className="media-body">
                                        <h5 className="mt-0 mb-5">
                                            <span className="text-success">Q2, 2022</span> (Apr - Jun)
                                        </h5>

                                        <h6 className="h5 text-success">
                                            classroom Banner Builder
                                        </h6>
                                        <p>
                                            A feature will be given to create your own banner using your{" "}
                                            <span className="text-success">NFT </span> and customized
                                            backgrounds we offer. Members can use their own
                                            backgrounds as well
                                        </p>

                                        <h6 className="h5 text-success">3D Models For NFTs</h6>
                                        <p>
                                            A feature will given to create your own banner using your{" "}
                                            <span className="text-success">NFT </span> and customized
                                            backgrounds we offer. Members can use their own
                                            backgrounds as well
                                        </p>
                                        <h6 className="h5 text-success">Monthly Raffles</h6>
                                        <p>
                                            <span className="text-success"> From May,</span> we will
                                            start giveaways of exclusive items to members for{" "}
                                            <span className="text-success"> FREE. </span> It can be a
                                            random giveaway or earned via a contest.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="media media-board font-theswarm  wow animate__animated animate__fadeInUp">
                                    <img src="img/board-circle.svg" className="mr-5" alt="..."/>
                                    <div className="media-body">
                                        <h5 className="mt-0 mb-5">
                                            <span className="text-success">Q3, 2022</span> (Jul - Sep)
                                        </h5>

                                        <h6 className="h5 text-success">NFT gestures</h6>
                                        <p>
                                            Once we are done with fully rigging the{" "}
                                            <span className="text-success"> NFTs, </span> a few
                                            gestures per <span className="text-success"> NFT </span>{" "}
                                            will be provided to owners for FREE!
                                        </p>

                                        <h6 className="h5 text-success">Prank your NFT</h6>
                                        <p>
                                            Member who also play
                                            <span className="text-success"> Scary Teacher </span> will
                                            have the option to do Pranks and play levels with{" "}
                                            <span className="text-success"> Miss T </span> version
                                            that they have bought!
                                        </p>

                                        <h6 className="h5 text-success">Charity</h6>
                                        <p>
                                            A step towards giving it back to the world. We will be
                                            funding a random school or support education of a child in
                                            need. Decision will be made on discussion with community.
                                        </p>

                                        <h6 className="h5 text-success">Merchandize</h6>
                                        <p>
                                            Merchandize to be provided <span className="text-success"> In Real Life.</span>
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="media media-board font-theswarm  wow animate__animated animate__fadeInUp">
                                    <img src="img/board-circle.svg" className="mr-5" alt="..."/>
                                    <div className="media-body">
                                        <h5 className="mt-0 mb-5">
                                            <span className="text-success">Q4, 2022</span> (Oct - Dec)
                                        </h5>

                                        <h6 className="h5 text-success">
                                            Miss T Goes To Metaverse
                                        </h6>
                                        <p>
                                            With 3d models made and characters fully rigged, owners
                                            can take their NFTs to the selected metaverses
                                        </p>

                                        <h6 className="h5 text-success">
                                            Buy Land To Create Your World
                                        </h6>
                                        <p>
                                            Option to buy land will be given where members are free to
                                            create their own worlds. They can create their own house
                                            , create their own prank levels, or create a school that
                                            runs accordingly to the land owner’s rules!
                                        </p>

                                        <h6 className="h5 text-success">Visiting Facul-T</h6>
                                        <p>Let your NFT go to other lands to teach them. You can get money by renting
                                            her</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden" ref={joinRef} id="community">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6">
                            <figure className="mb-0 third__pic">
                                <img
                                    src="img/third-block.png"
                                    alt="..."
                                    className="img-fluid"
                                />
                            </figure>
                        </div>
                        <div className="col-xl-6">
                            <h2 className="font-frijole text-success mb-5 fouth__title text-mob-center text-tablet-center">
                                Join The Community
                            </h2>
                            <ul className="nav justify-content-center mb-5">
                                <li className="nav-item">
                                    <a
                                        className="nav-link px-2"
                                        role="button"
                                        onClick={discordIcon}
                                        href="https://discord.gg/Ptx8heAZZd"
                                        target="_blank"
                                    >
                                        <img src="img/ico-discord-lg.svg" alt="..."/>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link px-2"
                                        role="button"
                                        onClick={twitterIcon}
                                        href="https://twitter.com/TeacherScary"
                                        target="_blank"
                                    >
                                        <img src="img/ico-twitter-lg.svg" alt="..."/>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link px-2"
                                        role="button"
                                        onClick={youtubeIcon}
                                        href="https://www.youtube.com/channel/UC6z4RnDkI5DALyx3M1qEmPQ"
                                        target="_blank"
                                    >
                                        <img src="img/ico-youtube-lg.svg" alt="..."/>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link px-2"
                                        role="button"
                                        onClick={facebookIcon}
                                        href="https://www.facebook.com/Scary-Teacher-104953160859907"
                                        target="_blank"
                                    >
                                        <img src="img/ico-facebook-lg.svg" alt="..."/>
                                    </a>
                                </li>
                            </ul>
                            <figure
                                className="mb-0 text-mob-center text-tablet-center  wow animate__animated animate__fadeInUp">
                                <img src="img/ruler-triangle-foot.svg" alt="..."/>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className="container py-4">
                    <hr/>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <p className="mb-4 mb-md-0 font-outfit text-mob-center">
                                &copy; 2022, ZNK. All Rights Reserved
                            </p>
                        </div>
                        <div className="col-md-6">
                            <nav className="nav justify-content-center justify-content-md-end font-outfit nav__footer">
                                <a
                                    className="nav-link text-white py-0"
                                    role="button"
                                    onClick={privacyPolicy}
                                    href="https://znkgames.com/privacy.html"
                                    target="_blank"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    className="nav-link text-white py-0"
                                    role="button"
                                    onClick={terms}
                                    href="https://znkgames.com/tos.html"
                                    target="_blank"
                                >
                                    Terms & Conditions
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
