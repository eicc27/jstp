import "mocha";
import * as chai from "chai";
import { Class } from "../src/index";

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