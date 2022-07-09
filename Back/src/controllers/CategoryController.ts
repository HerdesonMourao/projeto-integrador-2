import { Request, Response } from 'express';
import { prismaClient } from '../database';
import { CreateCategoryDTO, createCategoryRequestSchema, UpdateCategoryDTO, updateCategoryRequestSchema} from '../dtos';

class CategoryController {
  public async store(request: Request, response: Response) {
    try {
      await createCategoryRequestSchema.validate(request.body, {
        abortEarly: true,
      });
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors
      })
    }

    const {
      user_id,
      name
    }: CreateCategoryDTO = request.body;

    try {
      const userExist = await prismaClient.user.findFirst({
        where: {
          id: user_id,
          is_activated: true
        },
      });

      if (!userExist) {
        return response.status(404).json({
          error: true,
          message: "Usuario nao existe",
        });
      }

      const createCategory = await prismaClient.category.create({
        data: {
          userId: user_id,
          name
        }
      })

      return response.status(201).json({
        message: "Categoria cadastrada com sucesso",
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar uma categoria: ${err.message}`,
      });
    }
  }

  public async index(request: Request, response: Response) {
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

      let categoryList;

      if(user.role == "ADMIN"){
        categoryList = await prismaClient.category.findMany({
          where: {
            is_activated: true
          },
          include: {
            user_id: true
          },
          orderBy: {
            name: 'asc'
          }
        });
      } else {
        categoryList = await prismaClient.category.findMany({
          where: {
            userId: Number(id),
            is_activated: true
          },
          include: {
            user_id: true
          },
          orderBy: {
            name: 'asc'
          }
        });
      }

      return response.status(200).json(
        categoryList
      )
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir as categorias registradas: ${err.message}`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const categoryById = await prismaClient.category.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        },
        include: {
          user_id: true
        }
      });

      if(!categoryById){
        return response.status(404).json({
          error: true,
          message: 'Categoria nao existe'
        })
      }

      return response.status(200).json(
        categoryById
      )
    } catch (err) {
      return response.status(404).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir a categoria registrada: ${err.message}`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      await updateCategoryRequestSchema.validate(request.body, {
        abortEarly: false,
      });
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors,
      });
    }

    const {
      name
    }: UpdateCategoryDTO = request.body;

    const { id } = request.params;

    try {
      const updateCategory = await prismaClient.category.update({
        where: {
          id: Number(id)
        },
        data: {
          name
        }
      })

      return response.status(201).json({
        message: "Categoria atualizado com sucesso",
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar atualizar uma categoria: ${err.message}`,
      });
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const categorybyId = await prismaClient.category.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!categorybyId){
        return response.status(404).json({
          error: true,
          message: 'Categoria não existe'
        })
      }

      const categoryDeleteById = await prismaClient.category.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      });

      return response.status(200).json({
        message: 'Categoria apagado com sucesso'
      })
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar apagar uma categoria: ${err.message}`
      })
    }
  }
}

export default new CategoryController();