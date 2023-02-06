const express = require('express');
const {DATA_PATH} = require("../data/constants");
const {readFile} = require('fs').promises;

const filterRouter = express.Router();

filterRouter

    .post('/:filterName', async (req, res) => {
        try {
            const {filterName} = req.params;
            const data = await readFile(DATA_PATH, 'utf8');
            const arrListToDo = JSON.parse(data);
            const arrListToDoChanged = [];
            if (filterName === "all") {
                res.json(arrListToDo);
            } else if (filterName === "active") {
                for (let {name, completed} of arrListToDo) {
                    if (!completed) arrListToDoChanged.push({name, completed});
                }
                res.json(arrListToDoChanged);
            } else if (filterName === "completed") {
                for (let {name, completed} of arrListToDo) {
                    if (completed) arrListToDoChanged.push({name, completed});
                }
                res.json(arrListToDoChanged);
            } else {
                res.send('wrong url address')
            }

        } catch (err) {
            throw new Error(`Something went wrong: ${err}`);
        }
    })


module.exports = {
    filterRouter,
}