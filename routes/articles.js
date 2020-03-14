const express = require('express')
const router = express.Router()

router.get('/add', (req, res) => {
  res.render('layout', {
    view: 'upsert_article'
  })
})

router.post('/', (req, res) => {

})

module.exports = router
