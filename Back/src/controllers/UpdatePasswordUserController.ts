import { Request, Response } from "express";
import { prismaClient } from "../database";
import { UpdatePasswordUserDTO, updatePassworddUserRequestSchema } from "../dtos";
import { hash } from "bcryptjs";

class UpdatePasswordUserController {
  public async store(request: Request, response: Response){
    try {
      await updatePassworddUserRequestSchema.validate(request.body, { abortEarly: false })
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors
      });
    }

    const { password }: UpdatePasswordUserDTO = request.body;
    const { id } = request.params;

    try {
      const userById = await prismaClient.user.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!userById){
        return response.status(404).json({
          error: true,
          message: 'Usuário não existe'
        })
      }
      
      const encryptedPassword = await hash(password, 10);

      const updatePasswordUserByid = await prismaClient.user.update({
        where: { id: Number(id) },
        data: {
          password: encryptedPassword
        }
      })

      return response.status(200).json({
        message: 'Senha atualizada com sucesso'
      })
    } catch (err) {
      return response.status(404).json({
        error: true,
        message: `Ocorreu um erro ao tentar alterar a senha usuário registrado: ${err.message}`
      })
    }
  }
}

export default new UpdatePasswordUserController();