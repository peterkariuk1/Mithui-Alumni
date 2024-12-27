import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send(`Welcome to Mithiu's server`);
});
app.get('/about', (req,res) => {
    res.status(200).send('This is the about page!');
});

const PORT = 3000;

app.listen(PORT,(req,res) => {
    console.log(`Server is succesfully running on http://localhost:${PORT}`);  
});