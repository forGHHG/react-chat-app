const exporess = require('express');
const router = exporess.Router();

router.get('/', (req, res) => {
    res.send('server is up and running').status(200);
});

module.exports = router;