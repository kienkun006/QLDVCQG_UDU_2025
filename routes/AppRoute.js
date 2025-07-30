import express from 'express';
import congdanRoute from './congdanRoute.js';
import phieuDangKyRoute from './phieuDangKyRoute.js';
import usersRoute from './usersRoute.js'; 
import hokhauRoute from './hokhauRoute.js';
import donviqlRoute from './donviqlRoute.js';
import skqlRoute from './skqlRoute.js';
import loginRoute from './loginRoute.js';
import bhytRoute from './bhytRoute.js';
import hanhchinhRoute from './hanhchinhRoute.js';
import statsRoute from './statsRoute.js';

export function AppRoute(app) {
    const router = express.Router();

    router.use('/congdan', congdanRoute);
    router.use('/hokhau', hokhauRoute);
    router.use('/phieu_dangky', phieuDangKyRoute);
    router.use('/users', usersRoute); 
    router.use('/donviql', donviqlRoute);
    router.use('/sukien', skqlRoute);
    router.use('/', loginRoute);
    router.use('/bhyt', bhytRoute); 
    router.use('/hanhchinh', hanhchinhRoute);
    router.use('/stats', statsRoute);

    app.use('/api', router);
}
