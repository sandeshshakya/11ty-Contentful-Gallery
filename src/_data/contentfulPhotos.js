require('dotenv').config();
const contentful = require("contentful");

const client = contentful.createClient({
    space: process.env.CTFL_SPACE,
    accessToken: process.env.CTFL_ACCESSTOKEN
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