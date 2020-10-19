import {Express} from 'express';
import health_controller from './controllers/health.controller';
import hospital_controller from './controllers/hospital.controller';
const routes = (app: Express): void => {
    app.use('/v1/health', health_controller);
    app.use('/v1/hospital', hospital_controller);
};

export default routes;