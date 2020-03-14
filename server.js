require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
  const articles = [
    {
      title: 'Test article',
      createdAt: new Date(),
      description: 'Test desc'
    },
    {
      title: 'Test article2',
      createdAt: new Date(),
      description: 'Test desc2'
    }
  ]
  res.render('layout', {
    view: 'all_articles',
    articles
  })
})

app.listen(process.env.PORT)
