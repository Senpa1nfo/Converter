import axios from "axios";

export const API_URL = `https://607d6013-e90f-46b8-8457-587afb165be4.mock.pstmn.io/`;

const $api = axios.create({
    baseURL: API_URL
})

export default $api;