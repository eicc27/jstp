"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const condition_1 = require("./condition");
const function_1 = require("./function");
const postfix_1 = require("./postfix");
const props_1 = require("./props");
const sql_1 = require("./sql");
let Room = class Room {
    id;
    kdno;
    kcno;
    ccno;
    kdname;
    exptime;
    papername;
};
__decorate([
    (0, props_1.ai)(),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    props_1.nn,
    __metadata("design:type", String)
], Room.prototype, "kdno", void 0);
__decorate([
    props_1.nn,
    __metadata("design:type", String)
], Room.prototype, "kcno", void 0);
__decorate([
    props_1.nn,
    __metadata("design:type", String)
], Room.prototype, "ccno", void 0);
__decorate([
    props_1.nn,
    __metadata("design:type", String)
], Room.prototype, "kdname", void 0);
__decorate([
    props_1.nn,
    __metadata("design:type", String)
], Room.prototype, "exptime", void 0);
__decorate([
    (0, props_1.column)(),
    __metadata("design:type", String)
], Room.prototype, "papername", void 0);
Room = __decorate([
    (0, props_1.table)('Room')
], Room);
const t = new sql_1.Table(Room, './db/lab1.db');
const query1 = t.select(function_1.SQLFunction.count('*').abs().end(), condition_1.ConditionChain.eq('kcno', '1').end(), null);
console.log(query1);
console.log(t.prepare(query1));
const query2 = t.select(function_1.SQLFunction.avg('id').end(), condition_1.ConditionChain.lt('kcno', '1').or().eq('kcno', '1').end(), postfix_1.SelectionPostfix.groupBy(['ccno']).limit(2).end());
console.log(query2);
console.log(t.prepare(query2));
//# sourceMappingURL=index.js.map