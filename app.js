const axios = require('axios');
const cheer = require('cheerio');

let args = process.argv.slice(2)
let isStart = true;
let stockName = '';

if(args.length > 0) {
    axios.get('https://codequiz.azurewebsites.net', {
        headers: {
            Cookie: "hasCookie=true"
        }
    }).then(async (res) => {
        const $ = await cheer.load(res.data);
        $('body > table > tbody > tr').each((index, element) => {
            stockName = $($(element).find('td')[0]).text();

            if(stockName.toLowerCase().trim() === args[0].toLowerCase().trim())
                console.log($($(element).find('td')[1]).text());


        });

    });

} else {
    console.log('Please Provide Stock Name')
}
