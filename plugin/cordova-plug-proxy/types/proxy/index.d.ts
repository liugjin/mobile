import { IonicNativePlugin } from '@ionic-native/core';
export interface opts {
    server_addr: string;
    server_port: number;
    ctype: string;
    server_name: string;
    bind_addr: string;
    bind_port: number;
}
/**
 * @name proxy
 * @description
 * This plugin does something
 *
 * @usage
 * ```typescript
 * import { proxy } from '@ionic-native/proxy';
 *
 *
 * constructor(private proxy: proxy) { }
 *
 * ...
 *
 *
 * this.proxy.functionName('Hello', 123)
 *   .then((res: any) => console.log(res))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
export declare class proxyOriginal extends IonicNativePlugin {
    /**
     * This function does something
     * @param arg1 {string} Some param to configure something
     * @param arg2 {number} Another param to configure something
     * @return {Promise<any>} Returns a promise that resolves when something happens
     */
    connect(opts: opts): Promise<any>;
}

export declare const proxy: proxyOriginal;