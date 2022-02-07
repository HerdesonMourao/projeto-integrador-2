import { Request, Response } from "express";
import { prismaClient } from "../database";
import { CreateCardsDTO, createCardsRequestSchema } from "../dtos";

class CardsController {
  public async store(request: Request, response: Response) {
    try {
      await createCardsRequestSchema.validate(request.body, {
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
      card_number,
      type,
      flags,
      limit,
      current_value,
      closing_day,
    }: CreateCardsDTO = request.body;

    try {
      //verificar se usuario existe
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

      //verificar se cartao existe
      const cardNumberExist = await prismaClient.cards.findFirst({
        where: {
          card_number,
        },
      });

      if (cardNumberExist) {
        return response.status(400).json({
          error: true,
          message: "Já existe um cartão com este número",
        });
      }

      const createCard = await prismaClient.cards.create({
        data: {
          userId: user_id,
          card_number,
          type,
          flags,
          limit,
          current_value,
          closing_day
        }
      })

      return response.status(201).json({
        message: "Cartao cadastrado com sucesso",
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar um cartão: ${err.message}`,
      });
    }
  }

  public async index(request: Request, response: Response) {
    try {
      const cardList = await prismaClient.cards.findMany({
        where: {
          is_activated: true
        },
        include: {
          user_id: true
        },
        orderBy: {
          card_number: 'asc'
        }
      });

      return response.status(200).json(
        cardList
      )
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir os cartoes registrados: ${err.message}`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const cardById = await prismaClient.cards.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        },
        include: {
          user_id: true
        }
      });

      if(!cardById){
        return response.status(404).json({
          error: true,
          message: 'Cartao nao existe'
        })
      }

      return response.status(200).json(
        cardById
      )
    } catch (err) {
      return response.status(404).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir o cartao registrado: ${err.message}`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      await createCardsRequestSchema.validate(request.body, {
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
      card_number,
      type,
      flags,
      limit,
      current_value,
      closing_day,
    }: CreateCardsDTO = request.body;

    const { id } = request.params;

    try {
      //verificar se registro existe
      const cardExist = await prismaClient.cards.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!cardExist) {
        return response.status(404).json({
          error: true,
          message: 'Cartao nao existe'
        });
      };

      //verificar se usuario existe
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

      //verificar se cartao existe
      const cardNumberExist = await prismaClient.cards.findFirst({
        where: {
          card_number,
          id: {
            not: Number(id)
          }
        },
      });

      if (cardNumberExist) {
        return response.status(400).json({
          error: true,
          message: "Já existe um cartão com este número",
        });
      }

      const createCard = await prismaClient.cards.update({
        where: {
          id: Number(id)
        },
        data: {
          userId: user_id,
          card_number,
          type,
          flags,
          limit,
          current_value,
          closing_day
        }
      })

      return response.status(201).json({
        message: "Cartao atualizado com sucesso",
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar atualizar um cartão: ${err.message}`,
      });
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const cardById = await prismaClient.cards.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!cardById){
        return response.status(404).json({
          error: true,
          message: 'Cartao não existe'
        })
      }

      const cardDeleteById = await prismaClient.cards.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      });

      return response.status(200).json({
        message: 'Cartao apagado com sucesso'
      })
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar apagar um cartao: ${err.message}`
      })
    }
  }
}

export default new CardsController();
