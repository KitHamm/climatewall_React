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
        createQRepsonse(
            data: { response: $response, question: $question, from: Web }
        ) {
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
                    updatedAt
                }
            }
        }
    }
`;

export const AWAIT_APPROVAL = gql`
    query await_approval($id: ID) {
        response(id: $id) {
            data {
                attributes {
                    approved
                    onWall
                    reason
                }
            }
        }
    }
`;

export const QUEUE_AWAIT_APPROVAL = gql`
    query queue_await_approval($updated: DateTime, $question: String) {
        responses(
            filters: {
                approved: { eq: null }
                createdAt: { gte: $updated }
                question: { eq: $question }
            }
            sort: ["updatedAt:asc"]
        ) {
            data {
                id
                attributes {
                    approved
                }
            }
        }
    }
`;

export const ON_WALL = gql`
    query on_wall($updated: DateTime, $question: String) {
        responses(
            filters: {
                createdAt: { gte: $updated }
                approved: { eq: true }
                onWall: { eq: true }
                question: { eq: $question }
            }
        ) {
            data {
                id
                attributes {
                    question
                    response
                    approved
                    onWall
                    createdAt
                }
            }
        }
    }
`;

export const GET_AWAITING = gql`
    query get_awaiting($updated: DateTime, $question: String) {
        responses(
            filters: {
                approved: { eq: null }
                question: { eq: $question }
                createdAt: { gte: $updated }
            }
            sort: ["createdAt:asc"]
        ) {
            data {
                id
                attributes {
                    response
                    createdAt
                    approved
                    question
                }
            }
        }
    }
`;

export const QUEUE_AWAIT_WALL = gql`
    query queue_await_wall($updated: DateTime, $question: String) {
        responses(
            filters: {
                updatedAt: { gte: $updated }
                approved: { eq: true }
                onWall: { eq: false }
                question: { eq: $question }
            }
            sort: ["updatedAt:asc"]
        ) {
            data {
                id
                attributes {
                    question
                    response
                    approved
                    onWall
                    updatedAt
                }
            }
        }
    }
`;
