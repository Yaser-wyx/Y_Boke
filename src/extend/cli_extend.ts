/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description: 命令行扩展
 */

import {ExtendInterface} from "../core/interface/extend_interface";
import {info} from "../logger";
import {CliInterface} from "../core/interface/cli_interface";
import * as commander from "commander"

export class CliExtend extends commander.Command implements ExtendInterface {
    readonly plugins: Record<string, CliInterface>={};

    constructor() {
        super();
    }

    get(name: string): CliInterface {
        return this.plugins[name.toLocaleLowerCase()];
    }

    list(): object {
        return this.plugins;
    }

    register(cli: CliInterface): void {
        info("注册Cli插件：" + cli.name);
        this.plugins[cli.name] = cli;
        let flags = `--${cli.name}`
        for (let i = 0; i < cli.args.length; i++) {
            const arg = cli.args[i]
            if (arg.option) {
                //可选参数
                flags += ` [${arg.name}]`
            } else {
                //必选参数
                flags += ` <${arg.name}>`
            }
        }
        this.option(flags, cli.description.desc)
    }

}