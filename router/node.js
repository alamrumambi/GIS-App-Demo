const nodes = require('express').Router();
const Controller = require('../Controllers/nodeController');

nodes.get('/', Controller.showAll);
nodes.get('/:id', Controller.showOne);
nodes.post('/', Controller.addNode);
nodes.put('/:id', Controller.updateNode);
nodes.delete('/:id', Controller.deleteNode);

module.exports = nodes;