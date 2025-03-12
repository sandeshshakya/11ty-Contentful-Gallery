require('dotenv').config();
const contentful = require("contentful");

const client = contentful.createClient({
    space: process.env.CTFL_SPACE,
    accessToken: process.env.CTFL_ACCESSTOKEN
});

module.exports = async () => {
    return client.getEntries({ content_type: 'brand' }).then(function(response) {
            console.log('brand:');
            console.log(response);
            console.log('============');

            const brand = response.items
                .map(function(brand) {
                    return brand.fields;
                });
            return brand[0];
        })

        .catch(console.error);
};