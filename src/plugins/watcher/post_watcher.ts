/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */

import {WatcherInterface} from "../../core/interface/watcher_interface";
import * as fs from "fs";

export class PostWatcher implements WatcherInterface{
    watchEvent: "all" | "add" | "change" | "addDir" | "unlink" | "unlinkDir";
    watchPath: string;

    watchAction(eventName: string, path: string, stats?: fs.Stats): void {
    }

}