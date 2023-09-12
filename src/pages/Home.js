import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION, ADD_WORD } from "../components/queries";

export default function Home() {
    const [question, setQuestion] = useState("");
    const [word, setWord] = useState("");
    /* eslint-disable no-unused-vars */
    const [
        addWord,
        { loading: loadingWord, error: errorWord, data: dataWord },
    ] = useMutation(ADD_WORD, { variables: { word: word } });
    const [
        addQuestion,
        { loading: loadingQuestion, error: errorQuestion, data: dataQuestion },
    ] = useMutation(ADD_QUESTION, { variables: { question: question } });
    /* eslint-enable no-unused-vars */

    function handleAddWord(e) {
        e.preventDefault();
        addWord();
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }
    function handleAddQuestion(e) {
        e.preventDefault();
        addQuestion();
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }

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
                <section id="add-question">
                    <div className="row mt-5 text-center">
                        <div className="col-12">
                            <h5>
                                Would you like to add your own statement or
                                question?
                            </h5>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mt-3">
                            <input
                                type="text"
                                placeholder="Add a new question"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setQuestion(e.target.value);
                                }}
                            />
                        </div>
                        <div className="text-center">
                            <div className="col-12">
                                <button
                                    className="btn btn-success"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAddQuestion(e);
                                    }}>
                                    Add Question
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="add-word">
                    <div className="row mt-5 text-center">
                        <div className="col-12">
                            <h5>Would you like to add your own word?</h5>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mt-3">
                            <input
                                type="text"
                                placeholder="Add a new word"
                                onChange={(e) => {
                                    setWord(e.target.value);
                                }}
                            />
                            <div className="text-center">
                                <div className="col-12">
                                    <button
                                        className="btn btn-success"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddWord(e);
                                        }}>
                                        Add Word
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
