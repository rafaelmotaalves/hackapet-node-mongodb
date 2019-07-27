let express = require("express")
let router = express.Router()
let dvdModel = require("../models/dvd")

router.get("/", async function (req, res) {
    let yearFilter = req.query.year

    try {
        let resultDvds = []
        if (yearFilter) {
            resultDvds = await dvdModel.getDvdsFromYear(yearFilter)
        } else {
            resultDvds = await dvdModel.getAllDvds()
        }
    
        res.send(resultDvds)
    } catch (err) {
        res.status(500).send({ message: "Server error" })
    }
})

router.get("/:dvdId", async function (req, res) {
    let id = req.params.dvdId
    try {

        let resultDvd = await dvdModel.findDvdById(id) 

        if (resultDvd) {
            res.send(resultDvd)
        } else {
            res.status(404).send({ message: "Did not found a dvd with that id." })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server error" })
    }

})

router.post("/", async function (req, res) {
    let body = req.body

    try {
        if (body.title && body.year) {
    
            let newDvd = await dvdModel.createDvd(body)
    
            res.send(newDvd)
        } else {
            res.status(400).send({ message: "Must provide a valid dvd" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Server error" })
    }
})

router.put("/:dvdId", async function (req, res) {
    try {
        let id = req.params.dvdId
        let body = req.body
    
        if (body.title && body.year) {
            let updatedDvd = await dvdModel.updateDvd(id, body);
    
            if (updatedDvd) {
                res.send(updatedDvd)
            } else {
                res.status(404).send({ message: "Did not found a dvd with that id." })
            }
        } else {
            res.status(404).send({ message: "Did not found a dvd with that id." })
        }

    } catch (err) {
        res.status(500).send({ message: "Server error" })
    }
})

router.delete("/:dvdId", async function (req, res) {
    try {
        let id = req.params.dvdId
    
        let deletedDvd = await dvdModel.deleteDvd(id)
    
        if (deletedDvd) {
            res.send(deletedDvd)
        } else {
            res.status(404).send({ message: "Did not found a dvd with that id." })
        }
    } catch (err) {
        res.status(500).send({ message: "Server error" })
    }

})

router.put("/:dvdId/rent", async function (req, res) {
    try {
        let id = req.params.dvdId
        let userName = req.body.userName
    
        let rentedDvd = await dvdModel.rentDvd(id, userName)
    
        if (rentedDvd) {
            res.send(rentedDvd)
        } else {
            res.status(404).send({ message: "Did not found a dvd with that id." })
        }
        
    } catch (error) {
        res.status(500).send({ message: "Server error" })
    }
})


router.put("/:dvdId/return", async function (req, res) {
    try {
        let id = req.params.dvdId
        let userName = req.body.userName
    
        let returnedDvd = await dvdModel.returnDvd(id, userName)
    
        if (returnedDvd) {
            res.send(returnedDvd)
        } else {
            res.status(404).send({ message: "Did not found a dvd with that id." })
        }
        
    } catch (error) {
        res.status(500).send({ message: "Server error"})
    }
})

module.exports = router;