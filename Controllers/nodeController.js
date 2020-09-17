const Node = require('../models/node');

class Controller {
    static async showAll(req, res) {
        const nodes = await Node.findAll();
        res.status(200).json(nodes);
    }

    static async showOne(req, res) {
        const node = await Node.findByPk(req.params.id);
        if (!node) res.status(404).json({ message: 'Data Not Found' });
        else res.status(200).json(node);
    }

    static async addNode(req, res) {
        try {
            const node = await Node.create(req.body);
            res.status(201).json(node);
        } catch (err) {
            res.status(500).json({ message: err.errors[0].message });
        }
    }

    static async updateNode(req, res) {
        try {
            const node = await Node.findByPk(req.params.id);
            if (!node) res.status(404).json({ message: `Node with id ${req.params.id} Not Found` });
            else { 
                const update = await Node.update(req.body ,{ where: { id: req.params.id } });
                res.status(200).json({ message: 'Update Success!' });
            }
        } catch (err) {
            res.status(500).json({ message: err.errors[0].message });
        }
    }

    static async deleteNode(req, res) {
        try {
            const node = await Node.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: 'Delete Success!' });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}

module.exports = Controller;