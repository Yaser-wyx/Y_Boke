/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */

import {CliInterface} from "../../core/interface/cli_interface";
import {Description} from "./description";
import {YBoke} from "../../core";

export class HelpCli implements CliInterface {
    readonly defaultOption?: object;
    readonly description: Description;
    readonly func = (...args: string[]) => {

    }
    readonly name: string;
    readonly version: number | string;
    readonly args: { name: string; option: boolean; defaultVal?: string }[] = [];

    constructor(ctx: YBoke) {
        this.name = "help";
        this.version = ctx.version;
        this.description = new Description("For more information on a specific command,type boke help command-name",
            "boke help [command]", ctx.version)
        this.args.push({name: "command-name", option: true})
    }

    run(...args: string[]): void {
        this.func(...args)
    }

}