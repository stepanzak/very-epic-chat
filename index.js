const express = require('express')
const app = express()
let messages = ['Welcome in my epic chat app']
app.use(express.json());
let jumpscare = false

app.get(/^\/$/, (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html')
})

app.get('/frontend.js', (req, res) => {
    console.log('sending frontend.js')
    res.sendFile(__dirname + '/frontend.js')
})

app.get('/messages', (req, res) => {
    res.send({messages, jumpscare})
})

app.post('/messages', (req, res) => {
    console.log('received message ' + req.body.message)
    messages.push(req.body.message)
    if (messages.length > 11) messages.shift()
    if (req.body.message === '**děsivé**') {
        jumpscare = true
        console.log(`jumpscare set to ${jumpscare}`)
        setTimeout(() => {jumpscare = false}, 5000)
    }
    res.send('ok')
})

app.listen(3000, () => {console.log('listening on port 3000')})