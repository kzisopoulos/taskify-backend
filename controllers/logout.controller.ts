import { RouteResponse } from "../interfaces/interfaces";
import { Request, Response } from "express";
const { prisma } = require("../config/prisma");

const logout = async (req: Request, res: Response) => {
  // sidenote: on client also delete the accessToken
  const cookies = req.cookies;
  // if there is not cookie then return.

  const response: RouteResponse<null> = {
    code: 204,
    data: null,
    error: null,
    message: "No content.",
    success: true,
  };

  if (!cookies?.jwt) {
    return res.status(response.code).json(response);
  }

  // if there is a cookie find the user that it is assigned to and update it to null.
  const refreshToken = cookies.jwt;
  await prisma.user.update({ where: { refreshToken: refreshToken }, data: { refreshToken: null } });
  // clear the cookie anyway on the browser.
  // set secure : true on productionnull
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(response.code).json(response);
};

export { logout };
