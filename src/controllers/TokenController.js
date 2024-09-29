import { prisma } from "../services/prisma";
import { passwordValidator } from "../validations/passwordValidator";
import jwt from "jsonwebtoken";
import { userValidator } from "../validations/userValidator";

class TokenController {
	async store(req, res) {
		try {
			await userValidator.validate(req.body);
			const { email = "", password = "" } = req.body;

			if (!email || !password) {
				return res.status(401).json({
					errors: ["Credenciais inválidas"]
				});
			}

			const user = await prisma.user.findUnique({
				where: { email }
			});

			if (!user) {
				return res.status(401).json({
					errors: ["Usuário não existe"]
				});
			}

			if (!(await passwordValidator(password, user.password))) {
				return res.status(401).json({
					errors: ["Senha inválida"]
				});
			}

			const { id } = user;
			const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
				expiresIn: process.env.TOKEN_EXPIRATION
			});

			res.cookie("authorization", token, {
				maxAge: 604800000,
				httpOnly: true,
				secure: false
			});
			return res.status(200).json({
				email
			});
		} catch (e) {
			return res.status(400).json({
				e
			});
		}
	}

	async verify(req, res) {
		try {
			const { authorization } = req.cookies;
		
			if (!authorization) {
				return res.send(false);
			}

			const data = jwt.verify(authorization, process.env.TOKEN_SECRET);

			const { id, email } = data;

			const user = await prisma.user.findUnique({
				where: {
					id,
					email
				}
			});

			if (!user) {
				return res.send(false);
			}

			return res.send(true);
		} catch {
			return res.send(false);
		}
	}

	async delete(req, res) {
		try {
			res.clearCookie("authorization");
			res.send({apagado: true})
		} catch (e) {
			return res.send(e);
		}
	}
}
export default new TokenController();
