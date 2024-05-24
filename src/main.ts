import "./index.css";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "./language";

const example = `hook useCounter(initialValue?: number) {
  state count = initialValue ?? 0;
  const increment = () => mutate x => x + 1
  const decrement = () => mutate x => x - 1
  const reset = () => mutate x = initialValue ?? 0
  return { count, increment, decrement, reset }
}

hook useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  effect {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay === null) break
    const id = setInterval(() => {
      savedCallback.current()
    }, delay)
    cleanup { clearInterval(id) }
  }
}

component Counter() {
  const { count, increment, decrement, reset } = useCounter()
  useInterval(reset, 5)
  return (
    <div>
      <div>The current value is {count}</div>
      <div className="flex gap-2">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
      <p>The counter will be reset in every 5 seconds.</p>
      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
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
