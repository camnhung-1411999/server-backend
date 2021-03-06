"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const history_controller_1 = require("../controllers/history.controller");
const history_service_1 = require("../services/history.service");
const history_model_1 = require("../models/history.model");
const user_model_1 = require("../models/user.model");
let HistoryModule = class HistoryModule {
};
HistoryModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: history_model_1.History.name,
                    useFactory: () => {
                        return history_model_1.historySchema;
                    }
                },
                {
                    name: user_model_1.User.name,
                    useFactory: () => {
                        return user_model_1.userSchema;
                    }
                }
            ]),
        ],
        controllers: [history_controller_1.HistoryController],
        providers: [history_service_1.HistoryService],
    })
], HistoryModule);
exports.HistoryModule = HistoryModule;
//# sourceMappingURL=history.module.js.map