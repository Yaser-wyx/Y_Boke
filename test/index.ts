/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */
import * as commander from "commander"
import {YBoke} from "../src/core";

/*
const yBoke = new YBoke()
const cli = yBoke.cliExtend;

function initTest() {
    cli.parse(['--init', './yBoke'], {from: 'user'})
    if (cli.init) {
        cli.get("init").run(cli.init)
    }
}
*/

import * as chokidar from "chokidar"
import {info} from "../src/logger";

function watch() {
    const watcher = chokidar.watch('./yBoke/sources');
    watcher.on('all', (eventName,path) => {
        info(eventName,path)
    })
    chokidar.watch('./yBoke/themes').on('all', (...args: any[]) => {
        for (let i = 0; i < args.length - 1; i++) {
            info(args[i])
        }
    })


    setTimeout(() => {
        watcher.close()
        info("1号监听器移除")
    }, 10 * 1000)
}

// initTest()

watch()
/*
import {sep, parse, dirname, resolve} from "path"

const array = ["test1.js", "test1.html", "test1.txt"]
const regExpStr = "^(" + array.reduce((previousValue, currentValue) => {
    return previousValue + "|" + currentValue
}) + ")$"


console.log(resolve("D:\\Y_Boke\\yarn.lock\n"))
*/
