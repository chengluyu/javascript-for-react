import "./index.css";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "./language";

const example = `import * as React from 'react';

component Introduction(name: string, age: number) {
  return <h1>My name is {name} and I am {age} years old</h1>
}

hook useMultiplier(x: number): number {
  state y = 1;
  useEffect(() => { mutate y = 0 })
  return x * y;
}
`

globalThis.editor = new EditorView({
  extensions: [basicSetup, javascript({ jsx: true })],
  parent: document.querySelector<HTMLDivElement>("#editor")!,
  doc: example,
});

declare global {
  export var editor: EditorView;
}
