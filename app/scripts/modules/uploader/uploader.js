'use strict';

/**
 * Uploader module for Gallery app
 */
angular.module('gallery.uploader', [
    'ngFileUpload'
])

/**
 * Uploader service for Gallery uploader module
 * 
 * @param {object} Upload    ngFileUpload $upload service
 * @param {object} Queue     AngularJS queue service
 */
.service('uploader', function(Upload, $q){
    
    var cl = cloudinary.Cloudinary.new();
    cl.config('upload_preset', 'ctqmnr87');
    var cloudinaryCloudName;
    
    return {
        /**
         * Set the cloud name
         * 
         * @param {string} cloudName
         */
        setCloudName: function(cloudName){
            cloudinaryCloudName = cloudName;
            cl.config('cloud_name', cloudName);
        },
        
        /**
         * Get the cloud name
         * 
         * @returns {string}
         */
        getCloudName: function(){
            return cloudinaryCloudName;
        },
        
        /**
         * Url proxy function
         */
        url: cl.url,
        
        /**
         * Upload files
         * 
         * @param {array} files         The files to be uploaded
         * @param {string} title        Title
         * @param {function} progress   Callback on progress
         * @return {promise}                   
         */
        uploadFiles: function(files, title, progress){
            return $q(function(resolve, reject){
                title = title || 'Images';
                
                // Files successfully uploaded
                var uploadedFiles = [];
                
                // Number of files left to be uploaded
                var uploadsLeft = files.length;
                
                /**
                 * Check if there are files left
                 */
                var checkUploadsLeft = function(){
                    uploadsLeft--;
                    if (uploadsLeft === 0){
                        resolve(uploadedFiles);
                    }
                };
                
                // Iterate over files
                angular.forEach(files, function(file){
                    if (file && !file.$error) {
                        
                        // Upload file
                        file.upload = Upload.upload({
                            url: "https://api.cloudinary.com/v1_1/" + cl.config().cloud_name + "/upload",
                            data: {
                                upload_preset: cl.config().upload_preset,
                                tags: 'album',
                                context: 'photo=' + title,
                                file: file
                            }
                        }).progress(function (e) {
                            file.progress = Math.round((e.loaded * 100.0) / e.total);
                            file.status = "Uploading... " + file.progress + "%";
                            if (progress) {
                                progress(e, file);
                            }
                        }).success(function (data, status, headers, config) {
                            uploadedFiles.push(data);
                            checkUploadsLeft();
                        }).error(function (data, status, headers, config) {
                            file.result = data;
                            checkUploadsLeft();
                        });
                        
                    } else {
                        checkUploadsLeft();
                    }
                });
            });
        }
    };
});
