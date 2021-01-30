const model = require("../models/user-model");

/**
 * Delete a user
 *
 * @param {object} req http request object
 * @param {object} res http response object
 * @return {object} promise of a record object
 * @throws Error
 */
exports.deleteUser = async (req, res) => {
  model
    .deleteUser(req.params.userID)
    .then((result) => {
      let message = result == true ? "Deleted successfully" : "Couldnt delete";
      return res.status(200).send(message);
    })
    .catch((error) => {
      return res.status(400).send(error.message);
    });
};
