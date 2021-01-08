/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */

import {CliInterface} from "../../core/interface/cli_interface";
import {Description} from "./description";
import {YBoke} from "../../core";
import * as fs from "fs"
import {sep} from "path"
import {info} from "../../logger";

export class InitCli implements CliInterface {
    readonly description: Description;
    readonly name: string;
    readonly version: number | string;
    readonly args: { name: string; option: boolean; defaultVal?: string }[] = [];

    constructor(ctx: YBoke) {
        this.name = "init";
        this.version = ctx.version;
        this.description = new Description("create a new YBoke folder at the specified path or the current directory.",
            "boke init [path]", ctx.version, ["path"])
        this.args.push({name: "path", option: true, defaultVal: process.cwd()});
    }

    readonly func = (...args: string[]) => {
        let path = args[0];//获取初始化路径
        if (!fs.existsSync(path)) {
            //如果不存在，则创建目录
            fs.mkdirSync(path)
        }
        const getNewPath = (folderName: string) => {
            return `${path}${sep}${folderName}`
        }
        const defaultFolders = ["themes", "plugins", "sources", `sources${sep}post`, `sources${sep}draft`]
        for (let i = 0; i < defaultFolders.length; i++) {
            fs.mkdir(getNewPath(defaultFolders[i]), () => {
                info(`文件夹：${defaultFolders[i]}创建`)
            })
        }
        fs.writeFile(getNewPath("_config.json"), "{\"data\":\"testData\"}", () => {
            info(`文件：_config.json创建`)
        });
    }

    //todo 去掉，没有价值的代码
    run(...args: string[]): void {
        this.func(...args)
    }

}
