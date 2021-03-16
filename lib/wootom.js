"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = exports.demoView = exports.serialize = exports.deactivate = exports.activate = exports.notificationMessage = void 0;
const atom_1 = require("atom");
const core_1 = require("./core");
exports.notificationMessage = 'Wootom was called and says hello!';
let subscriptions;
function activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a
    // CompositeDisposable
    subscriptions = new atom_1.CompositeDisposable();
    // Register command that calls hello
    subscriptions.add(atom.commands.add('atom-workspace', {
        'wootom:hello': () => hello(),
        'wootom:demoView': () => demoView(),
    }));
}
exports.activate = activate;
function deactivate() {
    subscriptions.dispose();
}
exports.deactivate = deactivate;
function serialize() {
    // empty
}
exports.serialize = serialize;
function demoView() {
    return __awaiter(this, void 0, void 0, function* () {
        core_1.htmlViewModel.activate();
        const div = document.createElement('div');
        const t = Date.now();
        for (let i = 1; i <= 50; i++) {
            yield new Promise(resolve => setTimeout(() => resolve(null), 100));
            const h2 = document.createElement('h2');
            const text = document.createTextNode(`Heading #${i} (t + ${Date.now() - t} ms)`);
            h2.appendChild(text);
            div.appendChild(h2);
            yield core_1.htmlViewModel.render(div);
        }
    });
}
exports.demoView = demoView;
function hello() {
    console.log(exports.notificationMessage);
    atom.notifications.addSuccess(exports.notificationMessage);
}
exports.hello = hello;
