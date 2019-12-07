import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import uuid from 'uuid'

@Injectable()
export class CloudStorageService {
	private bucketName: string

	constructor() {
		AWS.config.update({
			accessKeyId: process.env.AWSID || '',
			secretAccessKey: process.env.AWSSECRET || '',
			region: 'eu-central-1',
		})
		this.bucketName = process.env.BUCKETNAME || ''
	}

	async upload(key: string, body: any) {
		const objectParams = {
			Bucket: this.bucketName,
			Key: key,
			Body: body,
			ContentType: 'video/mp4',
		}

		return new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise()
	}

	async delete(key) {
		const params = {
			Bucket: this.bucketName,
			Key: key,
		}

		return new AWS.S3({ apiVersion: '2006-03-01' }).deleteObject(params).promise()
	}
}
