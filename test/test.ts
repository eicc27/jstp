import "mocha";
import * as chai from "chai";
import { table, column, nn, uni, pri, ai, fri } from "../src/props";
import { Table } from "../src/sql";
import { ConditionChain } from "../src/condition";

@table("Classroom")
export class Class {
    @column("classroom_name")
    @nn
    @uni
    private name: string;

    @pri
    @ai(1, 1)
    private no: number;

    @fri("students", "stuno")
    private stuno: string;
}

describe('Class Annotations Test', () => {
    it('should be table classroom', () => {
        const alias = Reflect.getMetadata('class:alias', Class);
        chai.expect(alias).to.equal('Classroom');
    });

    it('proptery `name` should have alias classroom_name, and not null', () => {
        const prop = Reflect.getMetadata('name', Class.prototype);
        chai.expect(prop.alias).to.equal('classroom_name');
        chai.expect(prop.nn).true;
    });
});

describe('[Single]Condition Chain tests', () => {
    it('a = b', () => {
        const query = ConditionChain.eq('a', 'b').end().toString();
        chai.expect(query).to.eq('a = b;');
    });

    it('a != b', () => {
        const query = ConditionChain.neq('a', 'b').end().toString();
        chai.expect(query).to.eq('a != b;');
    });

    it('a > b', () => {
        const query = ConditionChain.gt('a', 'b').end().toString();
        chai.expect(query).to.eq('a > b;');
    });

    it('a >= b', () => {
        const query = ConditionChain.gte('a', 'b').end().toString();
        chai.expect(query).to.eq('a >= b;');
    });

    it('a < b', () => {
        const query = ConditionChain.lt('a', 'b').end().toString();
        chai.expect(query).to.eq('a < b;');
    });

    it('a <= b', () => {
        const query = ConditionChain.lte('a', 'b').end().toString();
        chai.expect(query).to.eq('a <= b;');
    });

    it('a like b', () => {
        const query = ConditionChain.like('a', 'b').end().toString();
        chai.expect(query).to.eq('a like b;');
    });

    it('a not like b', () => {
        const query = ConditionChain.nlike('a', 'b').end().toString();
        chai.expect(query).to.eq('a not like b;');
    });

    it('a glob b', () => {
        const query = ConditionChain.glob('a', 'b').end().toString();
        chai.expect(query).to.eq('a glob b;');
    });

    it('a not glob b', () => {
        const query = ConditionChain.nglob('a', 'b').end().toString();
        chai.expect(query).to.eq('a not glob b;');
    });

    it('a in (b,c,d)', () => {
        const query = ConditionChain.in('a', ['b', 'c', 'd']).end().toString();
        chai.expect(query).to.eq('a in (b,c,d);');
    });

    it('a not in (b,c,d)', () => {
        const query = ConditionChain.nin('a', ['b', 'c', 'd']).end().toString();
        chai.expect(query).to.eq('a not in (b,c,d);');
    });

    it('a between b and c', () => {
        const query = ConditionChain.between('a', 'b', 'c').end().toString();
        chai.expect(query).to.eq('a between b and c;');
    });

    it('a not between b and c', () => {
        const query = ConditionChain.nbetween('a', 'b', 'c').end().toString();
        chai.expect(query).to.eq('a not between b and c;');
    });

    it('a is null', () => {
        const query = ConditionChain.isnull('a').end().toString();
        chai.expect(query).to.eq('a is null;');
    });

    it('a is not null', () => {
        const query = ConditionChain.nnull('a').end().toString();
        chai.expect(query).to.eq('a is not null;');
    });
});

describe('[compound]Condition Chain tests', () => {
    it('and chain for all conditions', () => {
        const query = ConditionChain.eq('a', 'b').eq('a', 'c').neq('a', 'b')
            .gt('a', 'b').gte('a', 'b')
            .lt('a', 'b').lte('a', 'b')
            .like('a', 'b').nlike('a', 'b')
            .glob('a', 'b').nglob('a', 'b')
            .in('a', ['b', 'c', 'd']).nin('a', ['b', 'c', 'd'])
            .between('a', 'b', 'c').nbetween('a', 'b', 'c')
            .isnull('a').nnull('a').end().toString();
        const expectation = 'a = b and a = c and a != b and a > b and a >= b '
            + 'and a < b and a <= b and a like b and a not like b and a glob b and a not glob b '
            + 'and a in (b,c,d) and a not in (b,c,d) and a between b and c and a not between b and c '
            + 'and a is null and a is not null;';
        chai.expect(query).to.eq(expectation);
    });

    it('or chain for all conditions', () => {
        const query = ConditionChain.eq('a', 'b').or().eq('a', 'c').or().neq('a', 'b')
            .or().gt('a', 'b').or().gte('a', 'b')
            .or().lt('a', 'b').or().lte('a', 'b')
            .or().like('a', 'b').or().nlike('a', 'b')
            .or().glob('a', 'b').or().nglob('a', 'b')
            .or().in('a', ['b', 'c', 'd']).or().nin('a', ['b', 'c', 'd'])
            .or().between('a', 'b', 'c').or().nbetween('a', 'b', 'c')
            .or().isnull('a').or().nnull('a').or().end().toString();
        const expectation = 'a = b or a = c or a != b or a > b or a >= b '
            + 'or a < b or a <= b or a like b or a not like b or a glob b or a not glob b '
            + 'or a in (b,c,d) or a not in (b,c,d) or a between b and c or a not between b and c '
            + 'or a is null or a is not null;';
        chai.expect(query).to.eq(expectation);
    });
});