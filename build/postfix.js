"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionPostfix = void 0;
class BaseSelectionPostfix {
    postfix = [];
    constructor(postfix) { this.postfix = postfix; }
    end() {
        return this.postfix.join(' ');
    }
}
class SelectionPostfix {
    static limit(limit, offset) {
        let postfix = [];
        if (offset)
            postfix.push(`limit ${limit} offset ${offset}`);
        else
            postfix.push(`limit ${limit}`);
        return new LimitSelection(postfix);
    }
    static orderBy(columns, direction) {
        let postfix = [];
        postfix.push(`order by ${columns.join(',')} ${direction}`);
        return new OrderBySelection(postfix);
    }
    static groupBy(columns) {
        let postfix = [];
        postfix.push(`group by ${columns}`);
        return new GroupBySelection(postfix);
    }
    static having(where) {
        let postfix = [];
        postfix.push(`having ${where}`);
        return new HavingSelection(postfix);
    }
}
exports.SelectionPostfix = SelectionPostfix;
class LimitSelection extends BaseSelectionPostfix {
    constructor(postfix) { super(postfix); }
}
class OrderBySelection extends BaseSelectionPostfix {
    constructor(postfix) { super(postfix); }
    limit(limit, offset) {
        if (offset)
            this.postfix.push(`limit ${limit} offset ${offset}`);
        else
            this.postfix.push(`limit ${limit}`);
        return new LimitSelection(this.postfix);
    }
}
class HavingSelection extends BaseSelectionPostfix {
    constructor(postfix) { super(postfix); }
    limit(limit, offset) {
        if (offset)
            this.postfix.push(`limit ${limit} offset ${offset}`);
        else
            this.postfix.push(`limit ${limit}`);
        return new LimitSelection(this.postfix);
    }
    orderBy(columns, direction) {
        this.postfix.push(`order by ${columns.join(',')} ${direction}`);
        return new OrderBySelection(this.postfix);
    }
}
class GroupBySelection extends BaseSelectionPostfix {
    constructor(postfix) { super(postfix); }
    limit(limit, offset) {
        if (offset)
            this.postfix.push(`limit ${limit} offset ${offset}`);
        else
            this.postfix.push(`limit ${limit}`);
        return new LimitSelection(this.postfix);
    }
    orderBy(columns, direction) {
        this.postfix.push(`order by ${columns.join(',')} ${direction}`);
        return new OrderBySelection(this.postfix);
    }
    having(where) {
        this.postfix.push(`having ${where}`);
        return new HavingSelection(this.postfix);
    }
}
//# sourceMappingURL=postfix.js.map