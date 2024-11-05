import { Test, TestingModule } from '@nestjs/testing';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

describe('CsvController', () => {
  let csvController: CsvController;
  let csvService: CsvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MulterModule.register()],
      controllers: [CsvController],
      providers: [
        {
          provide: CsvService,
          useValue: {
            echoFile: jest.fn(),
            getMultiply: jest.fn(),
            getSumFile: jest.fn(),
            flattenFile: jest.fn(),
            invertFile: jest.fn(),
          },
        },
      ],
    }).compile();

    csvController = module.get<CsvController>(CsvController);
    csvService = module.get<CsvService>(CsvService);
  });

  describe('handleFileEcho', () => {
    it('should return file data on successful processing', async () => {
      const mockFile = {
        buffer: Buffer.from('1,2,3\n4,5,6\n7,8,9'),
      } as Express.Multer.File;
      const mockFileData = '1,2,3\n4,5,6\n7,8,9';
      jest.spyOn(csvService, 'echoFile').mockResolvedValue(mockFileData);

      const result = await csvController.handleFileEcho(mockFile);
      expect(result).toBe(mockFileData);
    });

    it('should throw an HttpException on error', async () => {
      const mockFile = {
        buffer: Buffer.from('invalid data'),
      } as Express.Multer.File;
      const mockError = new Error('Error processing file');
      jest.spyOn(csvService, 'echoFile').mockRejectedValue(mockError);

      try {
        await csvController.handleFileEcho(mockFile);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(err.getResponse()).toEqual({
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: mockError.message,
        });
      }
    });
  });

  describe('handleFileMultiply', () => {
    it('should return multiplied file data on successful processing', async () => {
      const mockFile = {
        buffer: Buffer.from('1,2,3\n4,5,6\n7,8,9'),
      } as Express.Multer.File;
      const mockMultipliedData = 362880;
      jest
        .spyOn(csvService, 'getMultiply')
        .mockResolvedValue(mockMultipliedData);

      const result = await csvController.handleFileMultiply(mockFile);
      expect(result).toBe(mockMultipliedData);
    });

    it('should throw an HttpException on error', async () => {
      const mockFile = {
        buffer: Buffer.from('invalid data'),
      } as Express.Multer.File;
      const mockError = new Error('Error processing file');
      jest.spyOn(csvService, 'getMultiply').mockRejectedValue(mockError);

      try {
        await csvController.handleFileMultiply(mockFile);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(err.getResponse()).toEqual({
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: mockError.message,
        });
      }
    });
  });

  describe('handleFileSum', () => {
    it('should return summed file data on successful processing', async () => {
      const mockFile = {
        buffer: Buffer.from('1,2,3\n4,5,6\n7,8,9'),
      } as Express.Multer.File;
      const mockSumData = 45;
      jest.spyOn(csvService, 'getSumFile').mockResolvedValue(mockSumData);

      const result = await csvController.handleFileSum(mockFile);
      expect(result).toBe(mockSumData);
    });

    it('should throw an HttpException on error', async () => {
      const mockFile = {
        buffer: Buffer.from('invalid data'),
      } as Express.Multer.File;
      const mockError = new Error('Error processing file');
      jest.spyOn(csvService, 'getSumFile').mockRejectedValue(mockError);

      try {
        await csvController.handleFileSum(mockFile);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(err.getResponse()).toEqual({
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: mockError.message,
        });
      }
    });
  });

  describe('handleFileFlatten', () => {
    it('should return flattened file data on successful processing', async () => {
      const mockFile = {
        buffer: Buffer.from('1,2,3\n4,5,6\n7,8,9'),
      } as Express.Multer.File;
      const mockFlattenData = '1,2,3,4,5,6,7,8,9';
      jest.spyOn(csvService, 'flattenFile').mockResolvedValue(mockFlattenData);

      const result = await csvController.handleFileFlatten(mockFile);
      expect(result).toBe(mockFlattenData);
    });

    it('should throw an HttpException on error', async () => {
      const mockFile = {
        buffer: Buffer.from('invalid data'),
      } as Express.Multer.File;
      const mockError = new Error('Error processing file');
      jest.spyOn(csvService, 'flattenFile').mockRejectedValue(mockError);

      try {
        await csvController.handleFileFlatten(mockFile);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(err.getResponse()).toEqual({
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: mockError.message,
        });
      }
    });
  });

  describe('handleFileInvert', () => {
    it('should return inverted file data on successful processing', async () => {
      const mockFile = {
        buffer: Buffer.from('1,2,3\n4,5,6\n7,8,9'),
      } as Express.Multer.File;
      const mockInvertedData = '1,4,7\n2,5,8\n3,6,9';
      jest.spyOn(csvService, 'invertFile').mockResolvedValue(mockInvertedData);

      const result = await csvController.handleFileInvert(mockFile);
      expect(result).toBe(mockInvertedData);
    });

    it('should throw an HttpException on error', async () => {
      const mockFile = {
        buffer: Buffer.from('invalid data'),
      } as Express.Multer.File;
      const mockError = new Error('Error processing file');
      jest.spyOn(csvService, 'invertFile').mockRejectedValue(mockError);

      try {
        await csvController.handleFileInvert(mockFile);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(err.getResponse()).toEqual({
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: mockError.message,
        });
      }
    });
  });
});
