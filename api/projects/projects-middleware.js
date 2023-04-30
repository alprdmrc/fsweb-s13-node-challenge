// projects ara yazılımları buraya
const projectModel = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    let { id } = req.params;
    const project = await projectModel.get(id);
    if (project) {
      req.currentProject = project;
      next();
    } else {
      res.status(404).json({ message: "Belirtilen Id'li proje bulunamadi" });
    }
  } catch (error) {
    next(error);
  }
}

function validateProjectBody(req, res, next) {
  try {
    let { name, description, completed } = req.body;
    if (req.method === "POST") {
      if (name && description) {
        next();
      } else {
        res.status(400).json({ message: "Eksik alan mevcut" });
      }
    } else if (req.method === "PUT") {
      //check if completed true or false
      if (name && description && (completed === true || completed === false)) {
        next();
      } else {
        res.status(400).json({ message: "Eksik alan mevcut" });
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateProjectId,
  validateProjectBody,
};
