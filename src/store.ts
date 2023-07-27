import { makeAutoObservable } from "mobx";
import TestService from './services/TestService'

export default class Store {

    from = 'USD';
    to = 'EUR';
    amount = 1;
    date = '2023-07-21';
    account_id = '7xmedia115714449';
    api_key = '71s7k6b0va1bp4a297bkpmcuvr';
    currencyForLastMonth: Array<any> = [];
    currenciesToConver: Array<any> = [];

    constructor() {
        makeAutoObservable(this);
    }
    
    setFrom = (from: string) => {
        this.from = from;
    }

    setTo = (to: string) => {
        this.to = to;
    }

    setAmount = (amount: number) => {
        this.amount = amount;
    }

    setDate = (date: string) => {
        this.date = date;
    }

    setCurrencyForLastMonth = (currencyForLastMonth: Array<any>) => {
        this.currencyForLastMonth = currencyForLastMonth;
    }

    setCurrenciesToConver = (currenciesToConver: Array<any>) => {
        this.currenciesToConver = currenciesToConver;
    }

    async getCurrenciesToConver() {
        try {
            fetch(`https://openexchangerates.org/api/historical/${this.date}.json?app_id=e5921318867142f2b5d3f2b571f8c4ce&base=${this.from}&symbols=${this.to}`)
            .then(res => res.body?.getReader())
            .then(res => res?.read())
            .then(res => {
                const decoder = new TextDecoder();
                const data = decoder.decode(res?.value);
                this.setCurrenciesToConver(Object.entries(JSON.parse(data).rates));
            })    
            localStorage.setItem('from', this.from);
            localStorage.setItem('to', this.to);
            localStorage.setItem('amount', String(this.amount));
            localStorage.setItem('date', this.date);
        } catch (error) {
            console.log(error);
        }

    }

    async getCurrencyForLastMonth() {
        try {
            fetch(`https://openexchangerates.org/api/time-series.json?app_id=e5921318867142f2b5d3f2b571f8c4ce&base=${this.from}&start=2023-07-01&end=2023-07-03`)
            .then(res => res.body?.getReader())
            .then(res => res?.read())
            .then(res => {
                const decoder = new TextDecoder();
                const data = decoder.decode(res?.value);
                this.setCurrencyForLastMonth(Object.entries(JSON.parse(data).rates));
            })        
        } catch (error) {
            console.log(error);
        }
   
    }

    async getCampaign() {
        try {
            const response = await TestService.getCampaign();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getAdset() {
        try {
            const response = await TestService.getAdset();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getAd() {
        try {
            const response = await TestService.getAd();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}