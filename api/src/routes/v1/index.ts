import { Router } from 'express';

import customers from './Customer.route';
import Healthchecks from './Healthcheck.route';

const router = Router();

router.use('/customers', customers);

router.use('/healthcheck', Healthchecks);

export default router;