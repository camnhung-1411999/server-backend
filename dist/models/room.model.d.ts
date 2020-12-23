import * as mongoose from 'mongoose';
export declare type IRoom = Room & mongoose.Document;
export declare class Room {
    player1: string;
    player2: string;
    idroom: string;
}
export declare const roomSchema: mongoose.Schema<any>;