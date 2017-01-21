# WordPress Post Automater
Selenium WebDriver application for automating WordPress post edits.
## Getting Started
**This will only set up Selenium WebDriver for Chrome on Windows. Please see the official [SeleniumHQ website](http://www.seleniumhq.org/) for help with other browsers and operating systems.**

Prerequisite: [Node.js](https://nodejs.org/en/) must be installed.

1. Create a project folder on your computer.
2. Clone this repository or fork and clone your forked repository to the project folder.
3. Navigate to the new wordpress-post-automater folder and open a Command Line.
4. From the terminal run: `npm install` to install dependencies.
5. Once installation is complete, go to [https://sites.google.com/a/chromium.org/chromedriver/downloads](https://sites.google.com/a/chromium.org/chromedriver/downloads) to download the latest version of ChromeDriver.
6. Once downloaded, open the zip file and extract to the wordpress-post-automater folder.
7. Running the application requires 4 arguments:

| `wordpressURL` | The admin login page for your WordPress site (../wp-login.php)        |
| `userName`     | The admin user name for your WordPress site                           |
| `userPassword` | The admin password for your WordPress site                            |
| `searchQuery`  | The string you want to search for and replace in your WordPress posts |
8. The terminal command will look like this:
```Shell
node index.js wordpressURL userName userPassword searchQuery
```
Additional Selenium WebDriver documentation can be found [here](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html).
