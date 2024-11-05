import { Test, TestingModule } from '@nestjs/testing';
import { CsvService } from './csv.service';

describe('CsvService', () => {
  let csvService: CsvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvService],
    }).compile();

    csvService = module.get<CsvService>(CsvService);
  });

  describe('echoFile', () => {
    it('should return the same file data', async () => {
      const mockFileBuffer = Buffer.from('1,2,3\n4,5,6\n7,8,9');
      const result = await csvService.echoFile(mockFileBuffer);
      expect(result).toBe(mockFileBuffer.toString());
    });

    it('should throw an error if file data is invalid', async () => {
      const mockFileBuffer = Buffer.from('');
      try {
        await csvService.echoFile(mockFileBuffer);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Invalid file data');
      }
    });
  });

  describe('getMultiply', () => {
    it('should return multiplied file data', async () => {
      const mockFileBuffer = Buffer.from('1,2,3\n4,5,6\n7,8,9');
      const expectedOutput = 362880;
      const result = await csvService.getMultiply(mockFileBuffer);
      expect(result).toBe(expectedOutput);
    });

    it('should throw an error if file data is invalid', async () => {
      const mockFileBuffer = Buffer.from('invalid data');
      try {
        await csvService.getMultiply(mockFileBuffer);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Error processing file');
      }
    });
  });

  describe('getSumFile', () => {
    it('should return summed file data', async () => {
      const mockFileBuffer = Buffer.from('1,2,3\n4,5,6\n7,8,9');
      const expectedOutput = 45;
      const result = await csvService.getSumFile(mockFileBuffer);
      expect(result).toBe(expectedOutput);
    });

    it('should throw an error if file data is invalid', async () => {
      const mockFileBuffer = Buffer.from('invalid data');
      try {
        await csvService.getSumFile(mockFileBuffer);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Error processing file');
      }
    });
  });

  describe('flattenFile', () => {
    it('should return flattened file data', async () => {
      const mockFileBuffer = Buffer.from('1,2,3\n4,5,6\n7,8,9');
      const expectedOutput = '1,2,3,4,5,6,7,8,9';
      const result = await csvService.flattenFile(mockFileBuffer);
      expect(result).toBe(expectedOutput);
    });

    it('should throw an error if file data is invalid', async () => {
      const mockFileBuffer = Buffer.from('invalid data');
      try {
        await csvService.flattenFile(mockFileBuffer);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Error processing file');
      }
    });
  });

  describe('invertFile', () => {
    it('should return invert file data', async () => {
      const mockFileBuffer = Buffer.from('1,2,3\n4,5,6\n7,8,9');
      const expectedOutput = '1,4,7\n2,5,8\n3,6,9';
      const result = await csvService.invertFile(mockFileBuffer);
      expect(result).toBe(expectedOutput);
    });

    it('should throw an error if file data is invalid', async () => {
      const mockFileBuffer = Buffer.from('invalid data');
      try {
        await csvService.invertFile(mockFileBuffer);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Error processing file');
      }
    });
  });
});
