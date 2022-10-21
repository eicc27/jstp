/**
 * Includes all of the static decorators which defines the metadata of the class.
 */
import "reflect-metadata";

/**
 * Declares the literal table name in an SQL table of a class.
 * 
 * Optional. If a class name is identical with its table name, it is unnecessary.
 * 
 * It *does not* imply that every property(or member variable) is its column.
 * Due to some TS mechanisms, for each property desired as a column,
 * it should be **manually annotated** with column-related annotations. 
 * @param alias The literal table name of the class. Leaving empty means the class name
 * is the table name(equivalent to not annotating this class with `@table()`).
 */
export function table(alias?: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata('class:alias', alias ? alias : target.name, target);
    }
}

function setMetadataConfig(target: Object, key: string | symbol, config: any) {
    const metadata = Reflect.getMetadata(key, target);
    if (metadata) {
        Object.assign(metadata, config);
        Reflect.defineMetadata(key, metadata, target);

    } else {
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
 * @param alias The literal column name of the property. Leaving empty means the property name
 * is the column name.
 */
export function column(alias?: string): PropertyDecorator {
    return (target, key) => {
        const config = { alias: alias ? alias : key };
        setMetadataConfig(target, key, config);
    };
}

/**
 * **Declares a property as `NOT NULL`,** which means the value of this column
 * cannot contain any null value. The value must be explicitly provided when 
 * performing an insertion.
 * 
 * Usage: `@nn` (with no parentheses after the annotation)
 */
export const nn: PropertyDecorator = (target, key) => {
    const config = { nn: true };
    setMetadataConfig(target, key, config);
};

/**
 * **Declares a property as `UNIQUE`,** which means each value of this column
 * must be different from each other.
 * Usage: `@uni` (with no parentheses after the annotation)
 */
export const uni: PropertyDecorator = (target, key) => {
    const config = { uni: true };
    setMetadataConfig(target, key, config);
};

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
export const pri: PropertyDecorator = (target, key) => {
    const config = { pri: true };
    setMetadataConfig(target, key, config);
};

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
export function ai(startFrom?: number, incrBy?: number): PropertyDecorator {
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

/**
 * **Declares a property as a FOREIGN KEY**, which connects the key of one table to the other.
 * 
 * The way of connection has 3 options:
 *  - `restrict` means if any changes take place in the referred table and destroys the connection
 *  of the foreign key, the SQL engine **throws an error** to prevent the operation.
 *  - `cascade` means **synchronizing the changes** with these two tables.
 *  - `setNull` means **setting null** to the conflicting values of the foreign key
 * (not the key in the referred table).
 * @param refTable The table to be referred.
 * @param refColumn The column to be referred.
 * @param onDelete The operation of deletion when conflict occurs.
 * @param onUpdate The operation of update when conflict occurs.
 * @returns 
 */
export function fri(refTable: string, refColumn: string,
    onDelete?: 'restrict' | 'cascade' | 'setNull',
    onUpdate?: 'restrict' | 'cascade' | 'setNull'): PropertyDecorator {
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