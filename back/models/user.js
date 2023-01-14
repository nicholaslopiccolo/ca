module.exports = (_db) => {
    return {
        updateUser: (req, res) => { // TO DO
            res.end()
        },
        registerGoogle: async (req, res, next) => {
            const user = req.session.passport.user;

            try {
                await _db.collection('users').insertOne({
                    google_id: user.id,
                    email: user.email,
                    username: user.displayName,
                    picture: user.picture,
                })
            } catch (e) {
                console.log("User esistente si proceda al login")
                console.log(e)
            }
            req.session.user = {
                google_id: user.id,
                email: user.email,
                username: user.displayName,
                picture: user.picture,
            }
            next()
        }
    }
}