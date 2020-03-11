const axios = require('axios');

const getExchange=async (fromCurrency,toCurrency)=>{

    const response=await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');

    const rate=response.data.rates;
    const actualRate=1/rate[fromCurrency];
    const exchangeRate=(actualRate*rate[toCurrency]);
    //console.log(exchangeRate);

    if(isNaN(exchangeRate)){
        throw new Error(`error occurred unable to convert ${fromCurrency} and ${toCurrency}`);
    }
    return exchangeRate;
}

const getCountry= async(fromCurrency)=>{
    try{
    const response= await axios.get(`https://restcountries.eu/rest/v2/currency/${fromCurrency}`);
    
    //console.log( response.data.map(country=>country.name));
    console.log(response.data);
    return response.data.map(country=>country.name);
    }
    catch(error)
    {
        console.log(error.message);
        return error.message;
    }
    //console.log(response.data);
    //console.log(response.data.map(country=>country.name));
}

const convertCurrencyUsingName =async(fromcountry,toCountry,amount)=>{
    try{
    const country1=await axios.get(`https://restcountries.eu/rest/v2/name/${fromcountry}`);
    //console.log(country1.data.map(currency=>currency.currencies));
    var data=country1.data.map(currency=>currency.currencies);
    console.log(data[0]);
   

    const country2=await axios.get(`https://restcountries.eu/rest/v2/name/${toCountry}`);
    console.log(country2.data.map(currency=>currency.currencies));
    }catch(error)
    {
        return error;
    }


}
//getCountry('INR');

convertCurrencyUsingName('iran','india');
const convertCurrencyUsingCode=async(fromCurrency,toCurrency,amount)=>{
    fromCurrency= fromCurrency.toUpperCase(fromCurrency);
    toCurrency= toCurrency.toUpperCase(toCurrency);
    const countries=await getCountry(toCurrency);
    const exchangeRate= await getExchange(fromCurrency,toCurrency);
    const AmountConverted= (amount*exchangeRate).toFixed(2);

    console.log( `${amount} ${fromCurrency} is worth ${AmountConverted} ${toCurrency} and can be used in the following countries: ${countries}`);

}

// convertCurrency('inr','usd',56).then((message)=>{
//     console.log(message);
// }).catch((error)=>{
//     console.log(error.message);
// });


//getCountry('usd');
