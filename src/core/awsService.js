const AWS = require('aws-sdk');
const { AWS_KEY, AWS_SECRET, AWS_REGION, S3_BUCKET } = process.env;
const uuid = require('uuid');
const sharp = require('sharp');
const RESIZE_WIDTH = 475;

const awsService = {
  imageUpload: async base64 => {
    AWS.config.setPromisesDependency(require('bluebird'));
    AWS.config.update({
      accessKeyId: AWS_KEY,
      secretAccessKey: AWS_SECRET,
      region: AWS_REGION
    });
    const s3 = new AWS.S3();

    const base64Data = new Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );

    const resizedImage = await sharp(base64Data).resize(RESIZE_WIDTH);

    const type = base64.split(';')[0].split('/')[1];

    const imageName = uuid.v4();

    const params = {
      Bucket: S3_BUCKET,
      Key: `${imageName}.${type}`,
      Body: resizedImage,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    };

    let location = '';
    let key = '';

    try {
      const { Location, Key } = await s3.upload(params).promise();
      location = Location;
      key = Key;
    } catch (error) {
      console.log(error);
    }

    return location;
  }
};

module.exports = awsService;
