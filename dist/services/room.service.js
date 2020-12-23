"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const room_model_1 = require("../models/room.model");
const mongoose_2 = require("mongoose");
let RoomService = class RoomService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }
    async list() {
        return this.roomModel.find();
    }
    async getRoom(id) {
        const room = await this.roomModel.findOne({
            idroom: id
        });
        if (!room) {
            throw new common_1.HttpException({
                status: 404,
                error: 'ROOM_NOT_FOUND',
            }, 404);
        }
        return room;
    }
    async create(input) {
        const irooms = await this.roomModel.find();
        const idroom = irooms.length + 1000 + '';
        const createRoom = new this.roomModel({
            player1: input.player1,
            player2: input.player2,
            idroom,
        });
        await createRoom.save();
        return createRoom;
    }
    async join(input) {
        const iroom = await this.roomModel.findOne({
            idroom: input.idroom,
        });
        if (!iroom) {
            throw new common_1.HttpException({
                status: 404,
                error: 'ROOM_NOT_FOUND',
            }, 404);
        }
        if (iroom.player1 !== null) {
            if (iroom.player2 !== null) {
                throw new common_1.HttpException({
                    status: 422,
                    error: 'ROOM_FULL',
                }, 422);
            }
            else {
                iroom.player2 = input.player;
            }
        }
        else {
            iroom.player1 = input.player;
        }
        await iroom.save();
        return iroom;
    }
    async outRoom(input) {
        const iroom = await this.roomModel.findOne({
            idroom: input.idroom,
        });
        if (!iroom) {
            throw new common_1.HttpException({
                status: 404,
                error: 'ROOM_NOT_FOUND',
            }, 404);
        }
        if (iroom.player1 === input.player) {
            iroom.player1 = null;
        }
        else {
            iroom.player2 = null;
        }
        await iroom.save();
        if (iroom.player1 === null && iroom.player2 === null) {
            await this.roomModel.findOneAndDelete({
                idroom: input.idroom,
            });
        }
        return iroom;
    }
};
RoomService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(room_model_1.Room.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map