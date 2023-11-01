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
    query response($id: ID) {
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
    query {
        responses(
            filters: { approved: { eq: null } }
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

export const GET_AWAITING = gql`
    query responses {
        responses(filters: { approved: { eq: null } }) {
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
    query responses($updated: DateTime) {
        responses(
            filters: {
                createdAt: { gte: $updated }
                approved: { eq: true }
                onWall: { eq: false }
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

export const ON_WALL = gql`
    query responses($updated: DateTime) {
        responses(
            filters: {
                createdAt: { gte: $updated }
                approved: { eq: true }
                onWall: { eq: true }
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
