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
var ChecklistsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistsService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const checklist_utils_1 = require("./utils/checklist.utils");
let ChecklistsService = ChecklistsService_1 = class ChecklistsService {
    logger = new common_1.Logger(ChecklistsService_1.name);
    checklists = [];
    constructor() {
        this.loadChecklists();
    }
    loadChecklists() {
        try {
            const dataPath = (0, path_1.join)(process.cwd(), 'data', 'checklists.json');
            const rawData = (0, fs_1.readFileSync)(dataPath, 'utf8');
            this.checklists = JSON.parse(rawData);
            this.logger.log(`Loaded ${this.checklists.length} checklists from data file`);
        }
        catch (error) {
            this.logger.error('Failed to load checklists data:', error);
            throw new Error('Failed to load checklists data');
        }
    }
    getAllSummaries() {
        return this.checklists.map(checklist_utils_1.transformToSummary);
    }
    getById(id) {
        return this.checklists.find(checklist => checklist.id === id) || null;
    }
    exists(id) {
        return this.checklists.some(checklist => checklist.id === id);
    }
};
exports.ChecklistsService = ChecklistsService;
exports.ChecklistsService = ChecklistsService = ChecklistsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChecklistsService);
//# sourceMappingURL=checklists.service.js.map