const _ = require('lodash');

const {
    getBookings
} = require('../../model/users');


const viewBookings = async (request, response) => {
    try {
        const result = await getBookings(request.params.id);
        return response.status(200).send("getBookings");


    } catch (error) {
        console.log(error.message);
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.status(500).render('500', {
            err_data: err_msg
        });
    }
}

exports.viewBookings = viewBookings;