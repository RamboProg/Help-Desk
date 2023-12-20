import { createRoot } from 'react-dom/client';
import App from './App'; // Assuming App is your main component

const root = document.querySelector('#root');

const appRoot = createRoot(root);

appRoot.render(<App />);
