import './assets/css/style.css';
import './assets/css/animate.css';
import { useRoutes } from 'react-router-dom';
import routesConfig from './routing/RoutesConfig';
import Providers from './Providers';

function App() {
  const routing = useRoutes(routesConfig);

  return (
    <Providers>
      {routing}
    </Providers>
  );
}

export default App;

