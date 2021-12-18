import LoginDao from "../dao/loginDAO.js";
export default class ReviewController {
  static async apiGetLogin(req, res, next) {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };
      const ReviewResponse = await LoginDao.getLogin(user);
      
      res.json({status:"success"})
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }
}
