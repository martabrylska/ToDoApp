const express = require('express');
const {DATA_PATH} = require("../data/constants");
const {readFile, writeFile} = require('fs').promises;

const todoRouter = express.Router();

todoRouter
    .post('/', async (req, res) => {
        try {
            const data = await readFile(DATA_PATH, 'utf8');
            const arrListToDo = JSON.parse(data);
            res.json(arrListToDo);
        } catch (err) {
            throw new Error(`Something went wrong: ${err}`);
        }
    })
    .post('/add', async (req, res) => {
        try {
            const {newToDo} = req.body;
            const newToDoData = {
                name: newToDo,
                completed: false,
            };
            const data = await readFile(DATA_PATH, 'utf8');
            const arrListToDo = JSON.parse(data);
            arrListToDo.push(newToDoData);
            await writeFile(DATA_PATH, JSON.stringify(arrListToDo));
            res.json(arrListToDo);
        } catch (err) {
            throw new Error(`Something went wrong: ${err}`);
        }
    })
    .post('/complete', async (req, res) => {
        try {
            const changedTask = {
                name: req.body.task,
            };
            const data = await readFile(DATA_PATH, 'utf8');
            const arrListToDo = JSON.parse(data);
            const arrListToDoChanged = [];
            for (let {name, completed} of arrListToDo) {
                if (name === changedTask.name) completed = !completed;
                arrListToDoChanged.push({name, completed})
                }
            await writeFile(DATA_PATH, JSON.stringify(arrListToDoChanged));
            res.json(arrListToDoChanged);
        } catch (err) {
            throw new Error(`Something went wrong: ${err}`);
        }
    })
    .post('/remove', async (req, res) => {
        try {
            const removedTask = {
                name: req.body.task,
            };
            const data = await readFile(DATA_PATH, 'utf8');
            const arrListToDo = JSON.parse(data);
            const arrListToDoChanged = [];
            for (let {name, completed} of arrListToDo) {
                if (name !== removedTask.name) arrListToDoChanged.push({name, completed});
            };
            await writeFile(DATA_PATH, JSON.stringify(arrListToDoChanged));
            res.json(arrListToDoChanged);
        } catch (err) {
            throw new Error(`Something went wrong: ${err}`);
        }
    })
    .post('/clear', async (req, res) => {
        try {
            const data = await readFile(DATA_PATH, 'utf8');
            const arrListToDo = JSON.parse(data);
            const arrListToDoChanged = [];
            for (let {name, completed} of arrListToDo) {
                if (!completed) arrListToDoChanged.push({name, completed});
            }
            await writeFile(DATA_PATH, JSON.stringify(arrListToDoChanged));
            res.json(arrListToDoChanged);
        } catch (err) {
            throw new Error(`Something went wrong: ${err}`);
        }
    })

module.exports = {
    todoRouter,
}