const Url = require('./Url')
const router = require('express').Router()

router.post('/add', async (req, res) => {
    try {
        if (!req.body.url) {
            return res.status(400).send({ success: false, error: "Please enter the url" })
        }
        let search = [{ url: req.body.url }]
        if (req.body.profile) {
            search.push({ random: req.body.profile })
        }
        let prev = await Url.find({ $or: search })
        console.log(prev.length);
        if (!prev.length) {

            const result = Math.random().toString(36).substring(2, 10);
            let urlShort = await Url.create({
                url: req.body.url,
                random: result,
            })
            if (urlShort) {
                return res.status(200).send({ success: true, data: urlShort })
            }
            else {
                return res.status(503).send({ success: false, error: "Service Unavailable" })
            }
        }
        else {
                return res.status(500).send({success:false,prev,error:"please another"})
            }
    } catch (error) {
        return res.status(500).send({ success: false, error: "Internal Server Error" })
    }
})


router.get('/r/:id',async(req,res)=>{
    if(!req.params.id){
        return res.status(401).send({success:false,error:"Invalid url found"})
    }
    let output = await Url.findOne({random:req.params.id})
    if (!output){
        return res.status(204).send({success:false,error:"No record found"})
    }
    res.redirect(output.url)
})

module.exports = router