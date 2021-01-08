/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */

export class Description {
    private _desc: string;
    private _usage: string;
    private _version: number | string;
    private _args: [string] = ["None"];

    constructor(desc: string, usage: string, version: number | string, args?: [string]) {
        this._desc = desc;
        this._usage = usage;
        this._version = version;
        if (args)
            this._args = args;
    }

    get desc(): string {
        return this._desc;
    }

    get usage(): string {
        return this._usage;
    }

    get version(): number | string {
        return this._version;
    }

    get args(): [string] {
        return this._args;
    }

    print(): string {
        return `Version:\t ${this._version}\t\n
                Description:\t ${this._desc} \t\n
                Usage:\t ${this._usage}\t\n
                Args: \t[${this._args.concat(",")}]\t`
    }
}