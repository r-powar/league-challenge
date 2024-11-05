import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CsvService {
  constructor() {}

  async echoFile(fileData: Buffer): Promise<string> {
    try {
      return fileData.toString();
    } catch (error) {
      throw new BadRequestException(`Error reading file: ${error.message}`);
    }
  }

  async invertFile(fileData: Buffer): Promise<string> {
    try {
      const input = fileData.toString();

      //convert to 2d Array
      const rows = input
        .trim()
        .split('\n')
        .map((row) => row.trim().split(','));

      //invert the 2D array
      const invert = rows[0].map((_, colIndex) =>
        rows.map((row) => row[colIndex]),
      );

      const output = invert.map((row) => row.join(',')).join('\n');

      return output;
    } catch (error) {
      throw new BadRequestException(`Error reading file: ${error.message}`);
    }
  }

  async flattenFile(fileData: Buffer): Promise<string> {
    try {
      const input = fileData.toString();

      //convert to 2d Array
      const rows = input
        .trim()
        .split('\n')
        .map((row) => row.trim().split(','));

      //flatten 2D array
      const flattened = rows.flat();

      const output = flattened.join(',');

      return output;
    } catch (error) {
      throw new BadRequestException(`Error reading file: ${error.message}`);
    }
  }

  async getSumFile(fileData: Buffer): Promise<number> {
    try {
      const input = fileData.toString();

      //convert to 2d Array
      const rows = input
        .trim()
        .split('\n')
        .map((row) => row.trim().split(','));

      // flatten 2D array and convert to numbers
      const flatten = rows.flat().map(Number);

      const sum = flatten.reduce((acc, num) => acc + num, 0);

      return sum;
    } catch (error) {
      throw new BadRequestException(`Error reading file: ${error.message}`);
    }
  }

  async getMultiply(fileData: Buffer): Promise<number> {
    try {
      const input = fileData.toString();

      //convert to 2d Array
      const rows = input
        .trim()
        .split('\n')
        .map((row) => row.trim().split(','));

      // flatten 2D array and convert to numbers
      const flatten = rows.flat().map(Number);

      const multiply = flatten.reduce((acc, num) => acc * num);

      return multiply;
    } catch (error) {
      throw new BadRequestException(`Error reading file: ${error.message}`);
    }
  }
}
