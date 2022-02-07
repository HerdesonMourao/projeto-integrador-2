import { Request, Response } from "express";
import { prismaClient } from "../database";
import { CreateRevenueDTO, createRevenueRequestSchema } from "../dtos";

class RevenueController {
  public async store(request: Request, response: Response) {
    try {
      await createRevenueRequestSchema.validate(request.body, {
        abortEarly: false,
      });
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.errors,
      });
    }

    const {
      user_id,
      value,
      competence
    }: CreateRevenueDTO = request.body;

    try {
      const userExist = await prismaClient.user.findFirst({
        where: {
          id: user_id,
          is_activated: true
        },
      });

      if(!userExist) {
        return response.status(404).json({
          error: true,
          message: "Usuario nao existe",
        });
      }

      const createRevenue = await prismaClient.revenue.create({
        data: {
          userId: user_id,
          value,
          competence
        }
      });

      return response.status(201).json({
        message: "Receita cadastrada com sucesso",
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar uma receita? ${err.message}`,
      });
    }
  }

  public async index(request: Request, response: Response) {
    try {
      const revenueList = await prismaClient.revenue.findMany({
        where: {
          is_activated: true
        },
        include: {
          user_id: true
        },
        orderBy: {
          competence: 'asc'
        }
      });

      return response.status(200).json(
        revenueList
      )
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir as receitas registradas: ${err.message}`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      
      const revenueById = await prismaClient.revenue.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        },
        include: {
          user_id: true
        }
      });

      if(!revenueById){
        return response.status(404).json({
          error: true,
          message: 'Receita nao existe'
        })
      }

      return response.status(200).json(
        revenueById
      )
    } catch (err) {
      return response.status(500).json({
        error: true,
        messsage: `Ocorreu um erro ao tentar exibir a receita registrada: ${err.message}`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      await createRevenueRequestSchema.validate(request.body, {
        abortEarly: false,
      });
    } catch (err: any) {
      return response.status(400).json({
        error: true,
        message: err.erros,
      });
    }

    const {
      user_id,
      value,
      competence
    }: CreateRevenueDTO = request.body;

    const { id } = request.params;

    try {
      const userExist = await prismaClient.user.findFirst({
        where: {
          id: user_id,
          is_activated: true
        }
      });
  
      if(!userExist) {
        return response.status(404).json({
          error: true,
          message: 'Usuario nao existe'
        });
      };
  
      const updateRevenue = await prismaClient.revenue.update({
        where: {
          id: Number(id)
        },
        data: {
          userId: user_id,
          value,
          competence
        }
      });
  
      return response.status(201).json({
        message: 'Receita atualizado com sucesso'
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar atualizar uma receita: ${err.message}`
      });
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const revenueById = await prismaClient.revenue.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!revenueById){
        return response.status(404).json({
          error: true,
          message: 'Receita não existe'
        })
      }

      const revenueDeleteById = await prismaClient.revenue.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      });

      return response.status(200).json({
        message: 'Receita apagada com sucesso'
      })
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar apagar uma receita: ${err.message}`
      })
    }
  }
}

export default new RevenueController();