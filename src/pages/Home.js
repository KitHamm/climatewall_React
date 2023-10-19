import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
    ADD_RESPONSE,
    ADD_qRESPONSE,
    QUESTIONS,
    CURRENT_QUESTION,
    AWAIT_APPROVAL,
} from "../components/queries";

export default function Home() {
    const { loading, error, data } = useQuery(QUESTIONS);
    const [view, setView] = useState(1);
    const [id, setId] = useState(0);
    const {
        loading: loadingQID,
        error: errorQID,
        data: dataQID,
    } = useQuery(CURRENT_QUESTION);
    if (loading || loadingQID) return <div>Loading</div>;
    if (error || errorQID) return <div>Error</div>;
    if (data && dataQID) {
        return (
            <>
                <div className="container">
                    <section id="header">
                        <div className="row mt-5 text-center">
                            <div className="col-12">
                                <h2>Welcome to Climate Wall!</h2>
                            </div>
                        </div>
                    </section>
                    <section id="header">
                        <div className="row mt-5 text-center">
                            <div className="col-12">
                                <h2>
                                    {
                                        data.questions.data[
                                            dataQID.currentQuestion.data
                                                .attributes.number
                                        ].attributes.question
                                    }
                                </h2>
                            </div>
                        </div>
                    </section>
                    {view === 1 ? (
                        <Form
                            onViewChange={setView}
                            onIdChange={setId}
                            question={
                                data.questions.data[
                                    dataQID.currentQuestion.data.attributes
                                        .number
                                ].attributes.question
                            }
                        />
                    ) : (
                        <AwaitApproval id={id} />
                    )}
                </div>
            </>
        );
    }
}
function Form(props) {
    const [response, setResponse] = useState("");
    /* eslint-disable no-unused-vars */
    const [
        addResponse,
        { loading: loadingResponse, error: errorResponse, data: dataResponse },
    ] = useMutation(ADD_RESPONSE, { variables: { response: response } });
    const [
        addQResponse,
        {
            loading: loadingQResponse,
            error: errorQResponse,
            data: dataQResponse,
        },
    ] = useMutation(ADD_qRESPONSE);
    /* eslint-enable no-unused-vars */
    function handleAddResponse(e, questionResp) {
        e.preventDefault();
        addResponse();
        addQResponse({
            variables: { question: questionResp, response: response },
        });
    }
    useEffect(() => {
        if (dataResponse && dataQResponse) {
            props.onIdChange(dataResponse.createResponse.data.id);
            props.onViewChange(2);
        }
    }, [dataResponse, dataQResponse, props]);
    return (
        <section id="add-word">
            <div className="row mt-5 text-center">
                <div className="col-12">
                    <h5>Create your response</h5>
                </div>
            </div>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12">
                        <input
                            type="text"
                            value={response}
                            placeholder="Type your response..."
                            onChange={(e) => {
                                setResponse(e.target.value);
                            }}
                        />
                    </div>

                    <div className="col-6 text-start">
                        <button
                            className="btn btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                setResponse("");
                            }}>
                            Clear
                        </button>
                    </div>
                    <div className="col-6 text-end">
                        <button
                            className="btn btn-success"
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddResponse(e, props.question);
                            }}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AwaitApproval(props) {
    const [approved, setApproved] = useState(null);
    /* eslint-disable no-unused-vars */
    const { loading, error, data, stopPolling } = useQuery(AWAIT_APPROVAL, {
        pollInterval: 500,
        variables: { id: props.id },
    });
    /* eslint-enable no-unused-vars */
    if (data) {
        if (data.response.data.attributes.approved !== approved) {
            setApproved(data.response.data.attributes.approved);
            stopPolling();
        }
    }
    return (
        <section id="add-word">
            <div className="row mt-5 text-center">
                <div className="col-12">
                    <h5>{approved == null ? "Awaiting Approval" : ""}</h5>
                    <h5>
                        {approved == null ? (
                            <Spinner />
                        ) : approved ? (
                            "Approved!"
                        ) : (
                            "Sorry, our moderators deemed this response to be inappropriate."
                        )}
                    </h5>
                </div>
            </div>
        </section>
    );
}

function Spinner() {
    return (
        <>
            <span class="loader mt-5"></span>
            <h5 className="mt-3">Please do not leave this page.</h5>
        </>
    );
}
