import pkg from 'jsonwebtoken'
const { verify } = pkg
export default async function Auth(req, res, next) {

    const key = req.headers.authorization;


const token = key.split(" ")[1];


if (token==null)
    return res.status(403).send({msg:"unautharized access"})
    try {
        const auth = await verify(token, process.env.JWT_KEY)
        console.log(auth);
        req.user = auth;
        next()
    } catch (error) {
        res.status(500).send(error)
    }

}
