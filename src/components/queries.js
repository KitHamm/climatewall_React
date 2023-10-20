import { gql } from "@apollo/client";

export const ADD_RESPONSE = gql`
    mutation addResponse($response: String!, $question: String!) {
        createResponse(data: { response: $response, question: $question }) {
            data {
                id
                attributes {
                    response
                    approved
                }
            }
        }
    }
`;

export const ADD_qRESPONSE = gql`
    mutation addResponse($response: String!, $question: String!) {
        createQRepsonse(data: { response: $response, question: $question }) {
            data {
                id
                attributes {
                    response
                    question
                }
            }
        }
    }
`;

export const QUESTIONS = gql`
    query {
        questions(
            filters: { approved: { eq: true } }
            sort: ["createdAt:asc"]
        ) {
            data {
                attributes {
                    question
                }
            }
        }
    }
`;

export const CURRENT_QUESTION = gql`
    query {
        currentQuestion {
            data {
                attributes {
                    number
                }
            }
        }
    }
`;

export const AWAIT_APPROVAL = gql`
    query response($id: ID) {
        response(id: $id) {
            data {
                attributes {
                    approved
                    reason
                }
            }
        }
    }
`;
