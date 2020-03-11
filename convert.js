const axios = require('axios');
const express= require('express');
const dotenv =require('dotenv');

const getExchange=async (fromCurrency,toCurrency)=>{
    const response=await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');
    // const rate=response.
    console.log(response);
}
getExchange('USD','INR');
