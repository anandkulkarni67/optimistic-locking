import { Router } from 'express';

import customers from './Customer.route';

const router = Router();

router.use('/customers', customers);

export default router;