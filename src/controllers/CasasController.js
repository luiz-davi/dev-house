class HouseController {

  async store(req, res){
    console.log(req.body);
    console.log();
    console.log(req.file);
    
    return res.status(201).json({ message: "im here moda foca" })
  }
}

module.exports = new HouseController();