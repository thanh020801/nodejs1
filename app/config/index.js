const config ={
    app: {
        port: process.env.PORT || 8080,
    },
    db: {
        uri: process.env.URI || "mongodb+srv://thanh:w1zqVPs5UfWnFJVK@cluster0.ci2u2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    },
}

module.exports = config