import User from "./User.js";

export default class Normocontroller extends User {

    constructor(id, email, fullName, role, verified) {
        super(id, email, fullName, role, verified);
    }

    static fromPlainObject(plainObject) {
        if(plainObject === null)
            return null;

        return new Normocontroller(
            plainObject.id,
            plainObject.email,
            plainObject.fullName,
            plainObject.role,
            plainObject.verified
        );
    }
}