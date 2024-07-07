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
  postTextSummary(@Body() requestBody: TextSummaryRequestBody) {
    this.appService.publishText({ text: requestBody.submitText });
  }

  @Get('/image-coloring')
  @Render('image-coloring')
  getImageColoring() {}

  @Post('/image-coloring')
  @Render('image-coloring')
  @UseInterceptors(FileInterceptor('inputImage'))
  postImageColoring(@UploadedFile() file: Express.Multer.File) {
    this.appService.publishImage({ file });
  }
}
