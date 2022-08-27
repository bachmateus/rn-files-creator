"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = exports.Container = void 0;
const native_1 = __importDefault(require("styled-components/native"));
exports.Container = native_1.default.View `
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
exports.Title = native_1.default.Text `
  font-size: 32px;
`;
