import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from 'crypto'

const s3Client = new S3Client({
  region: process.env.REGION || 'lakhtiste_region',
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || '',
    secretAccessKey: process.env.MINIO_SECRET_KEY || '',
  },
  forcePathStyle: true
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'blog'

export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event)
    if (!files || files.length === 0) {
      throw new Error('Aucun fichier reçu')
    }

    const file = files[0]
    const fileExt = file.filename?.split('.').pop() || 'jpg'
    const fileName = `${randomUUID()}.${fileExt}`

    // Upload du fichier
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.data,
        ContentType: file.type,
      })
    );

    // Construire l'URL publique
    const fileUrl = `${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${fileName}`

    return {
      success: true,
      url: fileUrl
    }
  } catch (error) {
    console.error('Erreur upload:', error)
    return {
      success: false,
      error: 'Erreur lors de l\'upload'
    }
  }
}) 