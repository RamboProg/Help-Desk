class PriorityQueue {
    constructor() {
        this.items = [];
    }

    // Add an element to the end of the queue
    enqueue(item) {
        this.items.push(item);
    }

    enqueueFront(item) {
        this.items.unshift(item);
    }

    // Remove and return the first element from the queue
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the first element of the queue without removing it
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    // Get the size of the queue
    size() {
        return this.items.length;
    }
}

module.exports = { PriorityQueue };