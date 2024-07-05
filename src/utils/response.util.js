exports.getSuccesssResponse = (message, data = null) => {
    let response = {
        status: "success",
        message,
    };

    if (data) response.data = data;
    return response;
};

exports.getErrorResponnse = (statusCode, message) => {
    return {
        status: "error",
        error: {
            message,
            statusCode,
        },
    };
};
