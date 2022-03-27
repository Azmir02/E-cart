import express from "express";
import Pslide from "../Controller/Pslide.js";

const Pslider = express.Router()



Pslider.get('/pslide',Pslide)

export default Pslider