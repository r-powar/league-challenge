import { FileValidationPipe } from './file-validation-pipe';
import { BadRequestException } from '@nestjs/common';

describe('FileValidationPipe', () => {
  let pipe: FileValidationPipe;

  beforeEach(() => {
    pipe = new FileValidationPipe();
  });

  it('should throw an error if no file is provided', () => {
    expect(() => pipe.transform(null)).toThrow(BadRequestException);
    expect(() => pipe.transform(null)).toThrow('No file provided.');
  });

  it('should throw an error if the file type is not CSV', () => {
    const file = {
      mimetype: 'application/json',
      size: 1024,
      buffer: Buffer.from(''),
    } as Express.Multer.File;

    expect(() => pipe.transform(file)).toThrow(BadRequestException);
    expect(() => pipe.transform(file)).toThrow(
      'Invalid file type, only CSV are allowed.',
    );
  });

  it('should throw an error if the file size exceeds the limit', () => {
    const file = {
      mimetype: 'text/csv',
      size: 6 * 1024 * 1024, // 6MB
      buffer: Buffer.from(''),
    } as Express.Multer.File;

    expect(() => pipe.transform(file)).toThrow(BadRequestException);
    expect(() => pipe.transform(file)).toThrow(
      'File size exceeds the limit of 5MB.',
    );
  });

  it('should throw an error if the file does not contain a square matrix', () => {
    const file = {
      mimetype: 'text/csv',
      size: 1024,
      buffer: Buffer.from('1,2,3\n4,5,6'),
    } as Express.Multer.File;

    expect(() => pipe.transform(file)).toThrow(BadRequestException);
    expect(() => pipe.transform(file)).toThrow(
      'The file must contain an equal number of rows and columns',
    );
  });

  it('should throw an error if the file contains non-integer values', () => {
    const file = {
      mimetype: 'text/csv',
      size: 1024,
      buffer: Buffer.from('1,2,3\n4,5,six\n7,8,9'),
    } as Express.Multer.File;

    expect(() => pipe.transform(file)).toThrow(BadRequestException);
    expect(() => pipe.transform(file)).toThrow(
      'The file must contain only integers.',
    );
  });

  it('should pass validation for a valid CSV file', () => {
    const file = {
      mimetype: 'text/csv',
      size: 1024,
      buffer: Buffer.from('1,2,3\n4,5,6\n7,8,9'),
    } as Express.Multer.File;

    expect(pipe.transform(file)).toBe(file);
  });
});
