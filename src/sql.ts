import Database from 'better-sqlite3';

export function sqlify(v: string | number | Date) {
    if (typeof v == 'string') {
        return `'${v}'`;
    } else if (typeof v == 'number') {
        return v.toString();
    } else {
        // todo
    }
}

export class Table<C> {
    private readonly tableName: string;
    private readonly connection;

    public constructor(c: C, dbDir?: string) {
        this.tableName = Reflect.getMetadata('class:alias', c);
        if (!this.tableName)
            this.tableName = c.constructor.name;
        this.connection = new Database(dbDir);
    }

    public selectAll(where?: string) {
        if (where)
            return `select * from \`${this.tableName}\` where ${where}`;
        else
            return `select * from \`${this.tableName}\``;
    }

    public select(prefix?: string, where?: string, postfix?: string) {
        const queryPrefix = prefix ? prefix : '*';
        const queryWhere = where ? ` where ${where}` : '';
        const queryPostfix = postfix ? ` ${postfix}` : '';
        return `select ${queryPrefix} from \`${this.tableName}\`${queryWhere}${queryPostfix}`;
    }

    public prepare(query: string) {
        return this.connection.prepare(query).all();
    }
}