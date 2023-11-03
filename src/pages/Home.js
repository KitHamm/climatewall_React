import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useMutation, useQuery } from "@apollo/client";
import {
    ADD_RESPONSE,
    ADD_qRESPONSE,
    QUESTIONS,
    CURRENT_QUESTION,
    AWAIT_APPROVAL,
    QUEUE_AWAIT_APPROVAL,
    QUEUE_AWAIT_WALL,
    ON_WALL,
    GET_AWAITING,
} from "../components/queries";
import falmouthExeterPlus from "../images/falmoutexeterplus.svg";
import SU from "../images/su.svg";
import FalUni from "../images/FalUni.svg";
import ExeterLogo from "../images/exeter-uni-logo.svg";
import Help from "../images/help-button.svg";
import Smile from "../images/smile.svg";
import Sad from "../images/sad.svg";
import Load from "../images/load.png";
export default function Home() {
    const [transition, setTransition] = useState(true);
    const [view, setView] = useState(0);
    const [selectView, setSelectView] = useState(0);
    const [id, setId] = useState(0);
    const [isFull, setIsFull] = useState(false);
    const [questionUpdated, setQuestionUpdated] = useState("");
    const { loading, error, data } = useQuery(QUESTIONS);
    const {
        loading: loadingQID,
        error: errorQID,
        data: dataQID,
    } = useQuery(CURRENT_QUESTION);
    function handleChangeView(newView) {
        setSelectView(newView);
    }
    useEffect(() => {
        if (selectView !== view) {
            setTransition(false);
            setTimeout(() => {
                setView(selectView);
                setTransition(true);
            }, 500);
        }
    }, [view, selectView]);
    useEffect(() => {
        if (dataQID) {
            setQuestionUpdated(
                dataQID.currentQuestion.data.attributes.updatedAt
            );
        }
    }, [dataQID]);
    let display = null;
    if (loading || loadingQID) return <Splash />;
    if (error || errorQID) return <Error />;
    if (data && dataQID) {
        switch (view) {
            case 0:
                display = <Landing onViewChange={handleChangeView} />;
                break;
            case 3:
                display = <Terms onViewChange={handleChangeView} />;
                break;
            default:
                display = (
                    <>
                        <div className="container">
                            <section id="header">
                                <div className="row mt-5 text-center">
                                    <div className="col-12">
                                        <div className="cw-title-green">
                                            #ClimateWall
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {view === 1 ? (
                                <>
                                    <section id="header">
                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <div className="cw-question">
                                                    {
                                                        data.questions.data[
                                                            dataQID
                                                                .currentQuestion
                                                                .data.attributes
                                                                .number
                                                        ].attributes.question
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <Form
                                        onViewChange={handleChangeView}
                                        onIdChange={setId}
                                        isFull={isFull}
                                        setIsFull={setIsFull}
                                        questionUpdatedAt={questionUpdated}
                                        question={
                                            data.questions.data[
                                                dataQID.currentQuestion.data
                                                    .attributes.number
                                            ].attributes.question
                                        }
                                    />
                                </>
                            ) : view === 2 ? (
                                <AwaitApproval
                                    question={
                                        data.questions.data[
                                            dataQID.currentQuestion.data
                                                .attributes.number
                                        ].attributes.question
                                    }
                                    isFull={isFull}
                                    setIsFull={setIsFull}
                                    onViewChange={handleChangeView}
                                    questionUpdatedAt={questionUpdated}
                                    id={id}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                        <InfoPage />
                    </>
                );
                break;
        }
        return (
            <CSSTransition
                in={transition}
                timeout={1000}
                classNames={"transition"}>
                {display}
            </CSSTransition>
        );
    }
}
function InfoPage(props) {
    function handleClose() {
        document
            .getElementById("info")
            .classList.replace("fade-in", "fade-out-info");
        setTimeout(() => {
            document.getElementById("info").close();
            document.body.style.overflow = null;
            document
                .getElementById("info")
                .classList.replace("fade-out-info", "fade-in");
        }, 333);
    }
    return (
        <>
            <dialog id="info" className="fade-in">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-8">
                            <div className="cw-title-green">#ClimateWall</div>
                        </div>
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                handleClose();
                            }}
                            className="col-4 mt-3 text-end close-button">
                            &times;
                        </div>
                    </div>
                    <div className="row">
                        <h1>How does it work?</h1>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <h3>1. Lorem ipsum</h3>
                        </div>
                        <div className="col-12">
                            <h3>2. Lorem ipsum</h3>
                        </div>
                        <div className="col-12">
                            <h3>3. Lorem ipsum</h3>
                        </div>
                        <div className="col-12">
                            <h3>4. Lorem ipsum</h3>
                        </div>
                        <div className="col-12">
                            <h3>5. Lorem ipsum</h3>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <h2>Lorem ipsum</h2>
                        </div>
                        <div className="col-12">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Suscipit non voluptatibus,
                                ratione ea magni, rem atque architecto inventore
                                eum, molestias veniam quis voluptatem?
                                Voluptatum asperiores eum vero nam quos impedit!
                            </p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <h2>Lorem ipsum</h2>
                        </div>
                        <div className="col-12">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Suscipit non voluptatibus,
                                ratione ea magni, rem atque architecto inventore
                                eum, molestias veniam quis voluptatem?
                                Voluptatum asperiores eum vero nam quos impedit!
                            </p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <h2>Lorem ipsum</h2>
                        </div>
                        <div className="col-12">
                            <p>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Suscipit non voluptatibus,
                                ratione ea magni, rem atque architecto inventore
                                eum, molestias veniam quis voluptatem?
                                Voluptatum asperiores eum vero nam quos impedit!
                            </p>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
function Landing(props) {
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
function Form(props) {
    const [response, setResponse] = useState("");
    const [transition, setTransition] = useState(true);
    const [view, setView] = useState(0);
    const [selectView, setSelectView] = useState(0);
    /* eslint-disable no-unused-vars */
    const {
        loading: nullLoading,
        error: nullError,
        data: nullData,
    } = useQuery(GET_AWAITING, {
        variables: {
            question: props.question,
            updated: props.questionUpdatedAt,
        },
    });
    const {
        loading: awaitWallLoading,
        error: awaitWallError,
        data: awaitWallData,
    } = useQuery(QUEUE_AWAIT_WALL, {
        variables: {
            question: props.question,
            updated: props.questionUpdatedAt,
        },
    });
    const {
        loading: onWallLoading,
        error: onWallError,
        data: onWallData,
    } = useQuery(ON_WALL, {
        variables: {
            question: props.question,
            updated: props.questionUpdatedAt,
        },
    });
    const [
        addResponse,
        { loading: loadingResponse, error: errorResponse, data: dataResponse },
    ] = useMutation(ADD_RESPONSE);
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
        addResponse({
            variables: {
                question: questionResp,
                response: response.toLowerCase(),
            },
        });
        addQResponse({
            variables: { question: questionResp, response: response },
        });
    }
    useEffect(() => {
        if (selectView !== view) {
            setTransition(false);
            setTimeout(() => {
                setView(selectView);
                setTransition(true);
            }, 500);
        }
    }, [view, selectView]);
    useEffect(() => {
        if (dataResponse && dataQResponse) {
            props.onIdChange(dataResponse.createResponse.data.id);
            props.onViewChange(2);
        }
    }, [dataResponse, dataQResponse, props]);
    useEffect(() => {
        if (onWallData && awaitWallData && nullData) {
            if (
                onWallData.responses.data.length +
                    awaitWallData.responses.data.length >=
                8
            ) {
                setView(2);
                setSelectView(2);
                props.setIsFull(true);
            } else if (
                onWallData.responses.data.length +
                    awaitWallData.responses.data.length +
                    nullData.responses.data.length >=
                8
            ) {
                setView(1);
                setSelectView(1);
            }
        }
    }, [onWallData, awaitWallData, nullData, props]);
    if (awaitWallLoading || onWallLoading || nullLoading) return "";
    if (awaitWallError || onWallError || nullError) return <Error />;
    if (onWallData && awaitWallData && nullData) {
        switch (view) {
            case 1:
                return (
                    <CSSTransition
                        in={transition}
                        timeout={1000}
                        classNames={"transition"}>
                        <section id="add-word" className="fade-in">
                            <div className="row mt-5">
                                <div className="col-10 offset-1">
                                    <div
                                        style={{ fontSize: "15pt" }}
                                        className="cw-response-info-green">
                                        We have had a high number of responses
                                        for this question.
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-10 offset-1">
                                    <p
                                        style={{ fontSize: "16pt" }}
                                        className="cw-response-info-text">
                                        Your response may not make it onto the
                                        wall, but we would still very much like
                                        to hear from you.
                                    </p>
                                    <p className="cw-response-info-text">
                                        Would you like to continue?
                                    </p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-10 offset-1 text-center">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectView(0);
                                        }}
                                        className="btn btn-climate">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </section>
                    </CSSTransition>
                );
            case 2:
                return (
                    <CSSTransition
                        in={transition}
                        timeout={1000}
                        classNames={"transition"}>
                        <section id="add-word" className="fade-in">
                            <div className="row mt-3">
                                <div className="col-10 offset-1">
                                    <p
                                        style={{ fontSize: "16pt" }}
                                        className="cw-response-info-green">
                                        Responses for this question are full at
                                        the moment, but we would still very much
                                        like to hear from you.
                                    </p>
                                    <p className="cw-response-info-text">
                                        Would you like to continue?
                                    </p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-10 offset-1 text-center">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectView(0);
                                        }}
                                        className="btn btn-climate">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </section>
                    </CSSTransition>
                );
            default:
                return (
                    <CSSTransition
                        in={transition}
                        timeout={1000}
                        classNames={"transition"}>
                        <section id="add-word" className="fade-in">
                            <div className="row mt-5">
                                <div className="col-7 offset-1">
                                    <div className="cw-response-info">
                                        Your response:
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label
                                        className="cw-response-info"
                                        style={
                                            response.length < 151
                                                ? { float: "inline-end" }
                                                : {
                                                      float: "inline-end",
                                                      color: "red",
                                                  }
                                        }>
                                        {response.length}/150
                                    </label>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-10 offset-1">
                                    <textarea
                                        value={response}
                                        placeholder="Start typing..."
                                        onChange={(e) => {
                                            setResponse(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                style={{ height: "55px" }}
                                className="row mt-3">
                                <div className="col-5 offset-1">
                                    {response !== "" &&
                                    response.length < 151 ? (
                                        <button
                                            className="btn fade-in btn-climate"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddResponse(
                                                    e,
                                                    props.question
                                                );
                                            }}>
                                            Submit
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col-3 offset-2 help-container text-end">
                                    <img
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .getElementById("info")
                                                .showModal();
                                            document.body.style.overflow =
                                                "hidden";
                                        }}
                                        className="help-icon"
                                        src={Help}
                                        alt="Help"
                                    />
                                </div>
                            </div>
                        </section>
                    </CSSTransition>
                );
        }
    }
}
function AwaitApproval(props) {
    const [approved, setApproved] = useState(null);
    const [questionChanged, setQuestionChanged] = useState(false);
    const [prevApproved, setPrevApproved] = useState(null);
    const [onWall, setOnWall] = useState(false);
    const [totalPosition, setTotalPosition] = useState(10);
    const [transition, setTransition] = useState(true);
    const [dataLength, setDataLength] = useState(0);
    const [queueLength, setQueueLength] = useState(0);
    const [place, setPlace] = useState(0);
    const [wallPlace, setWallPlace] = useState(0);
    const [lateFull, setLateFUll] = useState(false);
    /* eslint-disable no-unused-vars */
    const {
        loading,
        error,
        data,
        stopPolling: stopPollingQID,
    } = useQuery(QUESTIONS, {
        pollInterval: 500,
    });
    const {
        loading: loadingQID,
        error: errorQID,
        data: dataQID,
        stopPolling: stopPollingQuestion,
    } = useQuery(CURRENT_QUESTION, {
        pollInterval: 500,
    });
    const {
        loading: onWallLoading,
        error: onWallError,
        data: onWallData,
        stopPolling: stopPollingWallData,
    } = useQuery(ON_WALL, {
        pollInterval: 500,
        variables: {
            question: props.question,
            updated: props.questionUpdatedAt,
        },
    });
    const {
        loading: awaitLoading,
        error: awaitError,
        data: awaitData,
        stopPolling,
    } = useQuery(AWAIT_APPROVAL, {
        pollInterval: 500,
        variables: { id: props.id },
    });
    const {
        loading: queueLoading,
        error: queueError,
        data: queueData,
        stopPolling: stopPollingQueue,
    } = useQuery(QUEUE_AWAIT_APPROVAL, {
        pollInterval: 500,
        variables: {
            question: props.question,
            updated: props.questionUpdatedAt,
        },
    });
    const {
        loading: wallLoading,
        error: wallError,
        data: wallData,
        stopPolling: stopPollingWall,
    } = useQuery(QUEUE_AWAIT_WALL, {
        pollInterval: 500,
        variables: {
            question: props.question,
            updated: props.questionUpdatedAt,
        },
    });
    useEffect(() => {
        if (approved !== prevApproved) {
            setTransition(false);
            setTimeout(() => {
                setPrevApproved(approved);
                setTransition(true);
            }, 500);
        }
    }, [approved, prevApproved]);
    useEffect(() => {
        if (
            props.question !==
            data.questions.data[dataQID.currentQuestion.data.attributes.number]
                .attributes.question
        ) {
            stopPolling();
            stopPollingQueue();
            stopPollingWall();
            stopPollingWallData();
            stopPollingQID();
            stopPollingQuestion();
            setQuestionChanged(true);
        }
    }, [
        data,
        dataQID,
        props.question,
        stopPolling,
        stopPollingQID,
        stopPollingQuestion,
        stopPollingQueue,
        stopPollingWall,
        stopPollingWallData,
    ]);
    useEffect(() => {
        if (props.isFull) {
            stopPolling();
            stopPollingQueue();
            stopPollingWall();
            stopPollingWallData();
            stopPollingQID();
            stopPollingQuestion();
        }
    }, [
        props.isFull,
        stopPolling,
        stopPollingQID,
        stopPollingQuestion,
        stopPollingQueue,
        stopPollingWall,
        stopPollingWallData,
    ]);
    useEffect(() => {
        if (awaitData && queueData && wallData && onWallData) {
            if (
                queueLength !== queueData.responses.data.length &&
                awaitData.response.data.attributes.approved === null
            ) {
                for (let i = 0; i < queueData.responses.data.length; i++) {
                    if (queueData.responses.data[i].id === props.id) {
                        setPlace(i + 1);
                        break;
                    }
                }
                setQueueLength(queueData.responses.data.length);
            }
            if (
                dataLength !== wallData.responses.data.length &&
                awaitData.response.data.attributes.approved === true
            ) {
                for (let i = 0; i < wallData.responses.data.length; i++) {
                    if (wallData.responses.data[i].id === props.id) {
                        setWallPlace(i + 1);
                        break;
                    }
                }
                setDataLength(wallData.responses.data.length);
            }
            if (awaitData.response.data.attributes.approved !== approved) {
                setApproved(awaitData.response.data.attributes.approved);
            }
            if (awaitData.response.data.attributes.onWall !== onWall) {
                setOnWall(awaitData.response.data.attributes.onWall);
                stopPolling();
                stopPollingQueue();
                stopPollingWall();
                stopPollingWallData();
                stopPollingQID();
                stopPollingQuestion();
            }
            if (approved === false) {
                stopPolling();
                stopPollingQueue();
                stopPollingWall();
                stopPollingWallData();
                stopPollingQID();
                stopPollingQuestion();
            }
        }
    }, [
        totalPosition,
        setTotalPosition,
        approved,
        awaitData,
        dataLength,
        onWall,
        onWallData,
        props.id,
        queueData,
        queueLength,
        stopPolling,
        stopPollingQID,
        stopPollingQuestion,
        stopPollingQueue,
        stopPollingWall,
        stopPollingWallData,
        wallData,
    ]);
    useEffect(() => {
        if (wallData && onWallData) {
            if (wallPlace !== 0) {
                console.log(
                    onWallData.responses.data.length +
                        " | " +
                        wallData.responses.data.length +
                        " | " +
                        wallPlace
                );
                if (
                    onWallData.responses.data.length +
                        wallData.responses.data.length >
                        8 &&
                    wallPlace > 8
                ) {
                    setLateFUll(true);
                    stopPolling();
                    stopPollingQueue();
                    stopPollingWall();
                    stopPollingWallData();
                    stopPollingQID();
                    stopPollingQuestion();
                }
            }
        }
    }, [
        onWallData,
        wallData,
        wallPlace,
        stopPolling,
        stopPollingQID,
        stopPollingQuestion,
        stopPollingQueue,
        stopPollingWall,
        stopPollingWallData,
    ]);
    if (awaitLoading || queueLoading || wallLoading || onWallLoading) return "";
    if (awaitError || queueError || wallError || onWallError) return <Error />;
    /* eslint-enable no-unused-vars */
    if (place !== 0) {
        return (
            <section id="add-word">
                <CSSTransition
                    in={transition}
                    timeout={1000}
                    classNames={"transition"}>
                    <>
                        <div className="row mt-3">
                            {questionChanged ? (
                                <>
                                    <div className="col-12 text-center">
                                        <SadFace />
                                    </div>
                                    <div className="cw-response-info-red col-10 offset-1 mt-3">
                                        Oh no! The question on the wall has
                                        changed!
                                    </div>
                                    <div className="cw-response-info-bold col-10 offset-1 mt-3">
                                        We appreciate your response.
                                    </div>
                                    <div className="cw-response-info-text col-10 offset-1 mt-3">
                                        But unfortunately it won't make it onto
                                        the wall. Please try again with the new
                                        question.
                                    </div>
                                </>
                            ) : props.isFull || lateFull ? (
                                <>
                                    <div className="col-12 text-center mb-3">
                                        <SmilingFace />
                                    </div>
                                    <div className="cw-response-info-green col-10 offset-1 mt-3">
                                        Thank you for your response!
                                    </div>
                                    <div className="cw-response-info-bold col-10 offset-1 mt-3">
                                        Unfortunately responses for this
                                        question are full.
                                    </div>
                                    <div className="cw-response-info-text col-10 offset-1 mt-3">
                                        Please try again with the next question
                                        to get your response on the wall.
                                    </div>
                                </>
                            ) : prevApproved === null ? (
                                <>
                                    <div className="col-12 text-center">
                                        <ThinkingFace />
                                    </div>
                                    <div className="cw-response-info-text col-10 offset-1 mt-3">
                                        Hold tight! Your response is awaiting
                                        approval from our moderator.
                                    </div>
                                    <div className="cw-response-info-bold col-10 offset-1 mt-3">
                                        Your response is{" "}
                                        <div className="cw-response-info-green">
                                            number {place}
                                        </div>{" "}
                                        in the queue.
                                    </div>
                                    <div className="cw-response-info-text col-10 offset-1 mt-3">
                                        Please do not leave this page or you
                                        will have to start again...
                                    </div>
                                </>
                            ) : prevApproved ? (
                                <>
                                    <div className="col-12 text-center mb-3">
                                        <SmilingFace />
                                    </div>
                                    <div className="cw-response-info-green col-10 offset-1 mt-3">
                                        Your response has been approved!
                                    </div>
                                    {onWallData.responses.data.length >= 8 ? (
                                        <div className="cw-response-info-bold col-10 offset-1 mt-3">
                                            Sorry!
                                        </div>
                                    ) : onWall ? (
                                        <div className="cw-response-info-bold col-10 offset-1 mt-3">
                                            Your response is on the wall!
                                        </div>
                                    ) : (
                                        <div className="cw-response-info-bold col-10 offset-1 mt-3">
                                            Your response is{" "}
                                            <div className="cw-response-info-green">
                                                number {wallPlace}
                                            </div>{" "}
                                            in the queue for the wall.
                                        </div>
                                    )}
                                    {onWallData.responses.data.length >= 8 ? (
                                        <div className="cw-response-info-bold col-10 offset-1 mt-3">
                                            Responses for this question are
                                            full. Please try again with the next
                                            question.
                                        </div>
                                    ) : onWall ? (
                                        ""
                                    ) : (
                                        <div className="cw-response-info-text col-10 offset-1 mt-3">
                                            Please be patient, your response
                                            will appear on the wall shortly.
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="col-12 text-center">
                                        <SadFace />
                                    </div>
                                    <div className="cw-response-info-red col-10 offset-1 mt-3">
                                        {
                                            awaitData.response.data.attributes
                                                .reason
                                        }
                                    </div>
                                    <div className="cw-response-info-text col-10 offset-1 mt-3">
                                        Please try again or visit our help
                                        section for more info.
                                    </div>
                                </>
                            )}
                        </div>
                        {prevApproved !== null ||
                        questionChanged ||
                        props.isFull ||
                        lateFull ? (
                            <div className="row fade-in mt-4">
                                <div className="col-10 offset-1">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.reload();
                                        }}
                                        className="btn btn-climate start-again">
                                        Start again
                                    </button>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="container mb-5 info-row">
                            <div className="row">
                                <div className="col-10 text-end">
                                    <img
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .getElementById("info")
                                                .showModal();
                                            document.body.style.overflow =
                                                "hidden";
                                        }}
                                        className="await-help-icon"
                                        src={Help}
                                        alt="Help"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                </CSSTransition>
            </section>
        );
    }
}
function Terms(props) {
    return (
        <div className="terms">
            <div className="container">
                <div className="row terms-row mt-4">
                    <div className="cw-title-green">#ClimateWall</div>
                    <div className="cw-sub-terms">Terms and conditions</div>
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
                        As the #ClimateWall is a shared public space we require
                        you to read and accept the following terms and
                        conditions before you can use this app and participate.
                    </div>
                    <div className="cw-terms-bold mt-4">Lorem ipsum</div>
                    <div className="cw-terms">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Unde ab ex vitae nulla voluptatibus dolorum
                        voluptate nam eos consequatur aliquid. Eligendi hic at
                        itaque dolores facere in nostrum, officiis ipsa.
                    </div>
                    <div className="cw-terms-bold mt-4">Lorem ipsum</div>
                    <div className="cw-terms">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Unde ab ex vitae nulla voluptatibus dolorum
                        voluptate nam eos consequatur aliquid. Eligendi hic at
                        itaque dolores facere in nostrum, officiis ipsa.
                    </div>
                    <div className="cw-terms-bold mt-4">Lorem ipsum</div>
                    <div className="cw-terms">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Unde ab ex vitae nulla voluptatibus dolorum
                        voluptate nam eos consequatur aliquid. Eligendi hic at
                        itaque dolores facere in nostrum, officiis ipsa.
                    </div>
                    <div className="cw-terms-bold mt-4">Lorem ipsum</div>
                    <div className="cw-terms">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Unde ab ex vitae nulla voluptatibus dolorum
                        voluptate nam eos consequatur aliquid. Eligendi hic at
                        itaque dolores facere in nostrum, officiis ipsa.
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
        </div>
    );
}
function Splash() {
    return (
        <div className="floating fade-out">
            <div className="container">
                <div className="row">
                    <div className="col-10 offset-1 mt-4 text-center">
                        <h1 className="cw-sub">Welcome to</h1>
                    </div>
                    <div className="col-10 mt-4 offset-1 text-center">
                        <h1 className="cw-title">#ClimateWall</h1>
                    </div>
                    <div className="col-10 mt-4 offset-1 text-center">
                        <h1 className="cw-sub">Penryn Campus</h1>
                    </div>
                    <div className="col-12 mt-5 text-center">
                        <img
                            className="splash-logo-ex"
                            src={ExeterLogo}
                            alt="University Of Exeter"
                        />
                    </div>
                    <div className="col-12">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
function ThinkingFace() {
    return (
        <div className="thinking mb-3">
            <img className="load" src={Load} alt="Load" />
        </div>
    );
}
function SmilingFace() {
    return <img className="smile" src={Smile} alt="Smile" />;
}
function SadFace() {
    return <img className="sad" src={Sad} alt="Sad" />;
}
/* eslint-disable no-unused-vars */
function Loader() {
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
/* eslint-enable no-unused-vars */
function Error() {
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
