/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description: 监听器扩展，可以监听指定类型的文件，指定文件名的文件以及指定路径的文件夹
 */

import {ExtendInterface} from "../core/interface/extend_interface";
import {WatcherInterface} from "../core/interface/watcher_interface";
import {FSWatcher} from "chokidar";
import * as chokidar from "chokidar"
import * as fs from "fs";

export class WatcherExtend extends FSWatcher implements ExtendInterface {
    plugins: Record<string, object> = {};

    get(name: string): object {
        return this.plugins[name];
    }

    list(): {} {
        return this.plugins;
    }

    register(watcher: WatcherInterface): void {
        //监听器注册
        const needFileFilter = fs.statSync(watcher.watchPath).isDirectory()
            && watcher.watchFileNameFilter && watcher.watchFileNameFilter.length > 0
        const needFileSuffixFilter = fs.statSync(watcher.watchPath).isDirectory()
            && watcher.watchFileSuffixFilter && watcher.watchFileSuffixFilter.length > 0
        const watcherFilterHandle = (path: string) => {
            //用来处理文件夹下指定文件类型或文件名的监听
            if (fs.statSync(path).isFile()) {
               //发生变化的是文件
                if (needFileSuffixFilter){
                    //匹配文件后缀
                    const regEx = ()
                    // @ts-ignore
                    for (let i = 0; i < watcher.watchFileSuffixFilter.length; i++) {

                    }
                }

            }
        }

        if (watcher.watchEvent === "all") {
            chokidar.watch(watcher.watchPath, watcher.watchOption).on("all",
                watcher.watchAction)
        } else {
            chokidar.watch(watcher.watchPath, watcher.watchOption).on(watcher.watchEvent,
                ((path, stats) => {
                    watcher.watchAction(watcher.watchEvent, path, stats);
                }))
        }
    }

}