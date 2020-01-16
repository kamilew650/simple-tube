import { Module } from '@nestjs/common'
import { CloudStorageService } from './cloud-storage.service'
import { MailService } from './mail.service'

@Module({
	providers: [CloudStorageService, MailService],
	exports: [CloudStorageService, MailService],
})
export class ServiceModule { }
