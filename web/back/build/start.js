"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _logger = _interopRequireDefault(require("./logger"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startServer({
  port = process.env.PORT || 5000
} = {}) {
  const isProd = process.env.NODE_ENV === "production";
  const app = (0, _express.default)();
  app.use((0, _cors.default)());
  app.use(_express.default.urlencoded({
    extended: false
  }));
  app.use(_express.default.json()); // initialize logger

  if (isProd) {
    app.use(require("morgan")("combined", {
      stream: _logger.default.stream,
      skip: (req, res) => {
        return req.originalUrl.substr(-5) === "/ping";
      }
    }));
  } else {
    app.use(require("morgan")("dev"));
  }

  app.use("/api", (0, _routes.getRoutes)());
  app.use(errorMiddleware);

  if (isProd) {
    // Compute the build path and index.html path
    const buildPath = _path.default.resolve(__dirname, "../../front/build");

    const indexHtml = _path.default.join(buildPath, "index.html"); // Setup build path as a static assets path


    app.use(_express.default.static(buildPath)); // Serve index.html on unmatched routes

    app.get("*", (req, res) => res.sendFile(indexHtml));
  }

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      _logger.default.info(`Listening on port ${server.address().port}`);

      const originalClose = server.close.bind(server);

      server.close = () => new Promise(resolveClose => {
        originalClose(resolveClose);
      });

      setupCloseOnExit(server);
      resolve(server);
    });
  });
}

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error);
  } else {
    _logger.default.error("[Error]: ", error);

    res.status(500);
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === "production" ? null : {
        stack: error.stack
      })
    });
  }
}

function setupCloseOnExit(server) {
  // thank you stack overflow
  // https://stackoverflow.com/a/14032965/971592
  async function exitHandler(options = {}) {
    await server.close().then(() => {
      _logger.default.info("Server successfully closed");
    }).catch(e => {
      _logger.default.warn("Something went wrong closing the server", e.stack);
    }); // eslint-disable-next-line no-process-exit

    if (options.exit) process.exit();
  } // do something when app is closing


  process.on("exit", exitHandler); // catches ctrl+c event

  process.on("SIGINT", exitHandler.bind(null, {
    exit: true
  })); // catches "kill pid" (for example: nodemon restart)

  process.on("SIGUSR1", exitHandler.bind(null, {
    exit: true
  }));
  process.on("SIGUSR2", exitHandler.bind(null, {
    exit: true
  })); // catches uncaught exceptions

  process.on("uncaughtException", exitHandler.bind(null, {
    exit: true
  }));
}