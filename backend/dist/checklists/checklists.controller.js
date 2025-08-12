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
exports.ChecklistsController = void 0;
const common_1 = require("@nestjs/common");
const checklists_service_1 = require("./checklists.service");
let ChecklistsController = class ChecklistsController {
    checklistsService;
    constructor(checklistsService) {
        this.checklistsService = checklistsService;
    }
    getAllSummaries() {
        return this.checklistsService.getAllSummaries();
    }
    getById(id) {
        const checklist = this.checklistsService.getById(id);
        if (!checklist) {
            throw new common_1.NotFoundException({
                type: 'about:blank',
                title: 'Checklist not found',
                status: 404,
                detail: `Checklist with ID '${id}' was not found`,
                instance: `/api/checklists/${id}`,
                code: 'CHECKLIST_NOT_FOUND'
            });
        }
        return checklist;
    }
};
exports.ChecklistsController = ChecklistsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ChecklistsController.prototype, "getAllSummaries", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChecklistsController.prototype, "getById", null);
exports.ChecklistsController = ChecklistsController = __decorate([
    (0, common_1.Controller)('api/checklists'),
    __metadata("design:paramtypes", [checklists_service_1.ChecklistsService])
], ChecklistsController);
//# sourceMappingURL=checklists.controller.js.map