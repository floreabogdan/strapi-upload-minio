'use strict';

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Public node modules.
const _ = require('lodash');
const Minio = require('minio');

module.exports = {
  provider: 'minio',
  name:     'Minio Server',
  auth: {
    public: {
      label: 'Access API Token',
      type:  'text'
    },
    private: {
      label: 'Secret Access Token',
      type:  'text'
    },
    endpoint: {
      label: 'Endpoint',
      type:  'text',
    },
    // port: {
    //   label: 'Port',
    //   type:  'number'
    // },
    bucket: {
      label: 'Bucket',
      type:  'text'
    }
  },
  init: (config) => {
    const MINIO = new Minio.Client({
      endPoint:  config.endpoint,
      //port:      config.port,
      //useSSL:    config.useSSL
      accessKey: config.public,
      secretKey: config.private
    });

    return {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          // upload file on S3 bucket
          const path = file.path ? `${file.path}/` : '';

          MINIO.putObject(
            config.bucket,
            `${path}${file.hash}${file.ext}`,
            new Buffer(file.buffer, 'binary'),
            (err, etag) => {
              if (err) {
                return reject(err);
              }
  
              // set the bucket file url
              file.url = `${MINIO.protocol}//${MINIO.host}:${MINIO.port}/${config.bucket}/${path}${file.hash}${file.ext}`;
  
              resolve();
          });
        });
      },
      delete: (file) => {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          MINIO.removeObject(config.bucket, `${path}${file.hash}${file.ext}`, (err) => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      }
    };
  }
};
