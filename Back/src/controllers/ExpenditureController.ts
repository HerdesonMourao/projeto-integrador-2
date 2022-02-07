import { Request, Response } from 'express';
import { prismaClient } from '../database';
import { CreateExpenditureDTO, createExpenditureRequestSchema } from '../dtos';

class ExpenditureController {
  public async store(request: Request, response: Response) {
    try {
      await createExpenditureRequestSchema.validate(request.body, {
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
      description,
      value,
      expense_date,
      Category,
      payment_method,
      number_installments,
      isPaid
    }: CreateExpenditureDTO = request.body;

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

      const convertDate = new Date(expense_date);

      const createExpenditure = await prismaClient.expenditure.create({
        data: {
          userId: user_id,
          description,
          value,
          expense_date: convertDate,
          categoryId: Category,
          payment_method,
          number_installments,
          isPaid
        }
      })

      return response.status(201).json({
        message: "Despesa cadastrada com sucesso",
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar cadastrar uma despesa: ${err.message}`,
      });
    }
  }

  public async index(request: Request, response: Response) {
    try {
      const expenditureList = await prismaClient.expenditure.findMany({
        where: {
          is_activated: true
        },
        include: {
          user_id: true
        },
        orderBy: {
          description: 'asc'
        }
      });

      return response.status(200).json(
        expenditureList
      )
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir as despesas registradas: ${err.message}`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const expenditureById = await prismaClient.expenditure.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        },
        include: {
          user_id: true
        }
      });

      if(!expenditureById){
        return response.status(404).json({
          error: true,
          message: 'Despesa nao existe'
        })
      }

      return response.status(200).json(
        expenditureById
      )
    } catch (err) {
      return response.status(404).json({
        error: true,
        message: `Ocorreu um erro ao tentar exibir a despesa registrada: ${err.message}`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      await createExpenditureRequestSchema.validate(request.body, {
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
      description,
      value,
      expense_date,
      Category,
      payment_method,
      number_installments,
      isPaid
    }: CreateExpenditureDTO = request.body;

    const { id } = request.params;

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

      const convertDate = new Date(expense_date);

      const updateExpenditure = await prismaClient.expenditure.update({
        where: {
          id: Number(id)
        },
        data: {
          userId: user_id,
          description,
          value,
          expense_date: convertDate,
          categoryId: Category,
          payment_method,
          number_installments,
          isPaid
        }
      })

      return response.status(201).json({
        message: "Despesa atualizado com sucesso",
      });
    } catch (err: any) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar atualizar uma despesa: ${err.message}`,
      });
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const categorybyId = await prismaClient.expenditure.findFirst({
        where: {
          id: Number(id),
          is_activated: true
        }
      });

      if(!categorybyId){
        return response.status(404).json({
          error: true,
          message: 'Despesa não existe'
        })
      }

      const expenditureDeleteById = await prismaClient.expenditure.update({
        where: {
          id: Number(id)
        },
        data: {
          is_activated: false
        }
      });

      return response.status(200).json({
        message: 'Despesa apagado com sucesso'
      })
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: `Ocorreu um erro ao tentar apagar uma despesa: ${err.message}`
      })
    }
  }
}

export default new ExpenditureController();