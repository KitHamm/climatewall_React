import Splash from "./Splash";
import InfoPage from "./Info";

export default function Landing(props) {
    return (
        <>
            <div className="start">
                <Splash />
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
                                How will you respond to the climate issues of
                                today?
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
                                document.getElementById("info").showModal();
                                document.body.style.overflow = "hidden";
                            }}
                            className="col-12 info-link text-center">
                            How does it work? {">"}
                        </div>
                    </div>
                </div>
            </div>
            <InfoPage />
        </>
    );
}