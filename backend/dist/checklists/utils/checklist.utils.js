"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCompletionPercentage = calculateCompletionPercentage;
exports.calculatePendingActions = calculatePendingActions;
exports.transformToSummary = transformToSummary;
function calculateCompletionPercentage(checklist) {
    let totalItems = 0;
    let answeredItems = 0;
    for (const section of checklist.sections) {
        for (const item of section.items) {
            totalItems++;
            if (item.response === 'yes' || item.response === 'no' || item.response === 'n/a') {
                answeredItems++;
            }
        }
    }
    return totalItems === 0 ? 0 : Math.round((answeredItems / totalItems) * 100);
}
function calculatePendingActions(checklist) {
    let pendingCount = 0;
    for (const section of checklist.sections) {
        for (const item of section.items) {
            if (item.actionItem && ['open', 'pending', 'overdue'].includes(item.actionItem.status)) {
                pendingCount++;
            }
        }
    }
    return pendingCount;
}
function transformToSummary(checklist) {
    return {
        id: checklist.id,
        buildingName: checklist.buildingName,
        address: checklist.address,
        status: checklist.status,
        completion: calculateCompletionPercentage(checklist),
        lastUpdated: checklist.lastUpdated,
        pendingActions: calculatePendingActions(checklist),
    };
}
//# sourceMappingURL=checklist.utils.js.map