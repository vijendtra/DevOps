import { Request, Response } from 'express';
require('dotenv').config();
import { MiningHardware } from '../models/MiningHardware';

export const miningHardwareController = {

    create: async (req: Request, res: Response) => { 
        const { name, location, hashRate } = req.body;
        try {
            const miningHardware = await MiningHardware.create({ name, location, hashRate });
            return res.status(201).json(miningHardware);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    read: async (req: Request, res: Response) => {
        let page = parseInt(req.query.page as string);
        if (isNaN(page)) {
            page = 1;
        }
        const itemsPerPage = 10; // Number of items to return per page

        try {
            const totalCount = await MiningHardware.count(); // Get the total count of items

            // Calculate the offset and limit based on the requested page
            const offset = (page - 1) * itemsPerPage;
            const limit = itemsPerPage;

            // decending order by id
            const miningHardware = await MiningHardware.findAll({
                offset,
                limit,
                order: [['id', 'DESC']],
            });

            const totalPages = Math.ceil(totalCount / itemsPerPage);

            return res.status(200).json({
                rows: miningHardware,
                totalPages,
                currentPage: page,
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, location, hashRate } = req.body;
        try {
            const miningHardware = await MiningHardware.update({ name, location, hashRate }, { where: { id } });
            return res.status(200).json(miningHardware);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const miningHardware = await MiningHardware.destroy({ where: { id } });
            return res.status(200).json(miningHardware);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    getAllMiningHardware: async (req: Request, res: Response) => {
        try {
            const miningHardware = await MiningHardware.findAll({ limit: 100 });
            return res.status(200).json(miningHardware);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

}
