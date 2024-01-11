# ENSNameChecker
A script made for fun while learning JavaScript, used to scrape names from https://ens.domains/ 

This basic script uses the Puppeteer library to scrape https://ens.domains/ for available names. The names are pulled from words.json, which is a compilation of over 58,000 words. (http://www.mieliestronk.com/corncob_lowercase.txt) 

Additionally, the script checks if a name is being auctioned and sends a Discord Webhook whenever an auctioned name or an available name is found alongside the price and auction date.

1/10/23: No longer functional, but decided to open-source as they changed site anyway. This is my first coding project ever, and I made around 0.1E from arbitraging ENS names :) 
