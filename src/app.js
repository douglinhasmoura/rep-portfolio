const express = require("express");
const cors = require("cors");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const { uuid } = require('uuidv4');

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repo);

  return response.json(repo);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const { title, url, techs} = request.body;
  const repoIndex = repositories.findIndex(repo => repo.id === id);


  if(repoIndex < 0){
    return response.status(400).json({error: 'Repo not found'});
  }
  const repo ={
    id,
    title,
    url,
    techs,
    likes: 0
  };
  
  repositories[repoIndex] = repo;
  
  return response.json(repo);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(repoIndex < 0){
        return response.status(400).json({error: 'Repo not found.'});
    }

    repositories.splice(repoIndex, 1);

    return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0){
    return response.status(400).json({error: 'Repo not found'});
  }

  repo = repositories[repoIndex] 
  repo.likes = repo.likes + 1;

  repositories[repoIndex] = repo;

  return response.json(repo);

});

module.exports = app;
