const Tag = require('./tags.model');
const {
  sendServerError,
  sendCreatedResponse,
  sendOkResponse,
  sendNotFoundResponse,
  sendNoContentResponse
} = require('../core/responses');

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    sendOkResponse(res, tags);
  } catch {
    sendServerError(res);
  }
};

exports.createTag = async (req, res) => {
  try {
    const establishmentId = req.user.id;

    let newTag = new Tag();
    newTag.text = req.body.text;
    newTag.establishmentId = establishmentId;

    const tagCreated = await newTag.save();
    sendCreatedResponse(res, tagCreated);
  } catch (e) {
    console.log(e);
    sendServerError(res, e);
  }
};

exports.deleteTag = async (req, res) => {
  try {
    await Tag.findOneAndDelete(req.params.id);
    sendNoContentResponse(res);
  } catch {
    sendServerError(res);
  }
};
