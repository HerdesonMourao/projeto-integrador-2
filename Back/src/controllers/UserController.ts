import { Request, Response } from 'express';
import { prismaClient } from '../database';
import { CreateUserDTO, createUserRequestSchema, updatedUserRequestSchema } from '../dtos';
import { hash } from 'bcryptjs';

class UserController {
  public async store(request: Request, response: Response){
  // validation body
    try {
      await createUserRequestSchema.validate(request.body, { abortEarly: false })
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors
      });
    }

    const {
      name,
      username,
      password,
      email,
      whatsapp,
      avatar_logo,
      role
    }: CreateUserDTO = request.body;

    // create user
    try {
      // converting password to hash
      const encryptedPassword = await hash(password, 10);

      const createdUser = await prismaClient.user.create({
        data: {
          name,
          username,
          password: encryptedPassword,
          email,
          whatsapp,
          avatar_logo,
          role
        }
      })

      return response.status(200).json({
        message: 'Usuário cadastrado com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar um usuário: ${err.message}`
      })
    }
  }

  public async index(request: Request, response: Response){
    try {
      const { id } = request.params;

      const user = await prismaClient.user.findFirst({
        where: {
          id: Number(id)
        }
      });

      if(!user){
        return response.status(404).json({
          error: true,
          message: 'Usuário não existe'
        });
      }

      let usersList;

      if(user.role == "ADMIN"){
        usersList = await prismaClient.user.findMany({
          // selecting fields to display
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            whatsapp: true,
            avatar_logo: true,
            is_activated: true,
            created_at: true,
            updated_at: true
          },
          where: {
            is_activated: true
          },
          orderBy: {
            name: 'asc'
          }
        })
      } else {
        usersList = await prismaClient.user.findMany({
          // selecting fields to display
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            whatsapp: true,
            avatar_logo: true,
            is_activated: true,
            created_at: true,
            updated_at: true
          },
          where: {
            id: Number(id),
            is_activated: true
          },
          orderBy: {
            name: 'asc'
          }
        })
      }

      return response.status(200).json(
        usersList
      )
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir os usuário registrados: ${err.message}`
      })
    }
  }

  public async show(request: Request, response: Response){
    try {
      const { id } = request.params;

      const userById = await prismaClient.user.findFirst({
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          whatsapp: true,
          avatar_logo: true,
          role: true,
          is_activated: true,
          created_at: true,
          updated_at: true
        },
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

      return response.status(200).json(
        userById
      )
    } catch (err) {
      return response.status(404).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir o usuário registrado: ${err.message}`
      })
    }
  }

  public async update(request: Request, response: Response){
    try {
      await updatedUserRequestSchema.validate(request.body, { abortEarly: false })
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors
      });
    }

    const {
      name,
      username,
      email,
      whatsapp,
      avatar_logo,
      role
    }: CreateUserDTO = request.body;

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

      const userUpdateById = await prismaClient.user.update({
        where: { id: Number(id) },
        data: {
          name,
          username,
          email,
          whatsapp,
          avatar_logo,
          role
        }
      })
      
      return response.status(200).json({
        message: 'Usuário atualizado com sucesso'
      })
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar atualizar um usuário: ${err.message}`
      })
    }
  }

  public async destroy(request: Request, response: Response){
    try {
      const { id } = request.params;

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

      const userDeleteById = await prismaClient.user.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      });

      return response.status(200).json({
        message: 'Usuário apagado com sucesso'
      })
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar apagar um usuário: ${err.message}`
      })
    }
  }
}

export default new UserController();