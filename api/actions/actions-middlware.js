// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require("./actions-model");
const projectsModel = require("../projects/projects-model");

async function validateActionId(req, res, next) {
  try {
    let { id } = req.params;
    const action = await actionsModel.get(id);
    if (action) {
      req.currentAction = action;
      next();
    } else {
      res.status(404).json({ message: "Belirtilen Id'li action bulunamadi" });
    }
  } catch (error) {
    next(error);
  }
}

async function validateActionBody(req, res, next) {
  try {
    let { project_id, description, notes } = req.body;

    let existingProject = await projectsModel.get(project_id);

    if (description && description.length < 128 && notes) {
      if (existingProject) {
        req.currentProject = existingProject;
        next();
      } else {
        res.status(404).json({ message: "Belirtilen Id'li proje bulunamadi" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Eksin alanlar mevcut veya aciklama cok uzun." });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateActionId,
  validateActionBody,
};
