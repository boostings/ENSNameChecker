const puppeteer = require('puppeteer');
const fs = require('fs');
const async = require('async');
const axios = require('axios');
const moment = require('moment');

let browser;

function convertTimestamp(timestamp) {
    let value = moment(timestamp, 'YYYY.MM.DD at HH:mm (UTCZ)').valueOf();
    value = value / 1000;
    return value;
}

async function init() {
    browser = await puppeteer.launch({headless: true});
}

async function checkENS(name, auctionData) {
    try {

        const page = await browser.newPage();
        await page.goto(`https://app.ens.domains/name/${name}.eth/register`);
        await page.waitForTimeout(3500);
        const html = await page.content();

        if (html.includes("This name has a temporary premium.")) {
            const price = await page.evaluate(() => {
                const priceNode = document.evaluate('/html/body/div[1]/div/main/div[2]/div[2]/div[3]/div/div[1]/text()[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                return priceNode.singleNodeValue.textContent;
            });
            console.log(`${name}.eth is currently being auctioned for ${price}!`);
            let auctionData = {};
            auctionData.time = convertTimestamp(await page.$eval('#root > div > main > div.css-134wjq.enrkab30 > div.css-19lgokg.eo8b4f50 > div.css-18o4zck.eo8b4f51 > div.css-15q0oyv.enmae6q0 > div.css-119bwle.enmae6q3 > div.css-81mxgz.enmae6q5', el => el.textContent));
            auctionData.timestamp = await page.$eval('#root > div > main > div.css-134wjq.enrkab30 > div.css-19lgokg.eo8b4f50 > div.css-18o4zck.eo8b4f51 > div.css-15q0oyv.enmae6q0 > div.css-119bwle.enmae6q3 > div.css-81mxgz.enmae6q5', el => el.textContent);
            auctionData.price = price;
            const daysLeft = await page.evaluate(() => document.querySelector("#root > div > main > div.css-134wjq.enrkab30 > div.css-19lgokg.eo8b4f50 > div.css-18o4zck.eo8b4f51 > div.css-1lfzuwt.e1ric6it0 > div:nth-child(2) > span:nth-child(2)").textContent);
            console.log(`Auction for ${name}.eth ends in ${daysLeft} at ${auctionData.timestamp} with a price of ${auctionData.price}.`);
await sendWebhook(name, 'auctioned', auctionData);

        } else if (html.includes("Registering a name requires you to complete 3 steps")) {
        console.log(`${name}.eth was found!`);
        await sendWebhook(name, 'available');
        } else if (html.includes("registered")) {
        console.log(`${name}.eth isn't available`);
        } else {
        console.log(`Timeout error on ${name}.eth`);
        }
    await page.close();
} catch (err) {
console.log(`Error checking ${name}.eth: ${err}`);
    }
}

async function sendWebhook(name, status, auctionData) {
    try {
        const webhookUrl = "https://canary.discord.com/api/webhooks/1066665250147024896/RhPH_OQbdj7TL8vmkiAMKf-EG1c81ipIeTnpI8sl7cCmmqhbKn-fdD7YvrYrZj1MTy0B";
        let message;
        if (status === 'available') {
            message = `[${name}.eth](https://app.ens.domains/name/${name}.eth/register) was found!`;
        } else if (status === 'auctioned') {
            message = `[${name}.eth](https://app.ens.domains/name/${name}.eth/register.eth) is currently being auctioned! The auction ends on: <t:${auctionData.time}>, or <t:${auctionData.time}:R> for ⧫ ${auctionData.price} ETH.`;
        }
        const data = { content: message };
        await axios.post(webhookUrl, data);
        console.log(`Successfully sent webhook for ${name}.eth, status: ${status}...`);
    } catch (err) {
        console.log(`Error sending webhook for ${name}.eth: ${err}`);
    }
}

(async () => {
    await init();
    const words = JSON.parse(fs.readFileSync('emojis.json', 'utf-8'));
    for (let i = 0; i < words.length; i++) {
        if (words[i].length < 3) {
            console.log(`${words[i]}.eth isn't a claimable name, skipping....`);
        } else {
            await checkENS(words[i]);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    const nameAvailability = checkNameAvailability(name);

if (nameAvailability === 'available') {
} else if (nameAvailability === 'unavailable') {
} else if (nameAvailability === 'auction') {

}

tab.close();


    await browser.close();
})()
