import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly maxSize = 5 * 1024 * 1024; // 5MB max file size limit
  private readonly mimeTypes = ['text/csv'];

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    this.validateMimeType(file.mimetype);
    this.validateFileSize(file.size);
    this.validateFileContent(file.buffer.toString());

    return file;
  }

  private validateMimeType(mimeType: string) {
    if (!this.mimeTypes.includes(mimeType)) {
      throw new BadRequestException('Invalid file type, only CSV are allowed.');
    }
  }

  private validateFileSize(size: number) {
    if (size > this.maxSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${this.maxSize / (1024 * 1024)}MB.`,
      );
    }
  }

  private validateFileContent(fileData: string) {
    const rows = fileData
      .trim()
      .split('\n')
      .map((row) => row.trim().split(','));

    if (rows.length === 0 || rows[0].length === 0) {
      throw new BadRequestException(
        'The file must contain at least one row and one column.',
      );
    }

    const rowCount = rows.length;
    const colCount = rows[0].length;

    if (rows.some((row) => row.length !== colCount)) {
      throw new BadRequestException(
        'All rows must have the same number of columns.',
      );
    }

    if (rowCount !== colCount) {
      throw new BadRequestException(
        'The file must contain an equal number of rows and columns.',
      );
    }

    for (const row of rows) {
      for (const cell of row) {
        if (!/^-?\d+$/.test(cell)) {
          throw new BadRequestException('The file must contain only integers.');
        }
      }
    }
  }
}
