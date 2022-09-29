import crypto from 'crypto';

async function hashPassword(password) {
    return new Promise((resolve, reject) => {

        const salt = crypto.randomBytes(16).toString('hex');
        
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if(err) {
                reject(err);
            }
            resolve(salt + ':' + derivedKey.toString('hex'));
        })
    });
}

async function verifyPassword(password, hash) {

    const [salt, savedDerivedKey] = hash.split(':');

    return new Promise((resolve, reject) => {
        
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if(err) {
                reject(err);
            }
            resolve(derivedKey.toString('hex') === savedDerivedKey);
        })
    });
}

export {hashPassword, verifyPassword};
