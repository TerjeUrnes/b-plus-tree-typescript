export var RemoveStatus;
(function (RemoveStatus) {
    RemoveStatus[RemoveStatus["Unknown"] = 0] = "Unknown";
    RemoveStatus[RemoveStatus["NotFound"] = 1] = "NotFound";
    RemoveStatus[RemoveStatus["RemovedComplete"] = 2] = "RemovedComplete";
    RemoveStatus[RemoveStatus["MinKeyRemoved"] = 3] = "MinKeyRemoved";
    RemoveStatus[RemoveStatus["UnderflowAfterRemove"] = 4] = "UnderflowAfterRemove";
    RemoveStatus[RemoveStatus["UnderflowAfterMinKeyRemoved"] = 5] = "UnderflowAfterMinKeyRemoved";
})(RemoveStatus || (RemoveStatus = {}));
