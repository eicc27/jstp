import "reflect-metadata";
import { ai, column, fri, nn, pri, table, uni } from "./props";

@table("Classroom")
export class Class {
    @column("classroom_name")
    @nn
    @uni
    private name: string;

    @pri
    @ai(1, 1, 1000, true)
    private no: number;

    @fri("students", "stuno")
    private stuno: string;
}