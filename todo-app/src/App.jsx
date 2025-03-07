import TodoList from "./assets/components/TodoList"; 
 
function App() { 
  return ( 
    <div className="app-wrapper"> 
      <h1 className="app-title">
        <span className="title-icon">✓</span>
        <span className="title-text">React TODO App</span>
      </h1> 
      <TodoList /> 
    </div> 
  ); 
} 
 
export default App;
