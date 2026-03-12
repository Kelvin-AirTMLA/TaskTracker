#! /usr/bin/env node

import figlet from "figlet"
import fs from "fs"

var todos = {}

// Decided to use a linked list because:
// 1. i need to update changes faster
// 2. Ids need to be updated automatically
// 3. It just shows good coding knowledge


class Node<T> {
    public todo: T;
    public next: Node<T> | null

    constructor(value: T) {
        this.todo = value;
    }
}

export class SinglyLinkedList<T> {
    public head: Node<T> | null = null;

    prepend(todo: T) : void {
        const newNode: Node<T> = new Node(todo);
        newNode.next = this.head;
        this.head = newNode;
    };

    append(todo: T) : void {
        const newNode: Node<T> = new Node(todo);
        
        if (this.head === null) {
            this.head = newNode;
        }

        var current: Node<T> = this.head;
        while (current.next != null) {
            current = current.next;

            if (current.next === null) {
                current.next = newNode;
            }
        }
    };

    delete(todo: T) : void { // removes first occurence of the node with the given todo
        
    };

    deleteTail(todo: T) : void {};
    deleteHead(todo: T) : void {};
    traverse(todo: T) : void {};
    find(todo: T) : void {};
    insertAt(pos: number, todo: T): void {};
}


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const message = "Welcome To TODO LIST!!!"

    figlet(message, (err, todo) => {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }

        console.log(todo)
    })

    sleep();
}

async function add(task: string) {
   
}

async function update(id: number, task: string) {
    
}

async function remove(id: number) {
    
}

async function mark_progress(id: number) {
   
}

async function mark_done(id: number) {
   
}

welcome()
