import { Request, Response, Router } from 'express';
import { Status } from '../../model/data/Status';
import { ServiceStatusValue } from '../../model/data/ServiceStatusValue';
import { Service } from '../../model/data/Service';
import { getEnvironment } from '../../util/environment';

const router = Router();

router.get('/app', async (req: Request, res: Response) => {
    res.status(200).json(new Status(Service.APPLICATION, ServiceStatusValue.UP,
        {
            Environment: getEnvironment()
        }
    ));
});

export default router;