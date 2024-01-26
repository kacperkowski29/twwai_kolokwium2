import { Router, Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import DataModel from '../models/DataModel';

class ChartDataController implements Controller {
  public path = '/chart-data';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getChartData);
    this.router.post(this.path, this.createChartData); // Added line
  }

  private getChartData = async (request: Request, response: Response) => {
    try {
      const data = await DataModel.find();
      const chartData = data.map(item => ({
        x: item.date,
        y: {
          temperature: item.temperature,
          pressure: item.pressure,
          humidity: item.humidity
        }
      }));
      response.json(chartData);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  private createChartData = async (request: Request, response: Response) => {
    const chartData = new DataModel(request.body);
    try {
      await chartData.save();
      response.status(201).json(chartData);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}

export default ChartDataController;