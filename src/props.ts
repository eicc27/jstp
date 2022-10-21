/**
 * Includes all of the static decorators which defines the metadata of the class.
 */
import "reflect-metadata";

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

export function column(alias?: string): PropertyDecorator {
    return (target, key) => {
        const config = { alias: alias ? alias : key };
        setMetadataConfig(target, key, config);
    };
}

export const nn: PropertyDecorator = (target, key) => {
    const config = { nn: true };
    setMetadataConfig(target, key, config);
};

export const uni: PropertyDecorator = (target, key) => {
    const config = { uni: true };
    setMetadataConfig(target, key, config);
};

export const pri: PropertyDecorator = (target, key) => {
    const config = { pri: true };
    setMetadataConfig(target, key, config);
};

export function ai(startFrom?: number, incrBy?: number, maxVal?: number, cycle?: boolean): PropertyDecorator {
    return (target, key) => {
        const config = {
            ai: {
                startFrom: startFrom ? startFrom : 1,
                incrBy: incrBy ? incrBy : 1,
                maxVal: maxVal,
                cycle: cycle
            }
        };
        setMetadataConfig(target, key, config);
    };
}

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