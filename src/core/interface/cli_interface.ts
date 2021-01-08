/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */

import {Description} from "../../plugins/cli/description";


export interface CliInterface {
    readonly name: string;
    readonly version: number | string;
    readonly func: Function;
    readonly args:{name:string,option:boolean,defaultVal?:string}[];
    readonly description: Description;
    run(...args:string[]):void
}

