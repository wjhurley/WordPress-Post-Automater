var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var input = require('./node_modules/selenium-webdriver/lib/input'),
    Key = input.Key;

var fixedText = '';

driver.get('http://www.testurl.com');
driver.wait(until.titleContains('The Library'), 1000);
driver.findElement(By.id('user_login')).sendKeys('userName');
driver.findElement(By.id('user_pass')).sendKeys('password');
driver.findElement(By.id('wp-submit')).click();
driver.findElement(By.partialLinkText('Posts')).click();
driver.findElement(By.id('post-search-input')).sendKeys('©');
driver.findElement(By.id('search-submit')).click();
driver.findElement(By.className('row-title')).click();
//editorContents = editorContents.replace('©', '&copy;');
driver.findElement(By.className('wp-editor-area')).getText().then( function(text) {
  let copyRegExp = /[©]/g;
  if(text) {
    fixedText = text.replace(copyRegExp, '&copy;');
    return driver.findElement(By.className('wp-editor-area')).sendKeys(Key.chord(Key.CONTROL, 'a'), fixedText);
  } else {
    console.log('fail -- ' + text);
  }
});
driver.wait(until.elementIsEnabled(driver.findElement(By.id('publish'))), 15000).then( function(isEnabled) {
  driver.findElement(By.id('publish')).click();
});
