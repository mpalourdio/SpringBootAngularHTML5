import { defineConfig } from 'cypress';
import Browser = Cypress.Browser;

const puppeteer = require('puppeteer');

const findPuppeteer: () => Promise<Browser> = async () => {
    const browserPath = puppeteer.executablePath();
    const browser = await puppeteer.launch();
    const version = await browser.version();
    const majorVersion = parseInt(version.split('/')[1]);

    return {
        name: 'chromium',
        family: 'chromium',
        displayName: `Puppeteer - ${version}`,
        version: version,
        majorVersion: majorVersion,
        path: browserPath,
        channel: 'stable',
        isHeaded: false,
        isHeadless: true,
    };
};

export default defineConfig({
    e2e: {
        'baseUrl': 'http://localhost:4200',
        supportFile: false,
        video: false,
        setupNodeEvents: (on, config) => {
            return findPuppeteer().then((browser) => {
                config.browsers.push(browser);
                return config;
            });
        },
    },
});
