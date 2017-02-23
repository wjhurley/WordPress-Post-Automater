require('dotenv').config();

module.exports = {
  wordpress_url: process.env.WORDPRESS_URL,
  wordpress_user: process.env.WORDPRESS_USER,
  wordpress_pass: process.env.WORDPRESS_PASS,
};
