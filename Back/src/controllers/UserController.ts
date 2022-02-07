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
      avatar_logo
    }: CreateUserDTO = request.body;

    // create user
    try {
      // find username
      const userByUsername = await prismaClient.user.findUnique({
        where: {
          username
        }
      });

      if(userByUsername){
        return response.status(201).json({
          error: true,
          message: 'Já existe um usuário com este username'
        });
      }

      // converting password to hash
      const encryptedPassword = await hash(password, 10);

      const createdUser = await prismaClient.user.create({
        data: {
          name,
          username,
          password: encryptedPassword,
          email,
          whatsapp,
          avatar_logo
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
      const usersList = await prismaClient.user.findMany({
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
      avatar_logo
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

      const verifyUsernameDuplicate = await prismaClient.user.findUnique({
        where: {
          username: username
        }
      })

      console.log(verifyUsernameDuplicate);

      if(verifyUsernameDuplicate && verifyUsernameDuplicate.id != userById.id){
        return response.status(400).json({
          error: true,
          message: 'Já existe um usuário com este username, tente outro username'
        })
      }

      const userUpdateById = await prismaClient.user.update({
        where: { id: Number(id) },
        data: {
          name,
          username,
          email,
          whatsapp,
          avatar_logo
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