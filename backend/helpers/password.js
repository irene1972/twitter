import bcrypt from 'bcrypt';

const encriptarPassword = async function(password) {
    const rondasDeSal = 10;
    try {
        const hashPass = await bcrypt.hash(password, rondasDeSal);
        return hashPass;
    } catch (error) {
        console.log(error);
        return 'error';
    }
}

const matchPassword = function(password, savedPassword){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, savedPassword, (err, matches) => {
      if (err) reject(err)
      else resolve(matches)
    })
  })
}


export { encriptarPassword, matchPassword }