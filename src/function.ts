type unaryExpr = (arg: string | number) => SQLFunction;
type noArgsExpr = () => SQLFunction;
interface ISQLFunction {
    count: unaryExpr;
    max: unaryExpr;
    min: unaryExpr;
    avg: unaryExpr;
    sum: unaryExpr;
    random: noArgsExpr;
    abs: unaryExpr;
    upper: unaryExpr;
    lower: unaryExpr;
    length: unaryExpr;
}

export class SQLFunction implements ISQLFunction {

}