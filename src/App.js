import "./App.css";
import { DragAndDrop } from "./components"; 

const items = [
  { id: 1, content: 'Item 1' },
  { id: 2, content: 'Item 2' },
  { id: 3, content: 'Item 3' },
  { id: 4, content: 'Item 4' },
];

export default function App() {
  return (
    <div className="App">
      <h1>Custom Drag and Drop</h1>
      <DragAndDrop items={items} />
    </div>
  );
}