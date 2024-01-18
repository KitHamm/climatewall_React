// Terms and conditions for taking part

import InfoPage from "./Info";

export default function Terms(props) {
    return (
        <div className="terms">
            <div className="container">
                <div className="row terms-row mt-4">
                    <div className="cw-title-green">#ClimateWall</div>
                    <div className="cw-terms mt-4">
                        The #ClimateWall is an interactive platform that
                        encourages public interaction.
                    </div>
                    <div className="cw-terms-bold mt-4">
                        Your participation is completely anonymous and we will
                        not be collecting any data from your device whilst you
                        use this app.
                    </div>
                    <div className="cw-terms mt-4">
                        All responses posted are being moderated by a University
                        representative.
                    </div>
                    <div className="cw-terms mt-4">
                        As the #ClimateWall is a shared public space we require
                        you to read and accept the following terms and
                        conditions before you can use this app and participate.
                    </div>
                    <div className="cw-sub-terms mt-4">
                        Terms and conditions
                    </div>
                    <div className="cw-terms mt-4">
                        All Users agree to comply with the rules in the{" "}
                        <div
                            className="link"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("info").showModal();
                                document.body.style.overflow = "hidden";
                            }}>
                            User Guide
                        </div>
                        .
                    </div>
                    <div className="cw-terms mt-4">
                        All Users agree to respect the decision of the
                        moderator.
                    </div>
                    <div className="cw-terms mt-4">
                        All responses will remain anonymous – no personal
                        information will be collected or saved.
                    </div>
                    <div className="cw-terms mt-4">
                        All Users agree to have their anonymous responses saved
                        on a database for any future communications or
                        publicity.
                    </div>
                    <div className="cw-terms mt-4">
                        It is understood that the views and/or opinions
                        expressed on the Climate Wall are those of the
                        individuals who have posted a comment and do not
                        represent those of the University.
                    </div>
                    <hr className="cw-line" />
                    <div className="cw-terms-bold">
                        By selecting "accept and proceed" you agree to abide by
                        the above terms and conditions.
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            props.onViewChange(1);
                        }}
                        className="btn btn-climate mt-4 mb-4">
                        accept & proceed
                    </button>
                </div>
            </div>
            <InfoPage />
        </div>
    );
}
