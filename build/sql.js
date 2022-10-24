"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.sqlify = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
function sqlify(v) {
    if (typeof v == 'string') {
        return `'${v}'`;
    }
    else if (typeof v == 'number') {
        return v.toString();
    }
    else {
        // todo
    }
}
exports.sqlify = sqlify;
class Table {
    tableName;
    connection;
    constructor(c, dbDir) {
        this.tableName = Reflect.getMetadata('class:alias', c);
        if (!this.tableName)
            this.tableName = c.constructor.name;
        this.connection = new better_sqlite3_1.default(dbDir);
    }
    selectAll(where) {
        if (where)
            return `select * from \`${this.tableName}\` where ${where}`;
        else
            return `select * from \`${this.tableName}\``;
    }
    select(prefix, where, postfix) {
        const queryPrefix = prefix ? prefix : '*';
        const queryWhere = where ? ` where ${where}` : '';
        const queryPostfix = postfix ? ` ${postfix}` : '';
        return `select ${queryPrefix} from \`${this.tableName}\`${queryWhere}${queryPostfix}`;
    }
    prepare(query) {
        return this.connection.prepare(query).all();
    }
}
exports.Table = Table;
//# sourceMappingURL=sql.js.map