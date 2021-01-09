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
        const hasTargetFile = watcher.watchFileNameTarget && watcher.watchFileNameTarget.length > 0

        const hasTargetFileSuffix = watcher.watchFileSuffixTarget && watcher.watchFileSuffixTarget.length > 0

        const testPath = (path: string): boolean => {
            //用来测试是否是文件夹下指定文件类型或文件名的监听
            if (fs.statSync(path).isFile()) {
                //发生变化的是文件
                //1. 先匹配文件后缀
                if (hasTargetFileSuffix) {
                    //匹配文件后缀
                    // @ts-ignore
                    let watchFileSuffixFilter = watcher.watchFileSuffixTarget.map(value => {
                        //去掉后缀的.，后续进行统一添加
                        if (value[0] === '.') {
                            return value.substr(1);
                        }
                    })
                    const regExpStr = "\\.(" + watchFileSuffixFilter.reduce(
                        (previousValue, currentValue) => {
                            return previousValue + "|" + currentValue
                        }) + ")$";//生成后缀正则
                    if (RegExp(regExpStr).test(path)) {
                        return true
                    }
                }
                //2. 若没有匹配的文件后缀，再匹配文件名
                if (hasTargetFile) {
                    //匹配文件名
                    // @ts-ignore
                    const regExpStr = "^(" + watcher.watchFileNameTarget.reduce((previousValue, currentValue) => {
                        return previousValue + "|" + currentValue
                    }) + ")$"
                    const tempPath = path.substr(path.lastIndexOf('\\') + 1)
                    if (RegExp(regExpStr).test(tempPath)) {
                        return true
                    }
                }
            }
            return false;
        }
        chokidar.watch(watcher.watchPath, watcher.watchOption).on("all",
            (eventName, path, stats) => {
                if (watcher.watchEvent !== 'all' && watcher.watchEvent !== eventName) {
                    //不是all，同时当前事件也不是要接受的事件
                    return;
                }
                //当前是all，或者要接受的事件与触发的事件一致
                if (fs.statSync(watcher.watchPath).isFile()) {
                    //如果要监听的路径是一个文件，则判断文件路径是否一致
                    if (watcher.watchPath === path) {
                        //一致则调用
                        watcher.watchAction(eventName, path, stats)
                    }
                } else if (fs.statSync(watcher.watchPath).isDirectory()) {
                    //要监听的是一个目录
                    if (hasTargetFile||hasTargetFileSuffix){
                        if (testPath(path)){
                            //通过测试
                            watcher.watchAction(eventName, path, stats)
                        }
                    }else{
                        //没有目标文件要求
                        watcher.watchAction(eventName, path, stats)
                    }
                }

            })

    }

}