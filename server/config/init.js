module.exports = {
  initializeDB: async () => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
  },
  corsOptions: {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  },
  // cors: async (req, res, next) => {
  //     res.header("Access-Control-Allow-Origin", "*");
  //     res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  //     );
  //     if (req.method === "OPTIONS") {
  //     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  //     return res.status(200).json({});
  //     }
  //     next();
  // }
};
