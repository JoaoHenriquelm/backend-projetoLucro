import express from "express";
import cors from "cors"
import dotenv from 'dotenv'

dotenv.config()


import userRouter from './routers/user.routes'
import tokenRouter from './routers/token.routes'
import profitRouter from './routers/profit.routes'
import cookieParser from "cookie-parser";

const whiteList = [
	'https://projetolucro.testedominiojoao.shop',
	process.env.APP_URL
]


const corsOptions = {
	origin: function (origin, callback) {
	  if(whiteList.indexOf(origin) !== -1 || !origin) {
		callback(null, true) 
	  } else {
		callback(new Error('Not allowed by CORS'))
	  }
	},
	credentials: true
}

class App {
	constructor() {
		this.app = express()
		this.middlewares();
		this.routes()
	}

	middlewares() {
		this.app.use(cors(corsOptions))
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(express.json())
		this.app.use(cookieParser())
	}

    routes() {
		this.app.use('/register/', userRouter)
		this.app.use('/login/', tokenRouter)
		this.app.use('/profit/', profitRouter)
    }
}

export default new App().app;
