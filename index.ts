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

export class SinglyLinkedList<T> { // fun fact: can be used as a queue or stack!
    public head: Node<T> | null = null;

    prepend(todo: T): void {
        const newNode: Node<T> = new Node(todo);
        newNode.next = this.head;
        this.head = newNode;
    };

    append(todo: T): void {
        const newNode: Node<T> = new Node(todo);

        if (this.head === null) {
            this.head = newNode;
        }

        var current: Node<T> = this.head;
        while (current.next !== null) {
            current = current.next;

            if (current.next === null) {
                current.next = newNode;
            }
        }
    };

    delete(todo: T): void { // removes first occurence of the node with the given todo
        if (this.head === null) {
            return;
        }

        var current: Node<T> = this.head;

        while (current.next !== null) {

            if (current.todo != todo) {
                current = current.next;
            } else {
                current.next = current.next.next;
                // delete current.next - means deleting the "next property" which is forbidden
            }
        }
    };

    deleteHead(): void {
        if (this.head === null) {
            return;
        }

        this.head.next = this.head;
    };

    deleteTail(): void {
        if (this.head === null) {
            return;
        }

        let current = this.head;

        while (current.next != null) {
            if (current.next.next === null) {
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }
    };

    traverse(): void {
        let current = this.head;
        while (current) {
            console.log(current.todo);
            current = current.next;
        }
    }

    find(todo: T): Node<T> | null {
        if (this.head === null) {
            return null;
        }

        let current = this.head;
        let found_node: Node<T> | null = null;

        while (current.next != null) {
            if (current.todo === todo) {
                found_node = current;
            } else {
                current = current.next;
            }
        }

        return found_node;
    };

    insertAt(pos: number, todo: T): void {
        if (this.head === null) {
            return;
        }

        
    };
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
