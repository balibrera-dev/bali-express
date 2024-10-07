const Stop = require('../models/Stop');
const Route = require('../models/Route');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const createStop = async (req, res) => {
  const { id } = req.params;
  req.body.route = id;
  const isValidRoute = await Route.findOne({ _id: id });

  if (!isValidRoute) {
    throw new CustomError.NotFoundError(
      id == undefined
        ? 'Route is not defined for this stop'
        : `No route with id : ${id}`
    );
  }

  // const alreadySubmitted = await Stop.findOne({
  //   route: routeId,
  //   user: req.user.userId,
  // });

  // if (alreadySubmitted) {
  //   throw new CustomError.BadRequestError(
  //     'Already submitted stop for this route'
  //   );
  // }

  const stop = await Stop.create(req.body);
  res.status(StatusCodes.CREATED).json({ stop });
};
const getAllStops = async (req, res) => {
  const stops = await Stop.find({});

  res.status(StatusCodes.OK).json({ stops, count: stops.length });
};

const getAllRouteStops = async (req, res) => {
  const { id: routeId } = req.params;
  const stops = await Stop.find({ route: routeId });

  res.status(StatusCodes.OK).json({ stops, count: stops.length });
};

const getSingleStop = async (req, res) => {
  const { id: stopId } = req.params;

  const stop = await Stop.findOne({ _id: stopId });

  if (!stop) {
    throw new CustomError.NotFoundError(`No stop with id ${stopId}`);
  }

  res.status(StatusCodes.OK).json({ stop });
};
const updateStop = async (req, res) => {
  const { id: stopId } = req.params;
  const { rating, title, comment } = req.body;

  const stop = await Stop.findOneAndUpdate({ _id: stopId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!stop) {
    throw new CustomError.NotFoundError(`No stop with id ${stopId}`);
  }

  // checkPermissions(req.user, stop.user);

  // stop.rating = rating;
  // stop.title = title;
  // stop.comment = comment;

  // await stop.save();
  res.status(StatusCodes.OK).json({ stop });
};
const deleteStop = async (req, res) => {
  const { id: stopId } = req.params;

  const stop = await Stop.findOne({ _id: stopId });

  if (!stop) {
    throw new CustomError.NotFoundError(`No stop with id ${stopId}`);
  }

  checkPermissions(req.user, stop.user);
  await stop.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Stop removed' });
};

module.exports = {
  createStop,
  getAllStops,
  getSingleStop,
  updateStop,
  deleteStop,
  getAllRouteStops,
};
