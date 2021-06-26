import './App.css';
import DataContainer from './components/dataContainer.jsx';
import CarContainer from './components/car.jsx';

function App() {
  return (
    <div className="App">
      <div id="generalContainer">
        <DataContainer></DataContainer>
        <CarContainer></CarContainer>
      </div>
    </div>
  );
}

export default App;
