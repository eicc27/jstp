"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fri = exports.ai = exports.pri = exports.uni = exports.nn = exports.column = exports.table = void 0;
/**
 * Includes all of the static decorators which defines the metadata of the class.
 */
require("reflect-metadata");
/**
 * Declares the literal table name in an SQL table of a class.
 *
 * Optional. If a class name is identical with its table name, it is unnecessary.
 *
 * It *does not* imply that every property(or member variable) is its column.
 * Due to some TS mechanisms, for each property desired as a column,
 * it should be **manually annotated** with column-related annotations.
 *
 * Usage: `@table(...)` (with parentheses after the annotation)
 *
 * @param alias The literal table name of the class. Leaving empty means the class name
 * is the table name(equivalent to not annotating this class with `@table()`).
 */
function table(alias) {
    return (target) => {
        Reflect.defineMetadata('class:alias', alias ? alias : target.name, target);
    };
}
exports.table = table;
function setMetadataConfig(target, key, config) {
    const metadata = Reflect.getMetadata(key, target);
    if (metadata) {
        Object.assign(metadata, config);
        Reflect.defineMetadata(key, metadata, target);
    }
    else {
        Reflect.defineMetadata(key, config, target);
    }
}
/**
 * **Declares a property as a column**, with no other SQL column properties
 * like `not null`, `primary key`, etc.
 *
 * If the property has other SQL column properties, its only use is to declare
 * an alias of that key, which represents its literal name of the column.
 *
 * If a property is required as a common SQL column, with no other column properties,
 * this `@column(...)` must be
 * used instead of simply adding the annotation `@table(...)` on that
 * class. This is due to some TS reflection mechanisms.
 *
 * Usage: `@column(...)` (with parentheses after the annotation)
 *
 * @param alias The literal column name of the property. Leaving empty means the property name
 * is the column name.
 */
function column(alias) {
    return (target, key) => {
        const config = { alias: alias ? alias : key };
        setMetadataConfig(target, key, config);
    };
}
exports.column = column;
/**
 * **Declares a property as `NOT NULL`,** which means the value of this column
 * cannot contain any null value. The value must be explicitly provided when
 * performing an insertion.
 *
 * Usage: `@nn` (with no parentheses after the annotation)
 */
const nn = (target, key) => {
    const config = { nn: true };
    setMetadataConfig(target, key, config);
};
exports.nn = nn;
/**
 * **Declares a property as `UNIQUE`,** which means each value of this column
 * must be different from each other.
 * Usage: `@uni` (with no parentheses after the annotation)
 */
const uni = (target, key) => {
    const config = { uni: true };
    setMetadataConfig(target, key, config);
};
exports.uni = uni;
/**
 * **Declares a property as `PRIMARY KEY`,** which means each row of the data
 * can be *uniquely defined* with that key.
 *
 * Primary key requires the key to be `NOT NULL` first. It will be configured automatically
 * while parsing SQL table-related queries.
 *
 * It is also feasible to declare a *united primary key*, if it is found that
 * there is more than one primary key declaration in one class.
 *
 * Usage: `@pri` (with no parentheses after the annotation)
 */
const pri = (target, key) => {
    const config = { pri: true };
    setMetadataConfig(target, key, config);
};
exports.pri = pri;
/**
 * **Declares a property as `AUTOINCREMENT`**, which means without explicitly
 * providing the value of this key on insertion, the numerical value of the key would automatically
 * increase accoring to predefined settings.
 *
 * Auto increment requires the key to be `PRIMARY KEY` first. It will be configured automatically
 * while parsing SQL table-related queries.
 *
 * Usage: `@ai(...)` (with parentheses after the annotation)
 *
 * @param startFrom **Default 1.** Defines where the auto-increment starts from.
 * @param incrBy **Default 1.** Defines the step of the increment.
 */
function ai(startFrom, incrBy) {
    return (target, key) => {
        const config = {
            ai: {
                startFrom: startFrom ? startFrom : 1,
                incrBy: incrBy ? incrBy : 1,
            }
        };
        setMetadataConfig(target, key, config);
    };
}
exports.ai = ai;
/**
 * **Declares a property as a FOREIGN KEY**, which connects the key of one table to the other.
 *
 * The way of connection has 3 options:
 *  - `restrict` means if any changes take place in the referred table and destroys the connection
 *  of the foreign key, the SQL engine **throws an error** to prevent the operation.
 *  - `cascade` means **synchronizing the changes** with these two tables.
 *  - `setNull` means **setting null** to the conflicting values of the foreign key
 * (not the key in the referred table).
 *
 * Usage: `@fri(...)` (with parentheses after the annotation)
 *
 * @param refTable The table to be referred.
 * @param refColumn The column to be referred.
 * @param onDelete The operation of deletion when conflict occurs.
 * @param onUpdate The operation of update when conflict occurs.
 */
function fri(refTable, refColumn, onDelete, onUpdate) {
    return (target, key) => {
        const config = {
            fri: {
                table: refTable,
                column: refColumn,
                onDelete: onDelete ? onDelete : 'restrict',
                onUpdate: onUpdate ? onUpdate : 'restrict',
            }
        };
        setMetadataConfig(target, key, config);
    };
}
exports.fri = fri;
//# sourceMappingURL=props.js.map