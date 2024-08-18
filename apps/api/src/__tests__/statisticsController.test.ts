import { Request, Response } from 'express';
import axios from 'axios';
import request from 'supertest';
import { statisticsController } from '../controllers/statisticsController';

jest.mock('axios'); // Mock the axios library

describe('Statistics Controller', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Reset all axios mocks after each test
  });

  it('getMiningStats should return mining stats', async () => {
    // Mock Axios response for btcPriceURL
    const btcPriceResponse = {
      data: { bitcoin: { cad: 12345.67 } },
    };

    const maxiosget = jest.spyOn(axios, 'get');
    maxiosget.mockResolvedValueOnce(btcPriceResponse);

    // Mock Axios response for difficultyQURL
    const difficultyResponse = {
        data: 12345678,
    };

    maxiosget.mockResolvedValueOnce(difficultyResponse);

    const mockRequest = {} as Request;
    const mockResponse = {
        json: jest.fn(),
    } as unknown as Response;

    await statisticsController.getMiningStats(mockRequest, mockResponse);

    // Assertions
    expect(mockResponse.json).toHaveBeenCalledWith({
      miningStats: {
        totalHashrate: 1245.4265974589805,
        activeMiners: 46,
        miningRevenue: 8930.862364781207,
      },
      btcPrice: 12345.67,
      difficulty: 12345678,
    });
  });

  it('getMiningStats should handle errors', async () => {
    // Mock Axios error
    // axios.get.mockRejectedValueOnce(new Error('An error occurred'));
    const maxiosget = jest.spyOn(axios, 'get');
    maxiosget.mockRejectedValueOnce(new Error('An error occurred'));

    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    await statisticsController.getMiningStats(mockRequest, mockResponse);

    // Assertions for error case
    expect(mockResponse.json).toHaveBeenCalledWith({
      totalHashrate: 1245.4265974589805,
      activeMiners: 46,
      miningRevenue: 8930.862364781207,
      btcPrice: 0,
    });
  });

  it('getAvailableAlogrithms should return available algorithms', async () => {
    // Mock Axios response for getAvailableAlogrithms
    const algorithmsResponse = { data: ['algo1', 'algo2'] };
    // axios.get.mockResolvedValueOnce(algorithmsResponse);
    const maxiosget = jest.spyOn(axios, 'get');
    maxiosget.mockResolvedValueOnce(algorithmsResponse);

    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    await statisticsController.getAvailableAlogrithms(mockRequest, mockResponse);

    // Assertions
    expect(mockResponse.json).toHaveBeenCalledWith(['algo1', 'algo2']);
  });

  it('getAvailableAlogrithms should handle errors', async () => {
    // Mock Axios error
    // axios.get.mockRejectedValueOnce(new Error('An error occurred'));
    const maxiosget = jest.spyOn(axios, 'get');
    maxiosget.mockRejectedValueOnce(new Error('An error occurred'));

    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    await statisticsController.getAvailableAlogrithms(mockRequest, mockResponse);

    // Assertions for error case
    expect(mockResponse.json).toHaveBeenCalledWith([]);
  });
});
