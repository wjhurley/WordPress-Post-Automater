#WordPress Post Automater
Selenium WebDriver application for automating WordPress post edits.
## Getting Started
**This will only set up Selenium WebDriver for Chrome on Windows. Please see the official [SeleniumHQ website](http://www.seleniumhq.org/) for help with other browsers and operating systems.**

Prerequisite: [Node.js](https://nodejs.org/en/) must be installed.

####1. Create a project folder on your computer.
####2. Clone this repository or fork and clone your forked repository to the project folder.
####3. Navigate to the new wordpress-post-automater folder and open a Command Line.
####4. From the terminal run: `npm install` to install the selenium-webdriver, dotenv, and chromedriver dependencies.
####5. Add your WordPress admin URL (ends in /wp-login.php), user name, and password to the `.env` file.
```
WORDPRESS_URL=http://**********/wp-login.php
WORDPRESS_USER=wj******
WORDPRESS_PASS=pass******
```
####6. Running the application requires 2 arguments:
| Argument       | Description                                                           |
|----------------|-----------------------------------------------------------------------|
| `searchQuery`  | The string you want to search for in your WordPress posts             |
| `replaceText`  | The string you want to replace `searchQuery` in your WordPress posts  |
####7. The terminal command will look like this:
```
node index.js searchQuery replaceText
```
Additional Selenium WebDriver documentation can be found [here](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html).
