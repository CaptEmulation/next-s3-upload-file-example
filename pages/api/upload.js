import { IncomingForm } from 'formidable'
import { promisify } from 'util'
import AWS from 'aws-sdk'
import { createReadStream, unlinkSync } from 'fs'

const BUCKET = 'boh-dev';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method.toLowerCase() == 'post') {
    var s3 = new AWS.S3();
      
    var form = new IncomingForm({
      keepExtensions: true,
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        console.log('progress', parseInt( 100 * bytesReceived / bytesExpected ), '%');
    });

    form.on('error', function(err) {
        console.error('err',err);
    });

    const asyncFormParse = promisify((req, cb) => form.parse(
      req,
      (err, fields, files) => cb(err, [fields, files])
    ))

    try {
      const [fields, files] = await asyncFormParse(req)
      const tmpPath = files.file.path
      const readStream = createReadStream(tmpPath);
      const { Location } = await s3.upload({
        Bucket: BUCKET, 
        Key: fields.title, 
        Body: readStream,
        ACL: 'public-read'
      }).promise()
      console.log(`Created ${Location}`)
      console.log(`Removing tmp file.... ${tmpPath}`)
      unlinkSync(tmpPath)
      res.status(200).send({ location: Location });
    } catch (error) {
      res.status(500).send('NOT OK');
    }
  } else {
    res.status(400).send('nope')
  }
}
