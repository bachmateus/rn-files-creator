"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const styles_1 = __importDefault(require("./styles"));
const MyComponent = () => {
    return (<react_native_1.View style={styles_1.default.container}>
      <react_native_1.Text style={styles_1.default.title}>MyComponent</react_native_1.Text>
    </react_native_1.View>);
};
exports.default = MyComponent;
