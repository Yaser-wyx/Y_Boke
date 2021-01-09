/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */
import {sep} from "path"

const array = ["test1.js", "test1.html", "test1.txt"]
const regExpStr = "("+ array.reduce((previousValue, currentValue) => {
    return previousValue+"|"+currentValue
})+")$"

const regExp = RegExp(regExpStr)
console.log(sep)