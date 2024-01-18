// Holding state for after a response has been submitted

// Apollo imports
import { useQuery } from "@apollo/client";
// react imports
import { useState, useEffect } from "react";
// Library imports
import { CSSTransition } from "react-transition-group";
// gql query imports
import {
    QUESTIONS,
    CURRENT_QUESTION,
    QUEUE_AWAIT_APPROVAL,
    QUEUE_AWAIT_WALL,
    ON_WALL,
    AWAIT_APPROVAL,
} from "./queries";
// component imports
import Error from "./Error";
import SadFace from "./SadFace";
import SmilingFace from "./SmilingFace";
import ThinkingFace from "./ThinkingFace";
import Help from "../images/help-button.svg";

export default function AwaitApproval(props) {
    // States
    // response approved
    const [approved, setApproved] = useState(null);
    const [prevApproved, setPrevApproved] = useState(null);
    // the question changed
    const [questionChanged, setQuestionChanged] = useState(false);
    // response is on the projection wall
    const [onWall, setOnWall] = useState(false);
    // position in queue
    const [totalPosition, setTotalPosition] = useState(10);
    const [queueLength, setQueueLength] = useState(0);
    const [place, setPlace] = useState(0);
    const [prevWallPlace, setPrevWallPlace] = useState(0);
    const [wallPlace, setWallPlace] = useState(0);
    const [dataLength, setDataLength] = useState(0);
    // transition state
    const [transition, setTransition] = useState(true);
    // the wall is full while waiting
    const [lateFull, setLateFUll] = useState(false);
    /* eslint-disable no-unused-vars */

    // queries for holding states
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
    // set queue place and check if question has changed while waiting
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
    // set queue place
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
            // set queue place for appearing on the projection wall
            if (
                dataLength !== wallData.responses.data.length &&
                awaitData.response.data.attributes.approved === true
            ) {
                for (let i = 0; i < wallData.responses.data.length; i++) {
                    if (wallData.responses.data[i].id === props.id) {
                        setWallPlace(i + 1);
                        break;
                    } else {
                        setWallPlace(0);
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
    /*eslint-disable react-hooks/exhaustive-deps*/
    useEffect(() => {
        if (onWallData) {
            if (wallPlace !== prevWallPlace) {
                if (
                    onWallData.responses.data.length + wallPlace >
                    props.maxNum
                ) {
                    setLateFUll(true);
                    stopPolling();
                    stopPollingQueue();
                    stopPollingWall();
                    stopPollingWallData();
                    stopPollingQID();
                    stopPollingQuestion();
                }
                setPrevWallPlace(wallPlace);
            }
        }
    }, [wallPlace]);
    /*eslint-enable react-hooks/exhaustive-deps*/
    if (awaitLoading || queueLoading || wallLoading || onWallLoading) return "";
    if (awaitError || queueError || wallError || onWallError) return <Error />;
    if (place !== 0) {
        // displays for holding states and changes
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
                                    {lateFull ? (
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
                                    {lateFull ? (
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
