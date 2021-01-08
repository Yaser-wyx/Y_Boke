/*
 * Copyright (c) 2021. yaser. All rights reserved
 * Description:
 */

export interface ExtendInterface {
    plugins: Record<string, object> //所有注册的功能插件

    register(obj: object): void //注册功能插件

    list(): {};

    get(name: string): object;
}