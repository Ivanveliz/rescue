import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('🌊 Servidor Lifeguard funcionando');
});

export default router;
//
