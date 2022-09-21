"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.SETEX = exports.connectRedis = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await client.on( "connect", () => {
            //     console.log( "connected to redis" )
            // } )
            yield client.connect();
        }
        catch (e) {
            client.on("error", (err) => {
                console.log(`REDIS Client Error ${err}`);
            });
        }
    });
}
exports.connectRedis = connectRedis;
function SETEX(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const redisCode = yield client.setEx(key, 60 * 15, value);
            return redisCode;
        }
        catch (e) {
            console.log(`setex error ${e}`);
        }
    });
}
exports.SETEX = SETEX;
function GET(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const redisCode = yield client.get(key);
            return redisCode;
        }
        catch (e) {
            console.log(`get error ${e}`);
        }
    });
}
exports.GET = GET;
