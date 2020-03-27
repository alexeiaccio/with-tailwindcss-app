import Reactotron from 'reactotron-react-js';
import { mst } from 'reactotron-mst';

Reactotron.configure().connect();

// tell Reactotron to use this plugin
Reactotron.use(mst({ queryMode: true }));
