import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CSSTransition } from "react-transition-group";
import Help from "../images/help-button.svg";
import {
    GET_AWAITING,
    QUEUE_AWAIT_WALL,
    ON_WALL,
    ADD_RESPONSE,
    ADD_qRESPONSE,
} from "./queries";
import Error from "./Error";

export default function Form(props) {
    const [response, setResponse] = useState("");
    const [transition, setTransition] = useState(true);
    const [view, setView] = useState(0);
    const [selectView, setSelectView] = useState(0);
    var ranges = [
        "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
        "\ud83d[\udc00-\ude4f]",
        "\uD83D[\uDC00-\uDFFF]", // U+1F400 to U+1F64F
        "\ud83d[\ude80-\udeff]",
        "[\uE000-\uF8FF]",
        "\uD83C[\uDC00-\uDFFF]",
        "[\u2580-\u27BF]",
        "\uD83E[\uDD10-\uDDFF]",
        // U+1F680 to U+1F6FF
    ];

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
                props.maxNum
            ) {
                setView(2);
                setSelectView(2);
                props.setIsFull(true);
            } else if (
                onWallData.responses.data.length +
                    awaitWallData.responses.data.length +
                    nullData.responses.data.length >=
                props.maxNum
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
                                            setResponse(
                                                e.target.value.replace(
                                                    new RegExp(
                                                        ranges.join("|"),
                                                        "g"
                                                    ),
                                                    ""
                                                )
                                            );
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
