import LoginDao from "../dao/loginDAO.js";
export default class ReviewController {
  static async apiGetLogin(req, res, next) {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };
      const ReviewResponse = await LoginDao.getLogin(user);
      
      let response = {
        response: user.email,
        token: ReviewResponse
      };
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }
}
