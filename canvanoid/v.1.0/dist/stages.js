"use strict";

var stages = [[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 - 1
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1 - 2
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 0], [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 5]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2 - 3
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [6, 6, 6, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 3, 3, 3]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3 - 4
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 3, 4, 9, 6, 0, 8, 1, 2, 3, 4, 0], [0, 3, 4, 9, 6, 7, 0, 1, 2, 3, 4, 9, 0], [0, 4, 9, 6, 7, 8, 0, 2, 3, 4, 9, 6, 0], [0, 9, 6, 7, 8, 1, 0, 3, 4, 9, 6, 7, 0], [0, 6, 7, 8, 1, 2, 0, 4, 9, 6, 7, 8, 0], [0, 7, 8, 1, 2, 3, 0, 9, 6, 7, 8, 1, 0], [0, 8, 1, 2, 3, 4, 0, 6, 7, 8, 1, 2, 0], [0, 1, 2, 3, 4, 9, 0, 7, 8, 1, 2, 3, 0], [0, 2, 3, 4, 9, 6, 0, 8, 1, 2, 3, 4, 0], [0, 3, 4, 9, 6, 7, 0, 1, 2, 3, 4, 9, 0], [0, 4, 9, 6, 7, 8, 0, 2, 3, 4, 9, 6, 0], [0, 9, 6, 7, 8, 1, 0, 3, 4, 9, 6, 7, 0], [0, 6, 7, 8, 1, 2, 0, 4, 9, 6, 7, 8, 0], [0, 7, 8, 1, 2, 3, 0, 9, 6, 7, 8, 1, 0]], [[0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0], // 4 - 5
[0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0], [0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0], [0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0], [0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0], [0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0], [0, 0, 9, 9, 5, 9, 9, 9, 5, 9, 9, 0, 0], [0, 0, 9, 9, 5, 9, 9, 9, 5, 9, 9, 0, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 0, 9, 9, 9, 9, 9, 9, 9, 0, 9, 0], [0, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 9, 0], [0, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 9, 0], [0, 0, 0, 0, 9, 9, 0, 9, 9, 0, 0, 0, 0], [0, 0, 0, 0, 9, 9, 0, 9, 9, 0, 0, 0, 0]], [[6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], // 5 - 6
[6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 10, 2, 10, 2, 10, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [2, 0, 2, 0, 10, 0, 2, 0, 10, 0, 2, 0, 2], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6]], [[0, 0, 0, 0, 0, 8, 8, 7, 0, 0, 0, 0, 0], // 6 - 7
[0, 0, 0, 0, 8, 8, 7, 7, 6, 0, 0, 0, 0], [0, 0, 0, 8, 8, 7, 7, 6, 6, 5, 0, 0, 0], [0, 0, 0, 8, 7, 7, 6, 6, 5, 5, 0, 0, 0], [0, 0, 8, 7, 7, 6, 6, 5, 5, 4, 4, 0, 0], [0, 0, 7, 7, 6, 6, 5, 5, 4, 4, 3, 0, 0], [0, 0, 7, 6, 6, 5, 5, 4, 4, 3, 3, 0, 0], [0, 0, 6, 6, 5, 5, 4, 4, 3, 3, 2, 0, 0], [0, 0, 6, 5, 5, 4, 4, 3, 3, 2, 2, 0, 0], [0, 0, 5, 5, 4, 4, 3, 3, 2, 2, 1, 0, 0], [0, 0, 0, 4, 4, 3, 3, 2, 2, 1, 0, 0, 0], [0, 0, 0, 4, 3, 3, 2, 2, 1, 1, 0, 0, 0], [0, 0, 0, 0, 3, 2, 2, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0]], [[0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0], // 7 - 8
[0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0], [0, 10, 10, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 10, 2, 10, 0, 0, 0, 0, 0], [0, 0, 0, 10, 0, 0, 3, 0, 0, 10, 0, 0, 0], [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0], [0, 0, 0, 10, 0, 0, 5, 0, 0, 10, 0, 0, 0], [0, 10, 0, 0, 0, 10, 6, 10, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0], [0, 10, 10, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0], [0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0]]];
//# sourceMappingURL=data:application/json;base64,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QixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFGLEVBQThDO0FBQzVDLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FERixFQUVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FGRixFQUdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FIRixFQUlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FKRixFQUtFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FMRixFQU1FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FORixFQU9FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FQRixFQVFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FSRixFQVNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FURixFQVVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FWRixFQVdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FYRixFQVlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FaRixFQWFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FiRixFQWNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FkRixDQVpGLEVBNkJFLENBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFGLEVBQThDO0FBQzVDLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FERixFQUVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FGRixFQUdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FIRixFQUlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FKRixFQUtFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsRUFBVixFQUFjLEVBQWQsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsRUFBa0MsRUFBbEMsRUFBc0MsRUFBdEMsRUFBMEMsRUFBMUMsRUFBOEMsRUFBOUMsQ0FMRixFQU1FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FORixFQU9FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FQRixFQVFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FSRixFQVNFLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxFQUFxQyxFQUFyQyxFQUF5QyxDQUF6QyxFQUE0QyxDQUE1QyxFQUErQyxDQUEvQyxDQVRGLEVBVUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVZGLEVBV0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVhGLEVBWUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVpGLEVBYUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxFQUFWLEVBQWMsRUFBZCxFQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QixFQUFrQyxFQUFsQyxFQUFzQyxFQUF0QyxFQUEwQyxFQUExQyxFQUE4QyxFQUE5QyxDQWJGLEVBY0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQWRGLEVBZUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQWZGLEVBZ0JFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FoQkYsRUFpQkUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLEVBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLEVBQWlDLEVBQWpDLEVBQXFDLEVBQXJDLEVBQXlDLENBQXpDLEVBQTRDLENBQTVDLEVBQStDLENBQS9DLENBakJGLENBN0JGLEVBaURFLENBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFGLEVBQTRDO0FBQzFDLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FERixFQUVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FGRixFQUdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FIRixFQUlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FKRixFQUtFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FMRixFQU1FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FORixFQU9FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FQRixFQVFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FSRixFQVNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FURixFQVVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FWRixFQVdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FYRixFQVlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FaRixFQWFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FiRixFQWNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FkRixFQWVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FmRixFQWdCRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBaEJGLEVBaUJFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FqQkYsQ0FqREYsRUFxRUUsQ0FBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQUYsRUFBNEM7QUFDMUMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQURGLEVBRUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUZGLEVBR0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUhGLEVBSUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUpGLEVBS0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUxGLEVBTUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQU5GLEVBT0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVBGLEVBUUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVJGLEVBU0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVRGLEVBVUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVZGLEVBV0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVhGLEVBWUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVpGLEVBYUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQWJGLEVBY0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQWRGLEVBZUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQWZGLENBckVGLEVBdUZFLENBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxDQUFGLEVBQStDO0FBQzdDLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FERixFQUVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FGRixFQUdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FIRixFQUlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FKRixFQUtFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLEVBQWIsRUFBaUIsQ0FBakIsRUFBb0IsRUFBcEIsRUFBd0IsQ0FBeEIsRUFBMkIsRUFBM0IsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FMRixFQU1FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FORixFQU9FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FQRixFQVFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FSRixFQVNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FURixFQVVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLEVBQWIsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsRUFBM0IsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FWRixFQVdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FYRixDQXZGRixFQXFHRSxDQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FBRixFQUE2QztBQUMzQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWEYsRUFZRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWkYsRUFhRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdC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RUFBb0MsQ0FBcEMsRUFBdUMsRUFBdkMsRUFBMkMsRUFBM0MsRUFBK0MsQ0FBL0MsQ0FWRixFQVdFLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUyxDQUFULEVBQWEsQ0FBYixFQUFpQixDQUFqQixFQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUE0QixDQUE1QixFQUFnQyxDQUFoQyxFQUFvQyxDQUFwQyxFQUF3QyxDQUF4QyxFQUEyQyxFQUEzQyxFQUErQyxDQUEvQyxDQVhGLEVBWUUsQ0FBQyxDQUFELEVBQUssQ0FBTCxFQUFTLENBQVQsRUFBWSxFQUFaLEVBQWlCLENBQWpCLEVBQW9CLEVBQXBCLEVBQXdCLENBQXhCLEVBQTJCLEVBQTNCLEVBQWdDLENBQWhDLEVBQW1DLEVBQW5DLEVBQXdDLENBQXhDLEVBQTRDLENBQTVDLEVBQStDLENBQS9DLENBWkYsQ0FySEYsQ0FBYiIsImZpbGUiOiJzdGFnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxudmFyIHN0YWdlcyA9IFsgWyBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgIC8vIDAgLSAxXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDldLFxyXG4gICAgICAgICAgICAgICAgIFs1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1XSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDhdLCAgICBcclxuICAgICAgICAgICAgICAgICBbNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNl0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFs3LCA3LCA3LCA3LCA3LCA3LCA3LCA3LCA3LCA3LCA3LCA3LCA3XSwgICBcclxuICAgICAgICAgICAgICAgICBbNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNF0gICAgICAgXHJcbiAgICAgICAgICAgICAgIF0sIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgWyBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgIC8vIDEgLSAyXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDYsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDAsIDAsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMSwgMCwgMCwgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxLCAyLCAwLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDEsIDIsIDMsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMSwgMiwgMywgNCwgMF0sICAgICAgXHJcbiAgICAgICAgICAgICAgICAgWzksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDVdICAgICAgICBcclxuICAgICAgICAgICAgICAgXSwgXHJcblxyXG4gICAgICAgICAgICAgICBbIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgLy8gMiAtIDNcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFs0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0XSwgXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsxLCAxLCAxLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFs1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1XSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDhdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbNiwgNiwgNiwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgM10sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMywgMywgM11cclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgLy8gMyAtIDRcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMiwgMywgNCwgOSwgNiwgMCwgOCwgMSwgMiwgMywgNCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDMsIDQsIDksIDYsIDcsIDAsIDEsIDIsIDMsIDQsIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA0LCA5LCA2LCA3LCA4LCAwLCAyLCAzLCA0LCA5LCA2LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgNiwgNywgOCwgMSwgMCwgMywgNCwgOSwgNiwgNywgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDYsIDcsIDgsIDEsIDIsIDAsIDQsIDksIDYsIDcsIDgsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA3LCA4LCAxLCAyLCAzLCAwLCA5LCA2LCA3LCA4LCAxLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOCwgMSwgMiwgMywgNCwgMCwgNiwgNywgOCwgMSwgMiwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEsIDIsIDMsIDQsIDksIDAsIDcsIDgsIDEsIDIsIDMsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAyLCAzLCA0LCA5LCA2LCAwLCA4LCAxLCAyLCAzLCA0LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMywgNCwgOSwgNiwgNywgMCwgMSwgMiwgMywgNCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDQsIDksIDYsIDcsIDgsIDAsIDIsIDMsIDQsIDksIDYsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCA2LCA3LCA4LCAxLCAwLCAzLCA0LCA5LCA2LCA3LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNiwgNywgOCwgMSwgMiwgMCwgNCwgOSwgNiwgNywgOCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDcsIDgsIDEsIDIsIDMsIDAsIDksIDYsIDcsIDgsIDEsIDBdXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFswLCAwLCAwLCA4LCAwLCAwLCAwLCAwLCAwLCA4LCAwLCAwLCAwXSwgIC8vIDQgLSA1XHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDgsIDAsIDAsIDAsIDAsIDAsIDgsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCA4LCAwLCAwLCAwLCA4LCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgOCwgMCwgMCwgMCwgOCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDksIDksIDksIDksIDksIDksIDksIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA5LCA5LCA5LCA5LCA5LCA5LCA5LCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgOSwgOSwgNSwgOSwgOSwgOSwgNSwgOSwgOSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDksIDksIDUsIDksIDksIDksIDUsIDksIDksIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCAwLCA5LCA5LCA5LCA5LCA5LCA5LCA5LCAwLCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgMCwgOSwgMCwgMCwgMCwgMCwgMCwgOSwgMCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDAsIDksIDAsIDAsIDAsIDAsIDAsIDksIDAsIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCA5LCA5LCAwLCA5LCA5LCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgOSwgOSwgMCwgOSwgOSwgMCwgMCwgMCwgMF0gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLCAgLy8gNSAtIDZcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsIDEwLCAyLCAxMCwgMiwgMTAsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbMiwgMCwgMiwgMCwgMTAsIDAsICAyLCAwLCAxMCwgMCwgMiwgMCwgMl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFswLCAwLCAwLCAwLCAwLCA4LCA4LCA3LCAwLCAwLCAwLCAwLCAwXSwgICAvLyA2IC0gN1xyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCA4LCA4LCA3LCA3LCA2LCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgOCwgOCwgNywgNywgNiwgNiwgNSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDgsIDcsIDcsIDYsIDYsIDUsIDUsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA4LCA3LCA3LCA2LCA2LCA1LCA1LCA0LCA0LCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgNywgNywgNiwgNiwgNSwgNSwgNCwgNCwgMywgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDcsIDYsIDYsIDUsIDUsIDQsIDQsIDMsIDMsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA2LCA2LCA1LCA1LCA0LCA0LCAzLCAzLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgNiwgNSwgNSwgNCwgNCwgMywgMywgMiwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDUsIDUsIDQsIDQsIDMsIDMsIDIsIDIsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA0LCA0LCAzLCAzLCAyLCAyLCAxLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgNCwgMywgMywgMiwgMiwgMSwgMSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDMsIDIsIDIsIDEsIDEsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAyLCAxLCAxLCAwLCAwLCAwLCAwLCAwXVxyXG4gICAgICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgICAgWyBbMCwgIDAsICAwLCAxMCwgIDAsIDEwLCAwLCAxMCwgIDAsIDEwLCAgMCwgIDAsIDBdLCAgIC8vIDcgLSA4XHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAgMCwgIDAsICAwLCAgMCwgMCwgIDAsICAwLCAgMCwgIDAsIDEwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsIDEwLCAgMCwgMTAsICAwLCAwLCAgMCwgMTAsICAwLCAxMCwgMTAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsICAwLCAgMCwgIDAsIDEsICAwLCAgMCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAgMCwgIDAsICAwLCAxMCwgMiwgMTAsICAwLCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgIDAsICAwLCAxMCwgIDAsICAwLCAzLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsICAwLCAgMCwgIDAsIDQsICAwLCAgMCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgMTAsICAwLCAgMCwgNSwgIDAsICAwLCAxMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsIDEwLCA2LCAxMCwgIDAsICAwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsICAwLCAgMCwgIDAsIDcsICAwLCAgMCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAxMCwgIDAsIDEwLCAgMCwgMCwgIDAsIDEwLCAgMCwgMTAsIDEwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsICAwLCAwLCAgMCwgIDAsICAwLCAgMCwgMTAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsIDEwLCAgMCwgMTAsIDAsIDEwLCAgMCwgMTAsICAwLCAgMCwgMF1cclxuICAgICAgICAgICAgICAgXVxyXG5dOyJdfQ==