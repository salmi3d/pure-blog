require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const posts = require('./api/posts.route')
const app = express()

app.use(cors())
process.env.NODE_ENV !== "production" && app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use('/posts', posts)
app.use('/', (req, res) => {
  const posts = [
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
    view: 'all_posts',
    posts
  })
})
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

app.listen(process.env.PORT)
