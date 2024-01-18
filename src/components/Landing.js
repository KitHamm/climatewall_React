// Landing page for first view

// component imports
import Splash from "./Splash";
import InfoPage from "./Info";

export default function Landing(props) {
    return (
        <>
            <div className="start">
                {/* Show the splash screen */}
                <Splash />
                {
                    // if out of working hours show the closed message
                    props.closed ? (
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-12 text-center">
                                    <div
                                        className="cw-sub-white"
                                        style={{ fontSize: "20px" }}>
                                        Welcome to
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 text-center">
                                    <h1 className="cw-title">#ClimateWall</h1>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-10 offset-1 text-center">
                                    <div
                                        className="cw-sub-white"
                                        style={{ fontSize: "20px" }}>
                                        Unfortunately we are closed at the
                                        moment.
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-10 offset-1 text-center">
                                    <div
                                        className="cw-sub-white"
                                        style={{ fontSize: "20px" }}>
                                        Operating hours are
                                        <br />
                                        4pm - 9pm.
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-10 offset-1 text-center">
                                    <div
                                        className="cw-sub-white"
                                        style={{ fontSize: "20px" }}>
                                        Please either refresh or visit The
                                        Stannary / The Student Union at Penryn
                                        Campus during operating hours to take
                                        part.
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .getElementById("info")
                                            .showModal();
                                        document.body.style.overflow = "hidden";
                                    }}
                                    className="col-12 info-link text-center">
                                    How does it work? {">"}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* if not closed show the main interface */
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-12 text-center">
                                    <div
                                        className="cw-sub-white"
                                        style={{ fontSize: "20px" }}>
                                        Welcome to
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 text-center">
                                    <h1 className="cw-title">#ClimateWall</h1>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-10 offset-1 text-center">
                                    <div
                                        className="cw-sub-white"
                                        style={{ fontSize: "20px" }}>
                                        How will you respond to the climate
                                        issues of today?
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 text-center">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.onViewChange(3);
                                        }}
                                        className="btn btn-climate">
                                        {"START"}
                                    </button>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .getElementById("info")
                                            .showModal();
                                        document.body.style.overflow = "hidden";
                                    }}
                                    className="col-12 info-link text-center">
                                    How does it work? {">"}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <InfoPage />
        </>
    );
}
