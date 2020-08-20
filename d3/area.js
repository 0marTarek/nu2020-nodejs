function area(x)
{
    return x*x
}

function test(callbackfunction,x)
{
    return callbackfunction(x)
}
console.log(test(area,"5"));