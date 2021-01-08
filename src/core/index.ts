/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description: 核心模块，用于加载各个模块系统
 */

import {CliExtend} from "../extend/cli_extend";
import {EventEmitter} from "events";
import {cliInit} from "../plugins/cli";
import {ModuleEnums} from "./enums/module_enums";
import {error} from "../logger";

export class YBoke extends EventEmitter {
    private readonly _cliExtend: CliExtend;
    private readonly _version = require("../../package.json").version

    constructor() {
        super()
        this._cliExtend = new CliExtend();
        cliInit(this)
    }

    get cliExtend(): CliExtend {
        return this._cliExtend;
    }

    get version(): string {
        return this._version;
    }

    call(type: ModuleEnums, funcName: string, ...options: string[]) {
        switch (type) {
            case ModuleEnums.CLI: {
                const cli = this.cliExtend.get(funcName);
                if (cli) {
                    cli.run(...options)
                } else {
                    error(`${funcName} is not exist!`)
                }
                break
            }
        }
    }
}