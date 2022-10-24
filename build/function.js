"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLFunction = void 0;
class SQLFunction {
    output = '';
    constructor(output) {
        this.output = output;
    }
    count() {
        this.output = `count(${this.output})`;
        return this;
    }
    static count(arg) {
        return new SQLFunction(`count(${arg})`);
    }
    max() {
        this.output = `max(${this.output})`;
        return this;
    }
    static max(arg) {
        return new SQLFunction(`max(${arg})`);
    }
    min() {
        this.output = `min(${this.output})`;
        return this;
    }
    static min(arg) {
        return new SQLFunction(`min(${arg})`);
    }
    avg() {
        this.output = `avg(${this.output})`;
        return this;
    }
    static avg(arg) {
        return new SQLFunction(`avg(${arg})`);
    }
    sum() {
        this.output = `sum(${this.output})`;
        return this;
    }
    static sum(arg) {
        return new SQLFunction(`sum(${arg})`);
    }
    static random() {
        return new SQLFunction(`random()`);
    }
    abs() {
        this.output = `abs(${this.output})`;
        return this;
    }
    static abs(arg) {
        return new SQLFunction(`abs(${arg})`);
    }
    upper() {
        this.output = `upper(${this.output})`;
        return this;
    }
    static upper(arg) {
        return new SQLFunction(`upper(${arg})`);
    }
    lower() {
        this.output = `lower(${this.output})`;
        return this;
    }
    static lower(arg) {
        return new SQLFunction(`lower(${arg})`);
    }
    lengthOf() {
        this.output = `length(${this.output})`;
        return this;
    }
    static lengthOf(arg) {
        return new SQLFunction(`length(${arg})`);
    }
    static distinct(arg) {
        return new SQLFunction(`distinct ${arg}`);
    }
    end() {
        return this.output;
    }
}
exports.SQLFunction = SQLFunction;
//# sourceMappingURL=function.js.map