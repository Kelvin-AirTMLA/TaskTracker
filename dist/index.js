#! /usr/bin/env node
import figlet from "figlet";
import fs from "fs";
import { Command } from "commander";
class Todo {
    id;
    description;
    status;
    createdAt;
    updatedAt;
}
function WelcomeAsync(message) {
    return new Promise((resolve, reject) => {
        figlet(message, (err, todo) => {
            if (err)
                return reject(err);
            resolve(todo);
        });
    });
}
async function welcome() {
    const message = "Welcome To TODO LIST!!!";
    const logo = await WelcomeAsync(message);
    console.log(logo);
}
const program1 = new Command();
async function add(task) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;
    const obj = JSON.parse(safeData);
    const tasksObj = obj || {};
    const existingkeys = Object.keys(tasksObj).map(idStr => Number(idStr));
    let nextId = 0;
    while (existingkeys.includes(nextId)) {
        nextId++;
    }
    let my_task = {
        id: nextId,
        status: "todo",
        description: task,
        createdAt: Date.toLocaleString(),
        updatedAt: Date.toLocaleString(),
    };
    tasksObj[nextId] = my_task;
    fs.writeFileSync("todo.json", JSON.stringify(tasksObj, null, 2), "utf8");
    console.log(`Task added successfully (ID: ${my_task.id})`);
}
async function update(id, task) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;
    const obj = JSON.parse(safeData);
    const tasksObj = obj || {};
    const existingkeys = Object.keys(tasksObj).map(idStr => Number(idStr));
    if (id in existingkeys) {
        tasksObj[String(id)].description = task;
        fs.writeFileSync("todo.json", JSON.stringify(tasksObj, null, 2), "utf8");
    }
}
async function remove(id) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;
    const obj = JSON.parse(safeData);
    const tasksObj = obj || {};
    delete tasksObj[String(id)];
    fs.writeFileSync("todo.json", JSON.stringify(tasksObj, null, 2), "utf8");
}
async function mark_progress(id) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;
    const obj = JSON.parse(safeData);
    const tasksObj = obj || {};
    tasksObj[String(id)].status = "in-progress";
    fs.writeFileSync("todo.json", JSON.stringify(tasksObj, null, 2), "utf8");
}
async function mark_done(id) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;
    const obj = JSON.parse(safeData);
    const tasksObj = obj || {};
    tasksObj[String(id)].status = "done";
    fs.writeFileSync("todo.json", JSON.stringify(tasksObj, null, 2), "utf8");
}
async function list(status) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;
    const obj = JSON.parse(safeData);
    const tasksObj = obj || {};
    const ids = Object.keys(tasksObj)
        .map((idStr) => Number(idStr))
        .filter((n) => !Number.isNaN(n))
        .sort((a, b) => a - b);
    for (const id of ids) {
        const task = tasksObj[String(id)];
        if (!task)
            continue;
        if (status && task.status !== status) {
            continue;
        }
        console.log(task);
    }
}
async function main() {
    await welcome();
    program1.command('add')
        .argument('<task>', 'todo must be a string')
        .action(async (task) => {
        await add(task);
    });
    program1.command("update")
        .argument("<id>", "")
        .argument("<new_task>", "")
        .action(async (id, task) => {
        await update(Number(id), task);
    });
    program1.command("remove")
        .argument("<id>", "")
        .action(async (id) => {
        await remove(Number(id));
    });
    program1.command("mark_done")
        .argument("<id>", "")
        .action(async (id) => {
        await mark_done(Number(id));
    });
    program1.command("mark_progress")
        .argument("<id>", "")
        .action(async (id) => {
        await mark_progress(Number(id));
    });
    program1.command("list")
        .argument("[status]", "filter by status: todo | in-progress | done")
        .action(async (status) => {
        const allowed = ["todo", "in-progress", "done"];
        const normalized = status && allowed.includes(status)
            ? status
            : undefined;
        await list(normalized);
    });
    program1.parse(process.argv);
}
void main();
//# sourceMappingURL=index.js.map