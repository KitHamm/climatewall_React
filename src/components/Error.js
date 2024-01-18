// import components
import SadFace from "./SadFace";

// Display for API errors
export default function Error() {
    return (
        <div className="error">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-10 offset-1 mt-5 mb-5 text-center">
                        <div>
                            <SadFace />
                        </div>
                        <div className="cw-response-info-red mt-3 text-center">
                            Oh no!
                        </div>
                        <div className="cw-response-info-bold mt-5 text-center">
                            It looks like there has been a problem with our
                            servers.
                        </div>
                        <div className="cw-response-info-bold mt-5 text-center">
                            Please bear with us while we try to fix the problem,
                            and try again later.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
