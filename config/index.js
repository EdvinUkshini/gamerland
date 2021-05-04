const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// set up port
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());
// add routes
const router = require('../routes/router');
require("../routes/Product.routes")(app);
require("../routes/Contact.routes")(app);

const db = require("../models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.use('/api', router);

const sqldb = require("../sqlmodels");
sqldb.sequelize.sync();




// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));