const { StatusCodes } = require("http-status-codes")

const errorHandler = (err,req,res,next) => {
  console.log(err);
  res.status(500).json({msg:err});
}

module.exports = errorHandler;