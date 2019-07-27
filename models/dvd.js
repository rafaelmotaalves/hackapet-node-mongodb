let mongoose = require("mongoose")

let dvdSchema = mongoose.Schema({
    title: String,
    year: Number,
    rent: {
        status: { type: Boolean, default: false },
        renter: { type: String, default: null }
    }
})

let Dvd = mongoose.model("Dvd", dvdSchema)

function getAllDvds () {
    return Dvd.find({})
}

function getDvdsFromYear (year) {
    return Dvd.find({ year: year })
}

function findDvdById (id) {
    return Dvd.findById(id)
}


function createDvd (dvdInfo) {
    let newDvd = {
        title: dvdInfo.title,
        year: dvdInfo.year,
        rent: {
            status: false,
            renter: ""
        }
    }

    return Dvd.create(newDvd)
}

function updateDvd (id, dvdInfo) {
    return Dvd.findByIdAndUpdate(id, dvdInfo)
}

function deleteDvd (id) {
    return Dvd.findByIdAndRemove(id)
}

async function rentDvd (id, userName) {
    let dvdTobeRented = await Dvd.findById(id)

    if (!dvdTobeRented.rent.status) {
        dvdTobeRented.rent.status = true
        dvdTobeRented.rent.userName = userName

        return dvdTobeRented.save()
    }

    return null
}

async function returnDvd (id) {
    let dvdTobeRented = await Dvd.findById(id)

    if (dvdTobeRented.rent.status) {
        dvdTobeRented.rent.status = false
        dvdTobeRented.rent.userName = null

        return dvdTobeRented.save()
    }

    return null
}

module.exports = {
    getAllDvds,
    findDvdById,
    updateDvd,
    deleteDvd,
    createDvd,
    getDvdsFromYear,
    rentDvd,
    returnDvd
}