require("dotenv").config();

const express = require("express");
const cors = require("cors");
const uniqid = require("uniqid")
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/product-route")

// Middleware Import
const notFoundMiddleware = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const multer = require("multer");

// Middleware
app.use(express.static('./public'))
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({
// 	extended: false,
// 	limit: 10000,
// 	parameterLimit: 5
// }))

const storage = multer.diskStorage({
	destination: function(req,file,callback) {
		callback(null,__dirname + '/public/images')
	},
	filename: function(req,file,callback) {
		const regex = new RegExp('[^.]+$');
    const extension = file.originalname.match(regex);
		const filename = `${uniqid()}.${extension}`;
		callback(null,filename)
	}
})

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 2097152,	//2 Mb
	}
})

app.use(upload.single("image"));

app.get("/", (req, res) => {
	res.send("<h1>crud app </h1>");
});

app.use('/api/products', productsRouter)

//Error Handler

app.use(notFoundMiddleware)
app.use(errorHandler)


const port = process.env.PORT || 4445;

const start = async () => {
	try {
    //connectDB
    await connectDB(process.env.MONGO_URL);
		app.listen(port, console.log(`server is listening  port ${port}`));
	} catch (error) {
		console.log(error);
	}
};

start();
