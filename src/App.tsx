import './styles/main.scss';
import { ThemeProvider, useTheme } from './context/theme';

const App = () => {
  const { toggleTheme } = useTheme();
  return (
    <ThemeProvider>
      {/* <main className="dark"> */}
      <div className="container">
        <div className="card">
          <p className="card-title">test</p>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
      </div>
      {/* </main> */}
    </ThemeProvider>
  )
};

export default App;
