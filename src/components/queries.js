import { gql } from "@apollo/client";

export const ADD_WORD = gql`
    mutation addWord($word: String!) {
        createWord(data: { word: $word }) {
            data {
                id
                attributes {
                    word
                    approved
                }
            }
        }
    }
`;

export const ADD_QUESTION = gql`
    mutation addQuestion($question: String!) {
        createQuestion(data: { question: $question }) {
            data {
                id
                attributes {
                    question
                    approved
                }
            }
        }
    }
`;
