const express =  require("express");
const userController =  require("../controllers/repoController");

const repoRouter =  express.Router();

repoRouter.post("/repo/create", userController.createRepository);
repoRouter.get("/allRepo", userController.getAllRepository);
repoRouter.get("/repo/id/:id", userController.fetchRepoByID);
repoRouter.get("/repo/name/:name", userController.fetchRepoByName);
repoRouter.get("/repo/user/:userID", userController.fetchRepoForCurrentUser);
repoRouter.put("/repo/update/:id", userController.updateRepoById);
repoRouter.patch("/repo/toggle/:id", userController.toogleVisById);
repoRouter.delete("/repo/delete/:id", userController.deleteRepoById);


module.exports = repoRouter;