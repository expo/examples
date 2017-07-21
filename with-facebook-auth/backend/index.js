const app = require('express')();

app.get('/redirect', (req, res) => {
  let qs = req._parsedUrl.query;
  if (process.env.NODE_ENV === 'development') {
    res.redirect('exp://ge-cha.notbrent.app.exp.direct:80/+redirect/?' + qs);
  } else {
    res.redirect('exp://exp.host/@community/with-facebook-auth/+redirect/?' + qs);
  }
});

app.get('/facebook', (req, res) => {
  res.sendFile('facebook.html', {root: __dirname });
});

app.listen(3000);
