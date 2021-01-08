import {getLogger} from "log4js";

const logger = getLogger()

const wrapMsg = (...msg:string[]):string=>{
    let msgReturn=""
    for (let i = 0; i < msg.length; i++) {
        msgReturn+=msg[i]+"  ";
    }
    return msgReturn
}
export const info = (...msg: string[]) => {
    logger.level = "info"
    logger.info(wrapMsg(...msg))
}

export const warn = (...msg: string[]) => {
    logger.level = "warn"
    logger.warn(wrapMsg(...msg))
}

export const debug = (...msg: string[]) => {
    logger.level = "debug"
    logger.debug(wrapMsg(...msg))
}

export const error = (...msg: string[]) => {
    logger.level = "error"
    logger.error(wrapMsg(...msg))
}

