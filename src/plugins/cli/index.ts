/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description: 导出所有的cli插件
 */

import {YBoke} from "../../core";
import {VersionCli} from "./version";
import {HelpCli} from "./help";
import {InitCli} from "./init";

export function cliInit(ctx: YBoke) {
    //加载插件列表
    ctx.cliExtend.register(new InitCli(ctx))
}