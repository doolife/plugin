import { createResizable } from './resizable.js';
import '../media/before.mp4';
import '../media/after.mp4';

const userResizableOptions1 = createResizable({
    element: "#resizeable1",
    children:"#select1",
    halfWidth: "50%",
});

const userResizableOptions2 = createResizable({
    element: "#resizeable2",
    children:"#select2",
    halfWidth: "30%"
});

const userResizableOptions3 = createResizable({
    element: "#resizeable3",
    children:"#select3",
    halfWidth: "70%"
});

document.querySelector(".btn-reset--1")?.addEventListener("click", () => {
    userResizableOptions1.reset("#select1");
});

userResizableOptions1.start((e, { element }) => {
    console.log("🔥 Start resizing:");
});

userResizableOptions1.resize((e, { element, width }) => {
    console.log("📏 Resizing to", width, "on");
});

userResizableOptions1.stop((e, { element }) => {
    console.log("🛑 Stop resizing:");
});

document.querySelector(".btn-reset--2")?.addEventListener("click", () => {
    userResizableOptions2.reset("#select2");
});

userResizableOptions2.start((e, { element }) => {
    console.log("🔥 Start resizing2:");
});

document.querySelector(".btn-reset--3")?.addEventListener("click", () => {
    userResizableOptions3.reset("#select3");
});
