const app = require('express')();

app.get('/facebook', (req, res) => {
  let qs = req._parsedUrl.query;
  res.redirect('exp://exp.host/@community/with-facebook-auth/+redirect/?' + qs);
});

app.listen(3000);
