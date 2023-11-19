import falmouthExeterPlus from "../images/falmoutexeterplus.svg";
import SU from "../images/su.svg";
import FalUni from "../images/FalUni.svg";
import ExeterLogo from "../images/exeter-uni-logo.svg";

export default function Splash() {
    return (
        <>
            <div className="floating fade-out">
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-10 offset-1 mt-5 text-center">
                            <h1 className="cw-sub">Welcome to</h1>
                        </div>
                        <div className="col-10 mt-3 offset-1 text-center">
                            <h1 className="cw-title">#ClimateWall</h1>
                        </div>
                        <div className="col-10 mt-5 offset-1 text-center">
                            <h1 className="cw-sub">Streatham Campus</h1>
                        </div>
                        <div className="col-12 mt-5 text-center">
                            <img
                                className="splash-logo-ex"
                                src={ExeterLogo}
                                alt="University Of Exeter"
                            />
                        </div>
                        {/*<div className="col-12">
                            <img
                                className="splash-logo-fu"
                                src={FalUni}
                                alt="Falmouth University"
                            />
                        </div>
                        <div className="col-12">
                            <img
                                className="splash-logo-su"
                                src={SU}
                                alt="The Falmouth Exeter Students Union"
                            />
                        </div>
                        <div className="col-12">
                            <img
                                className="splash-logo-fxp"
                                src={falmouthExeterPlus}
                                alt="Falmouth Exeter Plus"
                            />
    </div>*/}
                    </div>
                </div>
            </div>
        </>
    );
}
