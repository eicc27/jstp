"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionChain = void 0;
class ConditionChain {
    conditions = [];
    connectives = [];
    constructor(condition) {
        if (condition) {
            this.conditions.push(condition);
            this.connectives.push('and');
        }
    }
    and() {
        this.connectives.push('and');
        return this;
    }
    or() {
        this.connectives.pop();
        this.connectives.push('or');
        return this;
    }
    eq(k, v) {
        this.conditions.push(`${k} = ${v}`);
        this.connectives.push('and');
        return this;
    }
    static eq(k, v) {
        return new ConditionChain(`${k} = ${v}`);
    }
    neq(k, v) {
        this.conditions.push(`${k} != ${v}`);
        this.connectives.push('and');
        return this;
    }
    static neq(k, v) {
        return new ConditionChain(`${k} != ${v}`);
    }
    gt(k, v) {
        this.conditions.push(`${k} > ${v}`);
        this.connectives.push('and');
        return this;
    }
    static gt(k, v) {
        return new ConditionChain(`${k} > ${v}`);
    }
    gte(k, v) {
        this.conditions.push(`${k} >= ${v}`);
        this.connectives.push('and');
        return this;
    }
    static gte(k, v) {
        return new ConditionChain(`${k} >= ${v}`);
    }
    lt(k, v) {
        this.conditions.push(`${k} < ${v}`);
        this.connectives.push('and');
        return this;
    }
    static lt(k, v) {
        return new ConditionChain(`${k} < ${v}`);
    }
    lte(k, v) {
        this.conditions.push(`${k} <= ${v}`);
        this.connectives.push('and');
        return this;
    }
    static lte(k, v) {
        return new ConditionChain(`${k} <= ${v}`);
    }
    like(k, v) {
        this.conditions.push(`${k} like ${v}`);
        this.connectives.push('and');
        return this;
    }
    static like(k, v) {
        return new ConditionChain(`${k} like ${v}`);
    }
    nlike(k, v) {
        this.conditions.push(`${k} not like ${v}`);
        this.connectives.push('and');
        return this;
    }
    static nlike(k, v) {
        return new ConditionChain(`${k} not like ${v}`);
    }
    glob(k, v) {
        this.conditions.push(`${k} glob ${v}`);
        this.connectives.push('and');
        return this;
    }
    static glob(k, v) {
        return new ConditionChain(`${k} glob ${v}`);
    }
    nglob(k, v) {
        this.conditions.push(`${k} not glob ${v}`);
        this.connectives.push('and');
        return this;
    }
    static nglob(k, v) {
        return new ConditionChain(`${k} not glob ${v}`);
    }
    in(k, v) {
        this.conditions.push(`${k} in (${v.join(',')})`);
        this.connectives.push('and');
        return this;
    }
    static in(k, v) {
        return new ConditionChain(`${k} in (${v.join(',')})`);
    }
    nin(k, v) {
        this.conditions.push(`${k} not in (${v.join(',')})`);
        this.connectives.push('and');
        return this;
    }
    static nin(k, v) {
        return new ConditionChain(`${k} not in (${v.join(',')})`);
    }
    between(k, from, to) {
        this.conditions.push(`${k} between ${from} and ${to}`);
        this.connectives.push('and');
        return this;
    }
    static between(k, from, to) {
        return new ConditionChain(`${k} between ${from} and ${to}`);
    }
    nbetween(k, from, to) {
        this.conditions.push(`${k} not between ${from} and ${to}`);
        this.connectives.push('and');
        return this;
    }
    static nbetween(k, from, to) {
        return new ConditionChain(`${k} not between ${from} and ${to}`);
    }
    isnull(k) {
        this.conditions.push(`${k} is null`);
        this.connectives.push('and');
        return this;
    }
    static isnull(k) {
        return new ConditionChain(`${k} is null`);
    }
    nnull(k) {
        this.conditions.push(`${k} is not null`);
        this.connectives.push('and');
        return this;
    }
    static nnull(k) {
        return new ConditionChain(`${k} is not null`);
    }
    end() {
        let query = '';
        this.connectives.pop();
        this.conditions.forEach((condition, index) => {
            const connective = this.connectives[index];
            query += condition;
            if (connective)
                query += ` ${connective} `;
        });
        return query;
    }
}
exports.ConditionChain = ConditionChain;
//# sourceMappingURL=condition.js.map