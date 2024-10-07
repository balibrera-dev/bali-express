const Route = require('../models/Route');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createRoute = async (req, res) => {
  req.body.user = req.user.userId;
  const route = await Route.create(req.body);
  res.status(StatusCodes.CREATED).json({ route });
};
// const getAllRoutes = async (req, res) => {
//   const routes = await Route.find({});

//   res.status(StatusCodes.OK).json({ routes, count: routes.length });
// };
const getAllRoutes = async (req, res) => {
  console.log(req.user.userId);

  const routes = await Route.find({ user: req.user.userId }); //.populate('stops'); not sure if needed for the view

  if (!routes) {
    throw new CustomError.NotFoundError(`No route for user : ${req.user}`);
  }

  res.status(StatusCodes.OK).json({ routes, count: routes.length });
};
const getSingleRoute = async (req, res) => {
  const { id: routeId } = req.params;

  const route = await Route.findOne({ _id: routeId }).populate('stops');

  if (!route) {
    throw new CustomError.NotFoundError(`No route with id : ${routeId}`);
  }

  res.status(StatusCodes.OK).json({ route });
};
const updateRoute = async (req, res) => {
  const { id: routeId } = req.params;

  const route = await Route.findOneAndUpdate({ _id: routeId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!route) {
    throw new CustomError.NotFoundError(`No route with id : ${routeId}`);
  }

  res.status(StatusCodes.OK).json({ route });
};
const deleteRoute = async (req, res) => {
  const { id: routeId } = req.params;

  const route = await Route.findOne({ _id: routeId });

  if (!route) {
    throw new CustomError.NotFoundError(`No route with id : ${routeId}`);
  }

  await route.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Route removed.' });
};

module.exports = {
  createRoute,
  getAllRoutes,
  getSingleRoute,
  updateRoute,
  deleteRoute,
};
