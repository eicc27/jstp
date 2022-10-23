function sqlify(v: string | number) {
    if (typeof v == 'string') {
        return `'${v}'`;
    } else if (typeof v == 'number') {
        return v;
    }
}

export class Table<C> {
    private readonly tableName: string;

    public constructor(c: C) {
        this.tableName = Reflect.getMetadata('class:alias', c);
        if (!this.tableName)
            this.tableName = c.constructor.name;
    }

    public selectAll(where?: string) {
        if (where)
            return `select * from \`${this.tableName}\` where ${where}`;
        else
            return `select * from \`${this.tableName}\``;
    }
}