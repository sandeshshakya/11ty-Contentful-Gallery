require('dotenv').config();
const contentful = require("contentful");
const isPreview = process.env.CTFL_PREVIEW_MODE === "true";

const client = contentful.createClient({
    space: process.env.CTFL_SPACE,
    accessToken: isPreview ? process.env.CTFL_PREVIEW_TOKEN : process.env.CTFL_ACCESS_TOKEN,
    host: isPreview ? "preview.contentful.com" : "cdn.contentful.com" // Use Preview API host if preview mode is enabled
});
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.

module.exports = async () => {
    return client.getEntries({ content_type: 'photoSet' }).then(function(response) {

            console.log('photos:');
            console.log(response);

            const photoSet = response.items
                .map(function(photoSet) {
                    return photoSet.fields;
                });
            return photoSet;
        })

        .catch(console.error);
};