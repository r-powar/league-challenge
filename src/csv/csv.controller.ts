import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { FileValidationPipe } from './pipes/file-validation-pipe';

//TO-DO: File Validation
@Controller('')
export class CsvController {
  constructor(private csvService: CsvService) {}

  @Post('echo')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileValidationPipe)
  async handleFileEcho(@UploadedFile() file: Express.Multer.File) {
    try {
      const fileData = await this.csvService.echoFile(file.buffer);
      return fileData;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('invert')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileValidationPipe)
  async handleFileInvert(@UploadedFile() file: Express.Multer.File) {
    try {
      const invertedFileData = await this.csvService.invertFile(file.buffer);
      return invertedFileData;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('flatten')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileValidationPipe)
  async handleFileFlatten(@UploadedFile() file: Express.Multer.File) {
    try {
      const flattenFileData = await this.csvService.flattenFile(file.buffer);
      return flattenFileData;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('sum')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileValidationPipe)
  async handleFileSum(@UploadedFile() file: Express.Multer.File) {
    try {
      const sumFileData = await this.csvService.getSumFile(file.buffer);
      return sumFileData;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('multiply')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileValidationPipe)
  async handleFileMultiply(@UploadedFile() file: Express.Multer.File) {
    try {
      const multiplyFileData = await this.csvService.getMultiply(file.buffer);
      return multiplyFileData;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error processing file',
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
