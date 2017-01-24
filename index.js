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
var searchQuery = process.argv[5];
var replaceText = process.argv[6];
var defaultTimeOut = 30000;
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
driver.findElement(By.id('post-search-input')).sendKeys(searchQuery);
driver.findElement(By.id('search-submit')).click();
//scrape the number of search results found
driver.findElement(By.className('displaying-num')).getText().then( function(text) {
  //use search results to determine how many posts to edit
  numberChallenges = Number(text.substring(0, text.indexOf(" ")));
  //loop to run on all posts that meet search criteria
  for(let i = 0; i < numberChallenges; i++) {
    //click on first result found
    driver.findElement(By.className('row-title')).click();
    //grab the text editor content
    driver.findElement(By.id('content')).getText().then( function(text) {
      if(text && typeof searchQuery === 'string') {
        var count = 0;
        while(text.indexOf(searchQuery, count) !== -1) {
          fixedText = text.replace(searchQuery, replaceText);
          count = text.indexOf(searchQuery, count) + 1;
          //set text to edited version for multiple occurrences of search query in post
          text = fixedText;
        }
        driver.findElement(By.id('content')).clear();
        //loop inserts fixedText into text editor in chunks to avoid error message
        for(let j = 0; j < fixedText.length; j += 64) {
          driver.findElement(By.id('content')).sendKeys(fixedText.substr(j, Math.min(64, fixedText.length - j)));
        };
      } else {
        console.log('fail -- ' + text);
      }
    });
    driver.wait(until.elementIsEnabled(driver.findElement(By.id('publish'))), defaultTimeOut);
    //scroll up the page to make the publish button visible
    driver.executeScript('window.scrollTo(0, 0);');
    driver.findElement(By.id('publish')).click();
    //re-run search to find next post to edit
    driver.findElement(By.linkText('All Posts')).click();
    driver.findElement(By.id('post-search-input')).sendKeys(searchQuery);
    driver.findElement(By.id('search-submit')).click();
  }
});
