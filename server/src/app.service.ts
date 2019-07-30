import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs'
import { DomainAddresses } from './utils/config';
import * as request from 'request-promise-native'
import Level from './models/Level';
import { Request, Response } from 'express';

@Injectable()
export class AppService {

  filesPath = `${__dirname}/../files`

  getHello(): string {
    return 'Hello World!';
  }

  async getLevelList(token: string): Promise<string[]> {
    const isCorrectToken = await this.checkToken(token)

    if (!isCorrectToken)
      throw new UnauthorizedException("Access danied")

    const seasonLevel = await this.checkSeasonLevel(token)

    console.log(seasonLevel.length)

    const levelList: string[] = fs.readdirSync(this.filesPath)

    seasonLevel.forEach(level => {
      console.log(level.book)
      if (level.book === 'red') {
        const indexBlue = levelList.indexOf('BLUE')
        if (indexBlue !== -1) {
          levelList.splice(indexBlue, 1)
        }

        const indexYellow = levelList.indexOf('YELLOW')
        if (indexYellow !== -1) {
          levelList.splice(indexYellow, 1)
        }

      } else if (level.book === 'blue') {
        const indexRed = levelList.indexOf('RED')
        if (indexRed !== -1) {
          levelList.splice(indexRed, 1)
        }

        const indexYellow = levelList.indexOf('YELLOW')
        if (indexYellow !== -1) {
          levelList.splice(indexYellow, 1)
        }
      } else if (level.book === 'yellow') {
        const indexBlue = levelList.indexOf('BLUE')
        if (indexBlue !== -1) {
          levelList.splice(indexBlue, 1)
        }

        const indexRed = levelList.indexOf('RED')
        if (indexRed !== -1) {
          levelList.splice(indexRed, 1)
        }
      }
    })

    return levelList
  }

  async getRecordList(token: string, levelName: string): Promise<string[]> {
    const isCorrectToken = await this.checkToken(token)

    if (!isCorrectToken)
      throw new UnauthorizedException("Access danied")

    const levelList = await this.getLevelList(token)
    if (!levelList.some(level => level === levelName) || !fs.existsSync(`${this.filesPath}/${levelName}`))
      throw new NotFoundException('Level not found')

    const recordList: string[] = fs.readdirSync(`${this.filesPath}/${levelName}`)
    return recordList
  }

  async checkToken(token: string): Promise<boolean> {
    try {
      const response = await request.post(`${DomainAddresses.AUTH_API_DOMAIN}/token/check`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      return true
    } catch (err) {
      return false
    }
  }

  async checkSeasonLevel(token: string): Promise<Level[]> {
    try {
      const response = await request.get(`${DomainAddresses.GAMES_API_DOMAIN}/group-levels`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      return JSON.parse(response) as Level[]
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException('Server connection error')
    }
  }

  async getRecording(token: string, level: string, recordName: string, res: Response, req: Request) {
    const isCorrectToken = await this.checkToken(token)

    if (!isCorrectToken)
      throw new UnauthorizedException("Access danied")

    const path = `${this.filesPath}/${level}/${recordName}`

    if (!fs.existsSync)
      throw new BadRequestException('Data is not valid')

    this.getAudioStream(req, res, path)
  }

  getAudioStream(req: Request, res: Response, path: string) {
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const split = path.split('.')
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/" + split[split.length - 1]
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      throw new BadRequestException('Data is not valid')
    }
  }

}
