import './styles/main.scss';
import { useTheme } from './context/theme';

const App = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="container">
      <div className="card" >
        <p className="card-title">test</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div >
    </div>
  )
};

export default App;
