import { Request, Response, Router } from 'express';
import { customerService } from '../../service/Customer.service';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const customerMetadata = await customerService.getCustomer(req.params.id.toString());
    res.status(200).json(customerMetadata);
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const customerMetadata = await customerService.addCustomer(req.body);
    res.status(200).json(customerMetadata);
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const customerMetadata = await customerService.updateCustomer(req.params.id.toString(), req.body);
    res.status(200).json(customerMetadata);
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await customerService.deleteCustomer(req.params.id.toString(), Number(req.query.version));
    res.status(200).send();
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

export default router;