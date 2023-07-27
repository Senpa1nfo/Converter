import $api from "../http";
import {AxiosResponse} from 'axios';
import { Ad, Adset, Campaign } from "../models/TestModel";

export default class AuthService {
    static async getCampaign(): Promise<AxiosResponse<Campaign[]>> {
        return $api.get('/campaign');
    }

    static async getAdset(): Promise<AxiosResponse<Adset[]>> {
        return $api.get('/adset');
    }

    static async getAd(): Promise<AxiosResponse<Ad[]>> {
        return $api.get('/ad');
    }
}