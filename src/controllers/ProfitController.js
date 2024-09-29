import { prisma } from "../services/prisma";
import { profitValidator } from "../validations/profitValidator";


class ProfitController {
	async store(req, res) {
		try {
			await profitValidator.validate(req.body);

			const {
				cust,
				gain,
				type_diary,
				real_gain,
				real_profit,
				expected_profit,
				worked_days,
				type_market
			} = req.body;

			const user = await prisma.user.findUnique({
				where: {
					id: req.userId
				}
			});

			if (!user) {
				return res.status(401).json({
					errors: ["Usuário não existe"]
				});
			}

			if(!expected_profit && !real_profit) {
				return res.status(401).json({
					errors: ["Não foi salvo nenhum lucro"]
				});
			}

			if(!gain && !real_gain) {
				return res.status(401).json({
					errors: ["Não foi salvo nenhum ganho"]
				});
			}

			const profit = await prisma.profit.create({
				data: {
					cust,
					gain,
					type_diary,
					real_gain,
					real_profit,
					expected_profit,
					worked_days,
					type_market,
					user_id: req.userId
				}
			});

			return res.status(200).json({
				profit
			});
		} catch (e) {
			return res.status(400).json({
				e
			});
		}
	}

	async index(req, res) {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: req.userId
				},
				select: {
					profit: true
				}
			});
			
			if (!user) {
				return res.status(401).json({
					errors: ["Usuário não existe"]
				});
			}

			return res.status(200).json({
				...user
			});
		} catch (e) {
			return res.status(400).json({
				e
			});
		}
	}

	async delete(req, res) {
		try {
			const id = Number(req.params.id);

			if (!id) {
				return res.status(400).json({
					errors: ["Faltando ID"]
				});
			}

			const profit = await prisma.profit.findUnique({
				where: {
					id
				}
			});
			

			if (!profit) {
				return res.status(400).json({
					errors: ["Lucro não existe"]
				});
			} 


			if(profit.user_id !== req.userId) {
				return res.status(400).json({
					errors: ["Esse lucro não pertence ao seu usuário"]
				});
			}

			await prisma.profit.delete({
				where: {
					id
				}
			});
			return res.status(200).json({ apagado: true });
		} catch (e) {
			return res.status(400).json({
				e
			});
		}
	}

	async show(req, res) {
		try {
			const id = Number(req.params.id);
	  
			if (!id) {
			  return res.status(400).json({
				errors: ["Faltando ID"],
			  });
			}
	  
			const profit = await prisma.profit.findUnique({
				where: {
					id
				}
			})
	  
			if (!profit) {
			  return res.status(400).json({
				errors: ["Lucro não existe"],
			  });
			}

			if(profit.user_id !== req.userId) {
				return res.status(400).json({
					errors: ["Esse lucro não pertence ao seu usuário"]
				});
			}
	  
			return res.status(200).json(profit);
		  } catch (e) {
			return res.status(400).json({
			  e,
			});
		  }
	}

	async update(req, res) {
		try {
			const id = Number(req.params.id);
			await profitValidator.validate(req.body);
			const {
				cust,
				gain,
				type_diary,
				real_gain,
				real_profit,
				expected_profit,
				worked_days,
				type_market
			} = req.body;

			if (!id) {
			  return res.status(400).json({
				errors: ["Faltando ID"],
			  });
			}
	  
			const profit = await prisma.profit.findUnique({
				where: {
					id
				}
			});
	  
			if (!profit) {
			  return res.status(400).json({
				errors: ["Lucro não existe"],
			  });
			}

			if(profit.user_id !== req.userId) {
				return res.status(400).json({
					errors: ["Esse lucro não pertence ao seu usuário"]
				});
			}

			if(!expected_profit && !real_profit) {
				return res.status(401).json({
					errors: ["Não foi salvo nenhum lucro"]
				});
			}
	  
			if(!gain && !real_gain) {
				return res.status(401).json({
					errors: ["Não foi salvo nenhum ganho"]
				});
			}
			
			const newProfit = await prisma.profit.update({
				where: {
					id
				},
				data: {
					cust,
					gain,
					type_diary,
					real_gain,
					real_profit,
					expected_profit,
					worked_days,
					type_market
				}
			});
	  
			return res.json({ newProfit });
		  } catch (e) {
			return res.status(400).json({
			  e
			});
		  }
	}
}

export default new ProfitController();
