import express from 'express';
import path from 'path'
const app = express()

app.get('/videocall', (req, res) => {
    res.send('Hello World Video Call')
})

app.use('/sfu', express.static(path.join(__dirname, 'public')))

export default app;
