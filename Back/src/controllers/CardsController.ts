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
        },
      });

      if (!userExist) {
        return response.status(404).json({
          error: true,
          message: "Usuario nao existe",
        });
      }

      //verificar se cartao existe
      const revenueByCardNumber = await prismaClient.cards.findFirst({
        where: {
          card_number,
        },
      });

      if (revenueByCardNumber) {
        return response.status(400).json({
          error: true,
          message: "Já existe um cartão com este número",
        });
      }

      const id: number = user_id;

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
}

export default new CardsController();
