var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var input = require('./node_modules/selenium-webdriver/lib/input'),
    Key = input.Key;

var wordpressURL = process.argv[2];
var userName = process.argv[3];
var userPassword = process.argv[4];
var defaultTimeOut = 20000;
var fixedText = '';
var numberChallenges = 0;

//set timeout for waiting on DOM element
driver.manage().timeouts().implicitlyWait(defaultTimeOut);
driver.manage().timeouts().pageLoadTimeout(defaultTimeOut);
//navigate to Wordpress login page
driver.get(wordpressURL);
//driver.wait(until.titleContains('The Library'), defaultTimeOut);
driver.findElement(By.id('user_login')).sendKeys(userName);
driver.findElement(By.id('user_pass')).sendKeys(userPassword);
driver.findElement(By.id('wp-submit')).click();
//search for the desired posts
driver.findElement(By.xpath('//li[@id="menu-posts"]/a/div[3]')).click();
driver.findElement(By.linkText('All Posts')).click();
driver.findElement(By.id('post-search-input')).sendKeys('©');
driver.findElement(By.id('search-submit')).click();
//scrape the number of search results found
driver.findElement(By.className('displaying-num')).getText().then( function(text) {
  //use search results to determine how many posts to edit
  numberChallenges = Number(text.substring(0, text.indexOf(" ")));
  //loop to run on all posts that meet search criteria
  for(let i = 0; i < numberChallenges; i++) {
    driver.findElement(By.className('row-title')).click();
    driver.findElement(By.className('wp-editor-area')).getText().then( function(text) {
      let copyRegExp = /[©]/g;
      let fixedTextArray = [];
      if(text) {
        fixedText = text.replace(copyRegExp, '&copy;');
        driver.findElement(By.id('content')).clear();
        for(let j = 0; j < fixedText.length; j += 64) {
          driver.findElement(By.id('content')).sendKeys(fixedText.substr(j, Math.min(64, fixedText.length - j)));
        };
      } else {
        console.log('fail -- ' + text);
      }
    });
    driver.wait(until.elementIsEnabled(driver.findElement(By.id('publish'))), defaultTimeOut);
    driver.executeScript('window.scrollTo(0, 0);');
    driver.findElement(By.id('publish')).click();
    //intentionally re-run search because it's needed in the for loop
    driver.findElement(By.linkText('All Posts')).click();
    driver.findElement(By.id('post-search-input')).sendKeys('©');
    driver.findElement(By.id('search-submit')).click();
  }
});
