const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createStop,
  getAllStops,
  getSingleStop,
  updateStop,
  deleteStop,
} = require('../controllers/stopController');

router.route('/').get(getAllStops);

router
  .route('/:id')
  .post(authenticateUser, createStop)
  .get(getSingleStop)
  .patch([authenticateUser, authorizePermissions('admin')], updateStop)
  .delete([authenticateUser, authorizePermissions('admin')], deleteStop);

module.exports = router;
