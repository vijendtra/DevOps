"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.miningHardwareController = void 0;
require('dotenv').config();
const MiningHardware_1 = require("../models/MiningHardware");
exports.miningHardwareController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, location, hashRate } = req.body;
        try {
            const miningHardware = yield MiningHardware_1.MiningHardware.create({ name, location, hashRate });
            return res.status(201).json(miningHardware);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }),
    read: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let page = parseInt(req.query.page);
        if (isNaN(page)) {
            page = 1;
        }
        const itemsPerPage = 10; // Number of items to return per page
        try {
            const totalCount = yield MiningHardware_1.MiningHardware.count(); // Get the total count of items
            // Calculate the offset and limit based on the requested page
            const offset = (page - 1) * itemsPerPage;
            const limit = itemsPerPage;
            // decending order by id
            const miningHardware = yield MiningHardware_1.MiningHardware.findAll({
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
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, location, hashRate } = req.body;
        try {
            const miningHardware = yield MiningHardware_1.MiningHardware.update({ name, location, hashRate }, { where: { id } });
            return res.status(200).json(miningHardware);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const miningHardware = yield MiningHardware_1.MiningHardware.destroy({ where: { id } });
            return res.status(200).json(miningHardware);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }),
    getAllMiningHardware: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const miningHardware = yield MiningHardware_1.MiningHardware.findAll({ limit: 100 });
            return res.status(200).json(miningHardware);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    })
};
