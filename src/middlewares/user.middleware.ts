class UserMiddleware {
  //   public async isExist(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { userId } = req.params;
  //       const user = await User.findById(userId);
  //       if (!user) {
  //         throw new ApiError();
  //       }
  //       next();
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
}
export const userMiddleware = new UserMiddleware();
