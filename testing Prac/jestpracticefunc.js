module.exports={}
module.exports.add=(num1,num2)=>{
    return num1+num2;
}


module.exports.count=(numbers)=>{
    let c=0;
    for(const n of numbers)
    {
        c+=1;
    }
    return c;
}
// module.exports=count;
module.exports=count;
module.exports=add;