// "project" routerını buraya yazın!
const router = require("express").Router();

const projectsModel = require("./projects-model");
const {
  validateProjectBody,
  validateProjectId,
} = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const projects = await projectsModel.get();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateProjectId, (req, res, next) => {
  try {
    res.json(req.currentProject);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateProjectBody, async (req, res, next) => {
  try {
    const insertedProject = await projectsModel.insert({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    });
    res.json(insertedProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validateProjectBody,
  validateProjectId,
  async (req, res, next) => {
    try {
      const updatedProject = await projectsModel.update(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
      });
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await projectsModel.remove(req.params.id);
    res.status(204).json({ message: "deleted" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const actions = await projectsModel.getProjectActions(req.params.id);
    res.json(actions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
