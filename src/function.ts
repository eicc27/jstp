type noArgsExpr = () => SQLFunction;
interface ISQLFunction {
    count: noArgsExpr;
    max: noArgsExpr;
    min: noArgsExpr;
    avg: noArgsExpr;
    sum: noArgsExpr;
    // random: noArgsExpr;
    // distinct: noArgsExpr;
    abs: noArgsExpr;
    upper: noArgsExpr;
    lower: noArgsExpr;
    lengthOf: noArgsExpr;
}

export class SQLFunction implements ISQLFunction {
    private output = '';

    private constructor(output?: string) {
        this.output = output;
    }

    public count() {
        this.output = `count(${this.output})`;
        return this;
    }

    public static count(arg: string) {
        return new SQLFunction(`count(${arg})`);
    }

    public max() {
        this.output = `max(${this.output})`;
        return this;
    }

    public static max(arg: string) {
        return new SQLFunction(`max(${arg})`);
    }

    public min() {
        this.output = `min(${this.output})`;
        return this;
    }

    public static min(arg: string) {
        return new SQLFunction(`min(${arg})`);
    }

    public avg() {
        this.output = `avg(${this.output})`;
        return this;
    }

    public static avg(arg: string) {
        return new SQLFunction(`avg(${arg})`);
    }

    public sum() {
        this.output = `sum(${this.output})`;
        return this;
    }

    public static sum(arg: string) {
        return new SQLFunction(`sum(${arg})`);
    }

    public static random() {
        return new SQLFunction(`random()`);
    }

    public abs() {
        this.output = `abs(${this.output})`;
        return this;
    }

    public static abs(arg: string) {
        return new SQLFunction(`abs(${arg})`);
    }

    public upper() {
        this.output = `upper(${this.output})`;
        return this;
    }

    public static upper(arg: string) {
        return new SQLFunction(`upper(${arg})`);
    }

    public lower() {
        this.output = `lower(${this.output})`;
        return this;
    }

    public static lower(arg: string) {
        return new SQLFunction(`lower(${arg})`);
    }

    public lengthOf() {
        this.output = `length(${this.output})`;
        return this;
    }

    public static lengthOf(arg: string) {
        return new SQLFunction(`length(${arg})`);
    }

    public static distinct(arg: string) {
        return new SQLFunction(`distinct ${arg}`);
    }

    public end() {
        return this.output;
    }
}