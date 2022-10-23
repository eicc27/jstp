/**
 */
type unaryOperation = (k: string) => ConditionChain;
type binaryOperation = (k: string, v: string) => ConditionChain;
type inOperation = (k: string, v: string[]) => ConditionChain;
type betweenOperation = (k: string, from: string, to: string) => ConditionChain;
type binaryConjunction = () => ConditionChain;

interface Condition {
    conditions: string[];
    connectives: string[];
}

interface ComparisonCondition extends Condition {
    eq: binaryOperation;
    neq: binaryOperation;
    gt: binaryOperation;
    gte: binaryOperation;
    lt: binaryOperation;
    lte: binaryOperation;
    like: binaryOperation;
    nlike: binaryOperation;
    glob: binaryOperation;
    nglob: binaryOperation;
    in: inOperation;
    nin: inOperation;
    between: betweenOperation;
    nbetween: betweenOperation;
    isnull: unaryOperation;
    nnull: unaryOperation;
}

interface LogicCondition extends Condition {
    and: binaryConjunction;
    or: binaryConjunction;
}

export class ConditionChain implements ComparisonCondition, LogicCondition {
    conditions: string[] = [];
    connectives: string[] = [];

    protected constructor(condition?: string) {
        if (condition) {
            this.conditions.push(condition);
            this.connectives.push('and');
        }
    }

    public and() {
        this.connectives.push('and');
        return this;
    }

    public or() {
        this.connectives.pop();
        this.connectives.push('or');
        return this;
    }

    public eq(k: string, v: string) {
        this.conditions.push(`${k} = ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static eq(k: string, v: string) {
        return new ConditionChain(`${k} = ${v}`);
    }

    public neq(k: string, v: string) {
        this.conditions.push(`${k} != ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static neq(k: string, v: string) {
        return new ConditionChain(`${k} != ${v}`);
    }

    public gt(k: string, v: string) {
        this.conditions.push(`${k} > ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static gt(k: string, v: string) {
        return new ConditionChain(`${k} > ${v}`);
    }

    public gte(k: string, v: string) {
        this.conditions.push(`${k} >= ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static gte(k: string, v: string) {
        return new ConditionChain(`${k} >= ${v}`);
    }

    public lt(k: string, v: string) {
        this.conditions.push(`${k} < ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static lt(k: string, v: string) {
        return new ConditionChain(`${k} < ${v}`);
    }

    public lte(k: string, v: string) {
        this.conditions.push(`${k} <= ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static lte(k: string, v: string) {
        return new ConditionChain(`${k} <= ${v}`);
    }

    public like(k: string, v: string) {
        this.conditions.push(`${k} like ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static like(k: string, v: string) {
        return new ConditionChain(`${k} like ${v}`);
    }

    public nlike(k: string, v: string) {
        this.conditions.push(`${k} not like ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static nlike(k: string, v: string) {
        return new ConditionChain(`${k} not like ${v}`);
    }

    public glob(k: string, v: string) {
        this.conditions.push(`${k} glob ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static glob(k: string, v: string) {
        return new ConditionChain(`${k} glob ${v}`);
    }

    public nglob(k: string, v: string) {
        this.conditions.push(`${k} not glob ${v}`);
        this.connectives.push('and');
        return this;
    }

    public static nglob(k: string, v: string) {
        return new ConditionChain(`${k} not glob ${v}`);
    }

    public in(k: string, v: string[]) {
        this.conditions.push(`${k} in (${v.join(',')})`);
        this.connectives.push('and');
        return this;
    }

    public static in(k: string, v: string[]) {
        return new ConditionChain(`${k} in (${v.join(',')})`);
    }

    public nin(k: string, v: string[]) {
        this.conditions.push(`${k} not in (${v.join(',')})`);
        this.connectives.push('and');
        return this;
    }

    public static nin(k: string, v: string[]) {
        return new ConditionChain(`${k} not in (${v.join(',')})`);
    }

    public between(k: string, from: string, to: string) {
        this.conditions.push(`${k} between ${from} and ${to}`);
        this.connectives.push('and');
        return this;
    }

    public static between(k: string, from: string, to: string) {
        return new ConditionChain(`${k} between ${from} and ${to}`);
    }

    public nbetween(k: string, from: string, to: string) {
        this.conditions.push(`${k} not between ${from} and ${to}`);
        this.connectives.push('and');
        return this;
    }

    public static nbetween(k: string, from: string, to: string) {
        return new ConditionChain(`${k} not between ${from} and ${to}`);
    }

    public isnull(k: string) {
        this.conditions.push(`${k} is null`);
        this.connectives.push('and');
        return this;
    }

    public static isnull(k: string) {
        return new ConditionChain(`${k} is null`);
    }

    public nnull(k: string) {
        this.conditions.push(`${k} is not null`);
        this.connectives.push('and');
        return this;
    }

    public static nnull(k: string) {
        return new ConditionChain(`${k} is not null`);
    }

    public end() {
        return new PrintableConditionChain(this.conditions, this.connectives);
    }
}

class PrintableConditionChain {
    private conditions: string[];
    private connectives: string[];
    public constructor(conditions: string[], connectives: string[]) {
        this.conditions = conditions;
        this.connectives = connectives;
        this.connectives.pop();
    }

    public toString() {
        let query = '';
        this.conditions.forEach((condition, index) => {
            const connective = this.connectives[index];
            query += condition;
            if (connective)
                query += ` ${connective} `;
        });
        query += ';';
        return query;
    }
}