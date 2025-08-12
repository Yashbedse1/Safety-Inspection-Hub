"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProblemDetailsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetailsFilter = void 0;
const common_1 = require("@nestjs/common");
let ProblemDetailsFilter = ProblemDetailsFilter_1 = class ProblemDetailsFilter {
    logger = new common_1.Logger(ProblemDetailsFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let problemDetails = {
            type: 'about:blank',
            title: 'Internal Server Error',
            status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            detail: 'An unexpected error occurred',
            instance: request.url,
        };
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (exceptionResponse && typeof exceptionResponse === 'object') {
                problemDetails = {
                    type: exceptionResponse.type || 'about:blank',
                    title: exceptionResponse.title || exceptionResponse.message || 'HTTP Exception',
                    status: exceptionResponse.status || status,
                    detail: exceptionResponse.detail || exceptionResponse.message,
                    instance: request.url,
                    code: exceptionResponse.code,
                };
            }
            else {
                problemDetails = {
                    type: 'about:blank',
                    title: exceptionResponse.message || 'HTTP Exception',
                    status: status,
                    detail: exceptionResponse.message || 'An error occurred',
                    instance: request.url,
                };
            }
        }
        else {
            this.logger.error('Unexpected error:', exception);
        }
        response
            .status(status)
            .header('Content-Type', 'application/problem+json')
            .json(problemDetails);
    }
};
exports.ProblemDetailsFilter = ProblemDetailsFilter;
exports.ProblemDetailsFilter = ProblemDetailsFilter = ProblemDetailsFilter_1 = __decorate([
    (0, common_1.Catch)()
], ProblemDetailsFilter);
//# sourceMappingURL=problem-details.filter.js.map