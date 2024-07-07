import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

interface TextSummaryRequestBody {
  readonly submitText: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getHello() {}

  @Get('/text-summary')
  @Render('text-summary')
  getTextSummary() {}

  @Post('/text-summary')
  @Render('text-summary')
  postTextSummary(@Body() requestBody: TextSummaryRequestBody): {
    bodyText: string;
  } {
    return { bodyText: requestBody.submitText };
  }

  @Get('/image-coloring')
  @Render('image-coloring')
  getImageColoring() {}

  @Post('/image-coloring')
  @Render('image-coloring')
  @UseInterceptors(FileInterceptor('inputImage'))
  postImageColoring(@UploadedFile() file: Express.Multer.File): {
    bodyText: string;
  } {
    console.log('>> file', file);
    return { bodyText: 'hello' };
  }
}
