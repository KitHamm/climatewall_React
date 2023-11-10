import Load from "../images/load.png";

export default function Loader() {
    return (
        <div className="row">
            <div className="col-12 text-center">
                <div className="loader-container">
                    <img className="load" src={Load} alt="Load" />
                </div>
            </div>
        </div>
    );
}
