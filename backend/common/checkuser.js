const checkUser = (req) =>{
    let token = req.cookies.isUser;
    if (!token) {
      return false;
    }
    return true;
}

module.exports = checkUser;