const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createRoute,
  getAllRoutes,
  getSingleRoute,
  updateRoute,
  deleteRoute,
  uploadImage,
} = require('../controllers/routeController');

const { getAllRouteStops } = require('../controllers/stopController');

router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createRoute)
  .get([authenticateUser, authorizePermissions('admin')], getAllRoutes);

router
  .route('/:id')
  .get(getSingleRoute)
  .patch([authenticateUser, authorizePermissions('admin')], updateRoute)
  .delete([authenticateUser, authorizePermissions('admin')], deleteRoute);

router.route('/:id/stops').get(getAllRouteStops);

module.exports = router;
