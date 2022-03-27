import express from 'express'
import slugcontroller from '../Controller/Slugcontroller.js'

const slugroute = express.Router()

slugroute.get('/:slug',slugcontroller)


export default slugroute