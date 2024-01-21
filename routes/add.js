const Url = require('./Url')
const router = require('express').Router()
const { readFileSync } = require("fs")
const path = require("path")


router.get("/", async (req, res) => {
    try {
        let html = readFileSync(path.join(__dirname, '../static', 'output.html'), "utf-8")
        return res.send(html)
    } catch (error) {

    }
})

router.post('/add', async (req, res) => {
    try {
        if (!req.body.url) {
            return res.status(400).send({ success: false, error: "Please enter the url" })
        }
        // await sleep(10000)
        let search = [{ url: req.body.url }]
        if (req.body.path) {
            search.push({ random: req.body.path })
        }
        let prev = await Url.find({ $or: search })
        // console.log(prev);
        if (!prev.length) {

            const result = Math.random().toString(36).substring(2, 10);
            let urlShort = await Url.create({
                url: req.body.url,
                random: req.body.path ? req.body.path : result,
            })
            if (urlShort) {
                return res.status(200).send({ success: true, data: {url:urlShort.url,path:urlShort.random} })
            }
            else {
                return res.status(503).send({ success: false, error: "Service Unavailable" })
            }
        }
        else {
            for (i in prev) {
                if (prev[i].url == req.body.url) {
                    return res.status(200).json({success:true,data:{ url: prev[i].url, path: prev[i].random }})
                }
            }
            return res.status(400).send({ success: false, error: "please try another path" })
        }
    } catch (error) {
        return res.status(500).send({ success: false, error: "Internal Server Error" })
    }
})

router.get('/r/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(401).send({ success: false, error: "Invalid url found" })
    }
    let output = await Url.findOne({ random: req.params.id })
    if (!output) {
        return res.status(204).send({ success: false, error: "No record found" })
    }
    res.redirect(output.url)
})

module.exports = router