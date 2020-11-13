// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter, StacktraceOption} = require('jasmine-spec-reporter');
const chromeExecutablePath = require('puppeteer').executablePath();

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        binary: chromeExecutablePath,
        args: [
          '--headless',
          '--no-sandbox',
          '--disable-gpu',
          // To make sure we have a form factor that's not a phone
          '--window-size=2000,1000',
          '--disable-browser-side-navigation',
          '--disable-extensions',
          '--disable-dev-shm-usage',
        ],
      },
    },
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: [
          '--headless',
        ],
      },
    },
  ],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {
    }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
  }
};
