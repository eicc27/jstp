import { ConditionChain } from "./condition";
import { SQLFunction } from "./function";
import { SelectionPostfix } from "./postfix";
import { ai, column, nn, table } from "./props";
import { Table } from "./sql";

@table('Room')
class Room {
    @ai() id: number;
    @nn kdno: string;
    @nn kcno: string;
    @nn ccno: string;
    @nn kdname: string;
    @nn exptime: string;
    @column() papername: string;
}

const t = new Table(Room, './db/lab1.db');
const query1 = t.select(
    SQLFunction.count('*').abs().end(),
    ConditionChain.eq('kcno', '1').end(),
    null,
);
console.log(query1);
console.log(t.prepare(query1));
const query2 = t.select(
    SQLFunction.avg('id').end(),
    ConditionChain.lt('kcno', '1').or().eq('kcno', '1').end(),
    SelectionPostfix.groupBy(['ccno']).limit(2).end(),
)
console.log(query2);
console.log(t.prepare(query2));