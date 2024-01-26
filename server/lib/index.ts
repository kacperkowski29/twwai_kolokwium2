import App from './app';
import IndexController from "./controllers/index.controller";
import ChartDataController from "./controllers/chartData.controller";

const app: App = new App([
  new ChartDataController(),
  new IndexController(),
  
]);

app.listen();