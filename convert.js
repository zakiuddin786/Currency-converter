const axios = require('axios');
const express= require('express');
const dotenv =require('dotenv');

const getExchange=async (fromCurrency,toCurrency)=>{

    try{
    const response=await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');
    const rate=response.data.rates;

    const usd=1/rate[fromCurrency];
    const exchangeRate=usd*rate[toCurrency];

    console.log(exchangeRate);
    return exchangeRate;
    }catch(error)
    {
        return error;
    }
}

const getCountry= async(fromCurrency)=>{
    try{
    const response= await axios.get(`https://restcountries.eu/rest/v2/currency/${fromCurrency}`);
    console.log( response.data.map(country=>country.name));
    }
    catch(error)
    {
        console.log(error.message);
        return error.message;
    }
    //console.log(response.data);
    //console.log(response.data.map(country=>country.name));
}
//getExchange('USDd','INR');

getCountry('usd');
