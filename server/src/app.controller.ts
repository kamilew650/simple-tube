import { Controller, Get, Query, Req, UseGuards, UnauthorizedException, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/levels')
  async getLevels(@Req() request: Request): Promise<string[]> {
    const header = request.headers.authorization
    console.log(header)
    if (header && header.includes("Bearer")) {
      const token = header.split(' ')
      return this.appService.getLevelList(token[1])
    }

    throw new UnauthorizedException("Token not found")
  }

  @Get('/recordList')
  async getRecordList(@Req() request: Request, @Query('levelName') levelName: string): Promise<string[]> {
    const header = request.headers.authorization
    if (header && header.includes("Bearer")) {
      const token = header.split(' ')
      return this.appService.getRecordList(token[1], levelName);
    }

    throw new UnauthorizedException("Token not found")
  }

  @Get('/recording')
  async getRecording(
    @Req() req: Request,
    @Res() res: Response,
    @Query('levelName') levelName: string,
    @Query('recordName') recordName: string
  ): Promise<any> {

    const header = req.headers.authorization
    if (header && header.includes("Bearer")) {
      const token = header.split(' ')
      return await this.appService.getRecording(token[1], levelName, recordName, res, req);
    }

    throw new UnauthorizedException("Token not found")
  }
}
