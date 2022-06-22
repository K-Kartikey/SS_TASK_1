// const { default: test } = require("node:test");
// import {add} from './jestpracticefunc';

// const { default: test } = require('node:test');
const funcs= require( './jestpracticefunc.js');
 

test("should find sum of two numbers",()=>{

    // Arrange
    const num1=3;
    const num2=5;
    //Act
    const res=funcs.add(num1,num2);
    //Assert
    const expectedval=num1+num2;

    expect(res).toBe(expectedval);
});

test("should count items in array correctly",()=>{
    const arr=[1,2,3,4,5,6];
    const res=funcs.count(arr);
    const expectedval=arr.length;
    expect(res).toBe(expectedval);
})