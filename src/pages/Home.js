import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useQuery } from "@apollo/client";
import {
    QUESTIONS,
    CURRENT_QUESTION,
    GET_MAX_NUM_RESPONSES,
} from "../components/queries";

import InfoPage from "../components/Info";
import Landing from "../components/Landing";
import Form from "../components/Form";
import AwaitApproval from "../components/AwaitApproval";
import Terms from "../components/Terms";
import Error from "../components/Error";
import Splash from "../components/Splash";

export default function Home() {
    const [closed, setClosed] = useState(false);
    const [transition, setTransition] = useState(true);
    const [view, setView] = useState(0);
    const [selectView, setSelectView] = useState(0);
    const [id, setId] = useState(0);
    const [maxNum, setMaxNum] = useState(0);
    const [isFull, setIsFull] = useState(false);
    const [questionUpdated, setQuestionUpdated] = useState("");
    const { loading, error, data } = useQuery(QUESTIONS);
    const {
        loading: loadingQID,
        error: errorQID,
        data: dataQID,
    } = useQuery(CURRENT_QUESTION);
    const {
        loading: loadingMaxNum,
        error: errorMaxNum,
        data: dataMaxNum,
    } = useQuery(GET_MAX_NUM_RESPONSES);
    function handleChangeView(newView) {
        setSelectView(newView);
    }
    useEffect(() => {
        var dateNow = new Date();
        if (dateNow.getHours() < 16 || dateNow.getHours() >= 21) {
            setClosed(true);
        }
    }, [setClosed]);
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
    useEffect(() => {
        if (dataMaxNum) {
            setMaxNum(dataMaxNum.maxResponse.data.attributes.amount);
        }
    }, [dataMaxNum]);
    let display = null;
    if (loading || loadingQID || loadingMaxNum) return <Splash />;
    if (error || errorQID || errorMaxNum) return <Error />;
    if (data && dataQID && dataMaxNum) {
        switch (view) {
            case 0:
                display = (
                    <>
                        <Landing
                            closed={closed}
                            onViewChange={handleChangeView}
                        />
                    </>
                );
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
                                        maxNum={maxNum}
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
                                    maxNum={maxNum}
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
