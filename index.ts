#! /usr/bin/env node

import figlet from "figlet"
import fs from "fs"
import { program, Command } from "commander"

var todos = {}

// Decided to use a linked list because:
// 1. i need to update changes faster
// 2. Ids need to be updated automatically
// 3. It just shows good coding knowledge

class Todo {
    id: number;
    description?: string;
    status: "todo" | "in-progress" | "done";
    createdAt: string;
    updatedAt: string;
}

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function WelcomeAsync(message: string) {
    return new Promise((resolve, reject) => {
        figlet(message, (err, todo) => {
            if (err) return reject(err);
            resolve(todo);
        });
    });
}

async function welcome() {
    const message = "Welcome To TODO LIST!!!"
    const logo = await WelcomeAsync(message);
    console.log(logo)
}

const program1 = new Command();

async function add(task: string) {

    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;   // or use try/catch
    const obj = JSON.parse(safeData);

    const tasksObj = obj || {};  // if obj is null/undefined, use {}
    const existingkeys = Object.keys(tasksObj).map(idStr => Number(idStr));


    let nextId = 0;
    while (existingkeys.includes(nextId)) {
        // my_todos.append(tasksObj[nextId]);
        nextId++;
    }

    let my_task: Todo = {
        id: nextId,
        status: "todo",
        description: task,
        createdAt: Date.toLocaleString(),
        updatedAt: Date.toLocaleString(),
    }

    tasksObj[nextId] = my_task;
    fs.writeFileSync("todo.json", JSON.stringify(tasksObj, null, 2), "utf8")
    console.log(`Task added successfully (ID: ${my_task.id})`);
}

async function update(id: number, task: string) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;   // or use try/catch
    const obj = JSON.parse(safeData);

    const tasksObj = obj || {};  // if obj is null/undefined, use {}
    const existingkeys = Object.keys(tasksObj).map(idStr => Number(idStr));

    if (id in existingkeys) {
        tasksObj[String(id)].description = task;
        fs.writeFileSync("todo.json", JSON.stringify(tasksObj, null, 2), "utf8");
    }
}

async function remove(id: number) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;   // or use try/catch
    const obj = JSON.parse(safeData);

    const tasksObj = obj || {};  // if obj is null/undefined, use {}
    const existingkeys = Object.keys(tasksObj).map(idStr => Number(idStr));

    let nextId = 0;
    while (existingkeys.includes(nextId)) {
        if (id === nextId) {
            delete tasksObj[nextId];
        }
    }
}

async function mark_progress(id: number) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;   // or use try/catch
    const obj = JSON.parse(safeData);

    const tasksObj = obj || {};  // if obj is null/undefined, use {}
    const existingkeys = Object.keys(tasksObj).map(idStr => Number(idStr));

    let nextId = 0;
    while (existingkeys.includes(nextId)) {
        if (id === nextId) {
            tasksObj[nextId].status = "in-progress"
            fs.writeFileSync("todo.json", JSON.stringify(tasksObj, null, 2), "utf8");
        }
    }
}

async function mark_done(id: number) {
    const data = fs.readFileSync("todo.json", { encoding: "utf8", flag: "r" });
    const safeData = data.trim() === "" ? "{}" : data;   // or use try/catch
    const obj = JSON.parse(safeData);

    const tasksObj = obj || {};  // if obj is null/undefined, use {}
    const existingkeys = Object.keys(tasksObj).map(idStr => Number(idStr));

    let nextId = 0;
    while (existingkeys.includes(nextId)) {
        if (id === nextId) {
            tasksObj[nextId].status = "done"
            fs.writeFileSync("todo.json", JSON.stringify(tasksObj, null, 2), "utf8");
        }
    }
}



async function main() {
    await welcome();
}

await main();

program1.command('add')
    .argument('<task>', 'todo must be a string')
    .action(async (task) => {
        await add(task);
    });

program1.command("update")
    .argument("<id>", "")
    .argument("<new_task>", "")
    .action(async (id, task) => {
        await update(id, task);
    });

program1.command("remove")
    .argument("<id>", "")
    .action(async (id) => {
        await remove(id);
    });

program1.command("mark-done")
    .argument("<id>", "")
    .action(async (id) => {
        await mark_done(id);
    });

program1.command("mark_progress")
    .argument("<id>", "")
    .action(async (id) => {
        await mark_progress(id);
    });

program1.parse(process.argv);
