/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */

import {WatchOptions} from "chokidar";
import * as fs from "fs";

export interface WatcherInterface {
    readonly name:string
    readonly watchPath: string;
    readonly  watchEvent: "all" | "add" | "change" | "addDir" | 'unlink' | 'unlinkDir';
    readonly  watchFileNameTarget?: string[];//文件监听过滤器，只有在监听文件夹的时候才有用
    readonly  watchFileSuffixTarget?: string[];//文件后缀监听过滤器，只有在监听文件夹的时候才有用
    readonly watchOption?: WatchOptions;//chokidar的内置配置
    watchAction(eventName: string, path: string, stats?: fs.Stats): void
}