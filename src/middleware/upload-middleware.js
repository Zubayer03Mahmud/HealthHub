/**
 * File Upload Middleware
 *
 * Configures Multer storage, file size constraints, and MIME type validation for medical records.
 *
 * @module UploadMiddleware
 */

const multer = require( 'multer' );
const path = require( 'path' );
const fs = require( 'fs' );

const uploadDirectory = path.join( __dirname, '../../public/uploads' );
if ( ! fs.existsSync( uploadDirectory ) ) {
	fs.mkdirSync( uploadDirectory, { recursive: true } );
}

const storage = multer.diskStorage( {
	destination: ( req, file, cb ) => {
		cb( null, uploadDirectory );
	},
	filename: ( req, file, cb ) => {
		const uniqueSuffix = `${ Date.now() }-${ Math.round( Math.random() * 1e9 ) }`;
		cb( null, `${ uniqueSuffix }${ path.extname( file.originalname ) }` );
	}
} );

const fileFilter = ( req, file, cb ) => {
	const allowedExtensions = /pdf|jpg|jpeg|png/;
	const isExtValid = allowedExtensions.test( path.extname( file.originalname ).toLowerCase() );
	const isMimeValid = allowedExtensions.test( file.mimetype );

	if ( isExtValid && isMimeValid ) {
		return cb( null, true );
	}
	cb( new Error( 'Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.' ) );
};

const upload = multer( {
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
	fileFilter
} );

module.exports = upload;