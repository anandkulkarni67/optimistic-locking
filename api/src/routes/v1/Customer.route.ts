import { Request, Response, Router } from 'express';
import { customerService } from '../../service/Customer.service';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
    const customerMetadata = await customerService.getCustomer(req.params.id.toString());
    res.status(200).json(customerMetadata);
});

router.post('/', async (req: Request, res: Response) => {
    const customerMetadata = await customerService.addCustomer(req.body);
    res.status(200).json(customerMetadata);
});

router.put('/:id', async (req: Request, res: Response) => {
    const customerMetadata = await customerService.updateCustomer(req.params.id.toString(), req.body);
    res.status(200).json(customerMetadata);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await customerService.deleteCustomer(req.params.id.toString(), Number(req.query.version));
    res.status(200).send();
});

export default router;