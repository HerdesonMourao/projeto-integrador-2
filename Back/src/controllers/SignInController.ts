import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { prismaClient } from "../database";

class SignInController {
  public async store(request: Request, response: Response){
    try {
      const {
        username,
        password
      } = request.body;

      if(!(username || password)){
        return response.status(400).json({
          error: true,
          message: "Usuario e/ou senha nao foram informados!",
        });
      }
      
      const user = await prismaClient.user.findUnique({
        where: {
          username
        }
      })

      if (!user) {
        return response.status(400).json({
          error: true,
          message: 'Login e/ou senha inválido'
        });
      }

      const comparePassword = await compare(password, user.username);

      if (!comparePassword) {
        return response.status(400).json({
          error: true,
          message: 'Login e/ou senha inválido'
        });
      }

      delete user.password;

      return response.status(200).json({
        user
      })

    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar acessar o sistema: ${err.message}`
      })
    }
  }
}

export default new SignInController();