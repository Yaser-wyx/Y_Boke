/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */
import * as commander from "commander"
import {YBoke} from "../src/core";

const yBoke = new YBoke()
const cli = yBoke.cliExtend;

function initTest() {
    cli.parse(['--init', './yBoke'], {from: 'user'})
    if (cli.init) {
        cli.get("init").run(cli.init)
    }
}

import * as chokidar from "chokidar"
import {info} from "../src/logger";

function watch() {
    chokidar.watch('./yBoke').on('add', (...args:any[]) => {
        for (let i = 0; i < args.length; i++) {
            info(args[i])
        }
    })
}

// initTest()

// watch()
import {sep,parse,dirname,resolve} from "path"

const array = ["test1.js", "test1.html", "test1.txt"]
const regExpStr = "^("+ array.reduce((previousValue, currentValue) => {
    return previousValue+"|"+currentValue
})+")$"


console.log(resolve("D:\\Y_Boke\\yarn.lock\n"))
